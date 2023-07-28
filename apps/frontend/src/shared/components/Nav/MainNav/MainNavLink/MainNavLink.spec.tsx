import { routerRender } from "@shared/testUtils";
import { MainNavLink } from "./MainNavLink";

const ITEM_CONTENT = "Item Content";
const EXAMPLE_LINK = "/example";

describe("MainNavItem", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = routerRender(
      <MainNavLink>{ITEM_CONTENT}</MainNavLink>
    );

    expect(getByText(ITEM_CONTENT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with href", () => {
    const { getByText, asFragment } = routerRender(
      <MainNavLink href={EXAMPLE_LINK}>{ITEM_CONTENT}</MainNavLink>
    );

    expect(getByText(ITEM_CONTENT).closest("a")).toHaveAttribute(
      "href",
      EXAMPLE_LINK
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
