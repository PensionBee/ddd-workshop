import { act, render, vi } from "@shared/testUtils";
import { useWindowSize } from "./useWindowSize";

const RESIZE_EVENT = new Event("resize");

const JSDOM_DEFAULT_WIDTH = "1024";
const JSDOM_DEFAULT_HEIGHT = "768";

const Component = () => {
  const { windowWidth, windowHeight } = useWindowSize();

  return (
    <div>
      <div data-testid="width" data-value={windowWidth} />
      <div data-testid="height" data-value={windowHeight} />
    </div>
  );
};

describe("useWindowSize", () => {
  it("should set the window width and height on initial render", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const widthElement = getByTestId("width");
    const heightElement = getByTestId("height");

    expect(widthElement).toHaveAttribute("data-value", JSDOM_DEFAULT_WIDTH);
    expect(heightElement).toHaveAttribute("data-value", JSDOM_DEFAULT_HEIGHT);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should update the window width and height on resize", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const widthElement = getByTestId("width");
    const heightElement = getByTestId("height");

    const newWidth = 600;
    const newHeight = 400;

    act(() => {
      global.innerWidth = newWidth;
      global.innerHeight = newHeight;
      global.dispatchEvent(RESIZE_EVENT);
    });
    expect(widthElement).toHaveAttribute("data-value", `${newWidth}`);
    expect(heightElement).toHaveAttribute("data-value", `${newHeight}`);

    expect(asFragment()).toMatchSnapshot();
  });
});
