import { act, render } from "@shared/testUtils";
import { handleHorizontalKeys, handleVerticalKeys } from "./handleKeys";

const PARENT_NODE = "parent-node";
const FIRST_ELEMENT = "first-element";
const SECOND_ELEMENT = "second-element";
const THIRD_ELEMENT = "third-element";
const FOURTH_ELEMENT = "fourth-element";

const Component = () => {
  return (
    <div data-testid={PARENT_NODE}>
      <button data-testid={FIRST_ELEMENT} />
      <button data-testid={SECOND_ELEMENT} />
      <button data-testid={THIRD_ELEMENT} />
      <button data-testid={FOURTH_ELEMENT} />
    </div>
  );
};

const onExitTop = jest.fn();
const onExitBottom = jest.fn();
const onExitLeft = jest.fn();
const onExitRight = jest.fn();

describe("handleHorizontalKeys", () => {
  it("should focus the first element if current index is 0", () => {
    render(<Component />);
    // Invalid key to trigger default behavior
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    const elements = document.querySelectorAll("button");
    const currentIndex = -1;

    handleHorizontalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[0]).toHaveFocus();
  });

  it("should focus the next element on ArrowRight", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 0;

    act(() => elements[currentIndex].focus());

    handleHorizontalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[1]).toHaveFocus();
  });

  it("should focus the previous element on ArrowLeft", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 1;

    act(() => elements[currentIndex].focus());

    handleHorizontalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[0]).toHaveFocus();
  });

  it("should trigger onExitRight on ArrowRight if the current index is the last element", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    const elements = document.querySelectorAll("button");
    const currentIndex = elements.length - 1;

    act(() => elements[currentIndex].focus());

    handleHorizontalKeys({
      event,
      currentIndex,
      elements,
      onExitRight,
    });

    expect(onExitRight).toHaveBeenCalled();
    expect(elements[elements.length - 1]).toHaveFocus();
  });

  it("should trigger onExitLeft on ArrowLeft if the current index is the first element", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 0;

    act(() => elements[currentIndex].focus());

    handleHorizontalKeys({
      event,
      currentIndex,
      elements,
      onExitLeft,
    });

    expect(onExitLeft).toHaveBeenCalled();
    expect(elements[0]).toHaveFocus();
  });

  it("should not change focus if the key is not ArrowLeft or ArrowRight", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 0;

    act(() => elements[currentIndex].focus());

    handleHorizontalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[0]).toHaveFocus();
  });
});

describe("handleHorizontalKeys", () => {
  it("should focus the first element if current index is 0", () => {
    render(<Component />);
    // Invalid key to trigger default behavior
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    const elements = document.querySelectorAll("button");
    const currentIndex = -1;

    handleVerticalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[0]).toHaveFocus();
  });

  it("should focus the next element on ArrowDown", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 0;

    act(() => elements[currentIndex].focus());

    handleVerticalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[1]).toHaveFocus();
  });

  it("should focus the previous element on ArrowUp", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 1;

    act(() => elements[currentIndex].focus());

    handleVerticalKeys({
      event,
      currentIndex,
      elements,
    });

    expect(elements[0]).toHaveFocus();
  });

  it("should trigger onExitBottom on ArrowDown if the current index is the last element", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
    const elements = document.querySelectorAll("button");
    const currentIndex = elements.length - 1;

    act(() => elements[currentIndex].focus());

    handleVerticalKeys({
      event,
      currentIndex,
      elements,
      onExitBottom,
    });

    expect(onExitBottom).toHaveBeenCalled();
    expect(elements[elements.length - 1]).toHaveFocus();
  });

  it("should trigger onExitTop on ArrowUp if the current index is the first element", () => {
    render(<Component />);
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    const elements = document.querySelectorAll("button");
    const currentIndex = 0;

    act(() => elements[currentIndex].focus());

    handleVerticalKeys({
      event,
      currentIndex,
      elements,
      onExitTop,
    });

    expect(onExitTop).toHaveBeenCalled();
    expect(elements[0]).toHaveFocus();
  });
});
