import { routerRender } from "@shared/testUtils";
import { MobileMenuItem } from "./MobileMenuItem";

const ITEM_CONTENT = "Item Content";
const EXAMPLE_LINK = "/example";

describe("MobileMenuItem", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = routerRender(
      <MobileMenuItem>{ITEM_CONTENT}</MobileMenuItem>
    );

    expect(getByText(ITEM_CONTENT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with href", () => {
    const { getByText, asFragment } = routerRender(
      <MobileMenuItem href={EXAMPLE_LINK}>{ITEM_CONTENT}</MobileMenuItem>
    );

    expect(getByText(ITEM_CONTENT).closest("a")).toHaveAttribute(
      "href",
      EXAMPLE_LINK
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
