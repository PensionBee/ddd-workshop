import { fireEvent, render } from "@shared/testUtils";
import { LIST_WITH_HIDDEN_LINK, LIST } from "../../Nav.content";
import { AccordionMenuItem } from "./AccordionMenuItem";

const ITEM_TEXT = "Link text";

describe("AccordionMenuItem", () => {
  it("should render correctly with sub list", () => {
    const { getByText, asFragment } = render(
      <AccordionMenuItem>{ITEM_TEXT}</AccordionMenuItem>
    );

    expect(getByText(ITEM_TEXT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render if hidden", () => {
    const { queryByText, asFragment } = render(
      <AccordionMenuItem hidden>{ITEM_TEXT}</AccordionMenuItem>
    );

    expect(queryByText(ITEM_TEXT)).toBe(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with link", () => {
    const EXAMPLE_LINK = "/example-link";
    const { getByText, asFragment } = render(
      <AccordionMenuItem href={EXAMPLE_LINK}>{ITEM_TEXT}</AccordionMenuItem>
    );

    expect(getByText(ITEM_TEXT).closest("a")).toHaveAttribute(
      "href",
      EXAMPLE_LINK
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render with data attributes", () => {
    const TEST_ATTRIBUTE = "test-attribute";
    const { asFragment } = render(
      <AccordionMenuItem data-test={TEST_ATTRIBUTE}>
        {ITEM_TEXT}
      </AccordionMenuItem>
    );

    const item = document.querySelector(`[data-test="${TEST_ATTRIBUTE}"]`);

    expect(item).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with sub list", () => {
    const { getByText, queryByText, asFragment } = render(
      <AccordionMenuItem subList={LIST_WITH_HIDDEN_LINK}>
        {ITEM_TEXT}
      </AccordionMenuItem>
    );

    expect(getByText(ITEM_TEXT)).toBeVisible();
    LIST_WITH_HIDDEN_LINK.forEach((item) => {
      expect(queryByText(item.children)).toBe(null);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should toggle the sub list on click", () => {
    const { getByText, queryByText, asFragment } = render(
      <AccordionMenuItem subList={LIST}>{ITEM_TEXT}</AccordionMenuItem>
    );
    const toggleButton = getByText(ITEM_TEXT);

    LIST.forEach((item) => expect(queryByText(item.children)).toBe(null));
    fireEvent.click(toggleButton);
    LIST.forEach((item) => expect(queryByText(item.children)).toBeVisible());
    fireEvent.click(toggleButton);
    LIST.forEach((item) => expect(queryByText(item.children)).toBe(null));
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render hidden sub list items", () => {
    const { getByText, queryByText, asFragment } = render(
      <AccordionMenuItem subList={LIST_WITH_HIDDEN_LINK}>
        {ITEM_TEXT}
      </AccordionMenuItem>
    );
    const toggleButton = getByText(ITEM_TEXT);

    fireEvent.click(toggleButton);
    LIST_WITH_HIDDEN_LINK.forEach((item) => {
      if (item.hidden) {
        expect(queryByText(item.children)).toBe(null);
      } else {
        expect(queryByText(item.children)).toBeVisible();
      }
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
