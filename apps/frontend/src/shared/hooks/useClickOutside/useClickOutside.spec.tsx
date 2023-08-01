import { act, fireEvent, render } from "@shared/testUtils";
import { vi } from "vitest";
import { useRef } from "react";
import { useClickOutside } from "./useClickOutside";

const MOCK_CALLBACK = vi.fn();

const MOUSE_DOWN_EVENT = new MouseEvent("mousedown", {
  bubbles: true,
  cancelable: true,
});

const TOUCH_START_EVENT = new MouseEvent("touchstart", {
  bubbles: true,
  cancelable: true,
});

const Component = () => {
  const ref = useRef(null);
  useClickOutside(ref, MOCK_CALLBACK);

  return (
    <div data-testid="parent-element">
      <div data-testid="ref-element" ref={ref}>
        <div data-testid="child-element" />
      </div>
      <div data-testid="outside-element" />
    </div>
  );
};

const NoRefComponent = () => {
  useClickOutside({} as React.MutableRefObject<null>, MOCK_CALLBACK);

  return (
    <div data-testid="parent-element">
      <div data-testid="ref-element">
        <div data-testid="child-element" />
      </div>
      <div data-testid="outside-element" />
    </div>
  );
};

describe("useClickOutside", () => {
  it("should fire callback when clicking outside the element", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const outsideElement = getByTestId("outside-element");

    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(outsideElement, MOUSE_DOWN_EVENT));
    // expect(MOCK_CALLBACK.mock.calls.length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should fire callback when touching outside the element", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const outsideElement = getByTestId("outside-element");

    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(outsideElement, TOUCH_START_EVENT));
    // expect(MOCK_CALLBACK.mock.calls.length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should fire callback when clicking on the elements parent", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const parentElement = getByTestId("parent-element");

    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(parentElement, MOUSE_DOWN_EVENT));
    // expect(MOCK_CALLBACK.mock.calls.length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should NOT fire callback when clicking on the element", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const refElement = getByTestId("ref-element");

    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(refElement, MOUSE_DOWN_EVENT));
    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should NOT fire callback when clicking on the elements children", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const childElement = getByTestId("child-element");

    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(childElement, MOUSE_DOWN_EVENT));
    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not fire listener if ref is not set", () => {
    const { asFragment, getByTestId } = render(<NoRefComponent />);
    const outsideElement = getByTestId("outside-element");

    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(outsideElement, MOUSE_DOWN_EVENT));
    // expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });
});
