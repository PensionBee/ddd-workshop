import { act, fireEvent, routerRender, sleep } from "@shared/testUtils";
import { MobileMenuItemWithSubList } from "./MobileMenuItemWithSubList";
import { LIST, LIST_WITH_MIXED_ITEMS } from "../../Nav.content";

const ITEM_CONTENT = "Item Content";

describe("MobileMenuItemWithSubList", () => {
  it("should render correctly", () => {
    const { getByText, queryByText, asFragment } = routerRender(
      <MobileMenuItemWithSubList subList={LIST}>
        {ITEM_CONTENT}
      </MobileMenuItemWithSubList>
    );

    expect(getByText(ITEM_CONTENT)).toBeVisible();
    expect(queryByText(LIST[0].children)).toBe(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should toggle subList", async () => {
    const { getByText, queryByText, asFragment } = routerRender(
      <MobileMenuItemWithSubList subList={LIST}>
        {ITEM_CONTENT}
      </MobileMenuItemWithSubList>
    );
    const toggleButton = getByText(ITEM_CONTENT).closest("button");

    expect(toggleButton).toBeVisible();
    expect(queryByText(LIST[0].children)).toBe(null);
    act(() => toggleButton && fireEvent.click(toggleButton));
    await act(() => sleep(500));
    expect(queryByText(LIST[0].children)).toBeVisible();
    act(() => toggleButton && fireEvent.click(toggleButton));
    await act(() => sleep(500));
    expect(queryByText(LIST[0].children)).toBe(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render hidden items", async () => {
    const { getByText, queryByText, asFragment } = routerRender(
      <MobileMenuItemWithSubList subList={LIST_WITH_MIXED_ITEMS}>
        {ITEM_CONTENT}
      </MobileMenuItemWithSubList>
    );
    const toggleButton = getByText(ITEM_CONTENT).closest("button");

    expect(toggleButton).toBeVisible();
    expect(queryByText(LIST_WITH_MIXED_ITEMS[0].children)).toBe(null);
    act(() => toggleButton && fireEvent.click(toggleButton));
    await act(() => sleep(500));
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