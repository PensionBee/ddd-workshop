import { act, fireEvent, queryByText, render } from "@shared/testUtils";
import { FOOTER_MENU_SECTIONS } from "../FooterSitemap.content";
import { MobileMenu, MobileLinkItem, MobileAccordion } from "./MobileMenu";

const CLICK_EVENT = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
});

describe("MobileMenu", () => {
  const TEST_ID = "MobileMenu";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <MobileMenu data-testid={TEST_ID} sections={FOOTER_MENU_SECTIONS} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should open and close accordions", async () => {
    const { getByTestId, asFragment } = render(
      <MobileMenu data-testid={TEST_ID} sections={FOOTER_MENU_SECTIONS} />
    );
    const accordion = getByTestId(TEST_ID).querySelector("[data-state]");
    expect(accordion).toBeInTheDocument();
    const button = accordion && accordion.querySelector("button");
    expect(accordion).toHaveAttribute("data-state", "closed");
    act(() => button && fireEvent(button, CLICK_EVENT));
    expect(accordion).toHaveAttribute("data-state", "open");
    act(() => button && fireEvent(button, CLICK_EVENT));
    expect(accordion).toHaveAttribute("data-state", "closed");
    expect(asFragment).toMatchSnapshot();
  });
});

describe("MobileLinkItem", () => {
  const TEST_ID = "MobileLinkItem";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <MobileLinkItem data-testid={TEST_ID} linkText={""} href={undefined} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});

describe("MobileAccordion", () => {
  const TEST_ID = "MobileAccordion";
  const MENU_TITLE = "Menu Title";
  const EXAMPLE_LIST = [{ linkText: "Link 1", href: "/example" }];
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <MobileAccordion
        data-testid={TEST_ID}
        title={MENU_TITLE}
        list={EXAMPLE_LIST}
      />
    );
    const accordion = getByTestId(TEST_ID);
    expect(accordion).toBeInTheDocument();
    expect(accordion).toHaveAttribute("data-state", "closed");
    expect(
      queryByText(accordion, EXAMPLE_LIST[0].linkText)
    ).not.toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should render with content when open", async () => {
    const { getByTestId, asFragment } = render(
      <MobileAccordion
        data-testid={TEST_ID}
        title={MENU_TITLE}
        list={EXAMPLE_LIST}
        open={true}
      />
    );
    const accordion = getByTestId(TEST_ID);
    expect(accordion).toBeInTheDocument();
    expect(accordion).toHaveAttribute("data-state", "open");
    expect(
      queryByText(accordion, EXAMPLE_LIST[0].linkText)
    ).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
