import { fireEvent, routerRender, sleep } from "@shared/testUtils";
import { DropdownMenuSubList } from "./DropdownMenuSubList";
import {
  LIST,
  LIST_WITH_MIXED_ITEMS,
  LIST_WITH_SUB_LIST_ITEM,
} from "../../Nav.content";

describe("DropdownMenuSubList", () => {
  it("should render correctly", () => {
    const { queryByText, asFragment } = routerRender(
      <DropdownMenuSubList subList={LIST} />
    );
    expect(queryByText(LIST[0].children)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render items with href as link", () => {
    const { queryByText, asFragment } = routerRender(
      <DropdownMenuSubList subList={LIST} />
    );
    const menuItem = queryByText(LIST[0].children)?.closest("a");
    const { href } = LIST[0];

    expect(Boolean(LIST[0].href)).toBe(true);
    expect(menuItem).toBeVisible();
    expect(menuItem).toHaveAttribute("href", href);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render items with subList with subList", async () => {
    const { queryByText, asFragment } = routerRender(
      <DropdownMenuSubList subList={LIST_WITH_SUB_LIST_ITEM} />
    );
    const menuItem = queryByText(LIST_WITH_SUB_LIST_ITEM[0].children);
    const { subList } = LIST_WITH_SUB_LIST_ITEM[0];
    const toggleButton = menuItem && menuItem.closest("button");
    const subMenuItem = subList && subList[0];
    const subMenuItemLabel = subMenuItem && subMenuItem.children;

    expect(Boolean(LIST[0].href)).toBe(true);
    expect(menuItem).toBeVisible();
    expect(menuItem).not.toHaveAttribute("href");
    expect(subMenuItemLabel && queryByText(subMenuItemLabel)).toBe(null);
    toggleButton && fireEvent.click(toggleButton);
    await sleep(500);
    expect(subMenuItemLabel && queryByText(subMenuItemLabel)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render hidden items", () => {
    const { queryByText, asFragment } = routerRender(
      <DropdownMenuSubList subList={LIST_WITH_MIXED_ITEMS} />
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
