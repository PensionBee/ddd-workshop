import { routerRender, vi } from "@shared/testUtils";
import { DropdownMenu } from "./DropdownMenu";
import { LIST, LIST_WITH_MIXED_ITEMS } from "../Nav.content";

describe("DropdownMenu", () => {
  it("should render correctly", () => {
    const { queryByText, asFragment } = routerRender(
      <DropdownMenu subList={LIST} />
    );

    expect(queryByText(LIST[0].children)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render hidden sub list items", () => {
    const { queryByText, asFragment } = routerRender(
      <DropdownMenu subList={LIST_WITH_MIXED_ITEMS} />
    );

    LIST_WITH_MIXED_ITEMS.forEach((item) => {
      if (item.hidden) {
        expect(queryByText(item.children)).toBe(null);
      } else {
        expect(queryByText(item.children)).toBeVisible();
      }
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
