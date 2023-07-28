import { fireEvent, render } from "@shared/testUtils";
import {
  LIST,
  LIST_WITH_HIDDEN_LINK,
  LIST_WITH_MIXED_ITEMS,
} from "../Nav.content";
import { AccordionMenu } from "./AccordionMenu";

const MENU_TEXT = "Menu";

describe("AccordionMenuItem", () => {
  it("should render correctly with list", () => {
    const { getByText, asFragment } = render(<AccordionMenu list={LIST} />);

    expect(getByText(MENU_TEXT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render if hidden", () => {
    const { queryByText, asFragment } = render(
      <AccordionMenu list={LIST_WITH_HIDDEN_LINK} />
    );

    expect(queryByText(LIST_WITH_HIDDEN_LINK[0].children)).toBe(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with data attributes", () => {
    const TEST_ATTRIBUTE = "test-attribute";
    const { asFragment } = render(
      <AccordionMenu list={LIST} data-test={TEST_ATTRIBUTE} />
    );

    const item = document.querySelector(`[data-test="${TEST_ATTRIBUTE}"]`);

    expect(item).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should toggle the list on click", () => {
    const { queryByText, getByText, asFragment } = render(
      <AccordionMenu list={LIST} />
    );
    const toggleButton = getByText(MENU_TEXT);

    LIST.forEach((item) => expect(queryByText(item.children)).toBe(null));
    fireEvent.click(toggleButton);
    LIST.forEach((item) => expect(queryByText(item.children)).toBeVisible());
    fireEvent.click(toggleButton);
    LIST.forEach((item) => expect(queryByText(item.children)).toBe(null));
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render hidden sub list items", () => {
    const { getByText, queryByText, asFragment } = render(
      <AccordionMenu list={LIST_WITH_MIXED_ITEMS} />
    );
    const toggleButton = getByText(MENU_TEXT);

    fireEvent.click(toggleButton);
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
