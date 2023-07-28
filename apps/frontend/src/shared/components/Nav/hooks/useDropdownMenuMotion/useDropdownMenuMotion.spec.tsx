import { act, fireEvent, render, sleep } from "@shared/testUtils";
import { useDropdownMenuMotion } from "./useDropdownMenuMotion";

describe("useDropdownMenuMotion", () => {
  it("should return default values", () => {
    const VISIBLE_VALUE = "visibleValue";
    const MOTION_VALUE = "motionValue";
    const Component = () => {
      const { isVisible, motion } = useDropdownMenuMotion();
      return (
        <>
          <span data-value={`${isVisible}`}>{VISIBLE_VALUE}</span>
          <span data-value={`${motion}`}>{MOTION_VALUE}</span>
        </>
      );
    };
    const { getByText, asFragment } = render(<Component />);
    const visibleElement = getByText(VISIBLE_VALUE);
    const motionElement = getByText(MOTION_VALUE);
    expect(visibleElement).toHaveAttribute("data-value", "false");
    expect(motionElement).toHaveAttribute("data-value", "null");
    expect(asFragment()).toMatchSnapshot();
  });

  it("should toggle isVisible", async () => {
    const VISIBLE_VALUE = "visibleValue";
    const TOGGLE_BUTTON = "toggleButton";
    const Component = () => {
      const { isVisible, toggleOpen } = useDropdownMenuMotion();
      return (
        <>
          <span data-value={`${isVisible}`}>{VISIBLE_VALUE}</span>
          <button onClick={toggleOpen}>{TOGGLE_BUTTON}</button>
        </>
      );
    };
    const { getByText, asFragment } = render(<Component />);
    const visibleElement = getByText(VISIBLE_VALUE);
    const toggleButton = getByText(TOGGLE_BUTTON);
    expect(visibleElement).toHaveAttribute("data-value", "false");
    act(() => fireEvent.click(toggleButton));
    await act(() => sleep(500)); // Longer than default delay
    expect(visibleElement).toHaveAttribute("data-value", "true");
    act(() => fireEvent.click(toggleButton));
    await act(() => sleep(500)); // Longer than default delay
    expect(visibleElement).toHaveAttribute("data-value", "false");
    expect(asFragment()).toMatchSnapshot();
  });

  it("should take delay prop", async () => {
    const VISIBLE_VALUE = "visibleValue";
    const TOGGLE_BUTTON = "toggleButton";
    const Component = () => {
      const { isVisible, toggleOpen } = useDropdownMenuMotion({
        delay: 0,
      });
      return (
        <>
          <span data-value={`${isVisible}`}>{VISIBLE_VALUE}</span>
          <button onClick={toggleOpen}>{TOGGLE_BUTTON}</button>
        </>
      );
    };
    const { getByText, asFragment } = render(<Component />);
    const visibleElement = getByText(VISIBLE_VALUE);
    const toggleButton = getByText(TOGGLE_BUTTON);
    expect(visibleElement).toHaveAttribute("data-value", "false");
    act(() => fireEvent.click(toggleButton));
    await act(() => sleep(50)); // Shorter than default delay
    expect(visibleElement).toHaveAttribute("data-value", "true");
    act(() => fireEvent.click(toggleButton));
    await act(() => sleep(50)); // Shorter than default delay
    expect(visibleElement).toHaveAttribute("data-value", "false");
    expect(asFragment()).toMatchSnapshot();
  });

  it("should take defaultOpen prop", () => {
    const VISIBLE_VALUE = "visibleValue";
    const Component = () => {
      const { isVisible } = useDropdownMenuMotion({
        defaultOpen: true,
      });
      return (
        <>
          <span data-value={`${isVisible}`}>{VISIBLE_VALUE}</span>
        </>
      );
    };
    const { getByText, asFragment } = render(<Component />);
    const visibleElement = getByText(VISIBLE_VALUE);
    expect(visibleElement).toHaveAttribute("data-value", "true");
    expect(asFragment()).toMatchSnapshot();
  });
});
