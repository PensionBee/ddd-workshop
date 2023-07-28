import { act, fireEvent, render } from "@shared/testUtils";
import { useRef } from "react";
import { useFocusOutside } from "./useFocusOutside";

const MOCK_CALLBACK = jest.fn();

const FOCUS_EVENT = new MouseEvent("focusin", {
  bubbles: true,
  cancelable: true,
});

const Component = () => {
  const ref = useRef(null);
  useFocusOutside(ref, MOCK_CALLBACK);

  return (
    <div data-testid="parent-element">
      <div data-testid="ref-element" ref={ref}>
        <div data-testid="child-element" />
      </div>
      <div data-testid="outside-element" />
    </div>
  );
};

describe("useFocusOutside", () => {
  it("should fire callback when focusing outside the element", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const outsideElement = getByTestId("outside-element");

    expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(outsideElement, FOCUS_EVENT));
    expect(MOCK_CALLBACK.mock.calls.length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should fire callback when focusing on the elements parent", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const parentElement = getByTestId("parent-element");

    expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(parentElement, FOCUS_EVENT));
    expect(MOCK_CALLBACK.mock.calls.length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should NOT fire callback when focusing on the element", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const refElement = getByTestId("ref-element");

    expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(refElement, FOCUS_EVENT));
    expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should NOT fire callback when focusing on the elements children", () => {
    const { asFragment, getByTestId } = render(<Component />);
    const childElement = getByTestId("child-element");

    expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    act(() => fireEvent(childElement, FOCUS_EVENT));
    expect(MOCK_CALLBACK.mock.calls.length).toBe(0);
    expect(asFragment()).toMatchSnapshot();
  });
});
