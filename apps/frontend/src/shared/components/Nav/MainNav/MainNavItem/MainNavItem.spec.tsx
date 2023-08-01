import { routerRender } from "@shared/testUtils";
import { MainNavItem } from "./MainNavItem";

const ITEM_CONTENT = "Item Content";

describe("MainNavItem", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = routerRender(
      <MainNavItem>{ITEM_CONTENT}</MainNavItem>
    );

    expect(getByText(ITEM_CONTENT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
});
