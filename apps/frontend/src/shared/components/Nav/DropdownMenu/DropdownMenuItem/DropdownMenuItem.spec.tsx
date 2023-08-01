import { routerRender, vi } from "@shared/testUtils";
import { DropdownMenuItem } from "./DropdownMenuItem";

const ITEM_CONTENT = "Item Content";
const EXAMPLE_LINK = "/example";

describe("DropdownMenuItem", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = routerRender(
      <DropdownMenuItem>{ITEM_CONTENT}</DropdownMenuItem>
    );

    expect(getByText(ITEM_CONTENT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with href", () => {
    const { getByText, asFragment } = routerRender(
      <DropdownMenuItem href={EXAMPLE_LINK}>{ITEM_CONTENT}</DropdownMenuItem>
    );

    expect(getByText(ITEM_CONTENT).closest("a")).toHaveAttribute(
      "href",
      EXAMPLE_LINK
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should be highlighted if href matches pathname", () => {
    const { getByText, asFragment } = routerRender(
      <DropdownMenuItem href={EXAMPLE_LINK}>{ITEM_CONTENT}</DropdownMenuItem>,
      EXAMPLE_LINK // Sets current page route
    );

    expect(getByText(ITEM_CONTENT).closest("li")).toHaveAttribute(
      "data-highlighted"
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
