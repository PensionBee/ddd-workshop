import { act, render } from "@shared/testUtils";
import { vi } from "vitest";
import { useWindowScroll } from "./useWindowScroll";

const SCROLL_EVENT = new Event("scroll");

const JSDOM_DEFAULT_SCROLL_Y = "0";

const Component = () => {
  const scrollPosition = useWindowScroll();

  return <div data-testid="scroll-position" data-value={scrollPosition} />;
};

describe("useWindowScroll", () => {
  it("should set the window scroll on initial render", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const scrollPosition = getByTestId("scroll-position");

    expect(scrollPosition).toHaveAttribute(
      "data-value",
      JSDOM_DEFAULT_SCROLL_Y
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the window scroll position on scroll", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const scrollPosition = getByTestId("scroll-position");

    const newScrollPosition = 500;

    act(() => {
      global.scrollY = newScrollPosition;
      global.dispatchEvent(SCROLL_EVENT);
    });
    expect(scrollPosition).toHaveAttribute(
      "data-value",
      `${newScrollPosition}`
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
