import { act, render } from "@shared/testUtils";
import { handleEvents } from "./handleEvents";

jest.mock("./handleKeys.ts", () => ({
  handleHorizontalKeys: jest.fn(),
  handleVerticalKeys: jest.fn(),
}));

import { handleHorizontalKeys, handleVerticalKeys } from "./handleKeys";

const PARENT_NODE = "parent-node";
const ACTIVE_ELEMENT = "active-element";

const Component = () => {
  return (
    <div data-testid={PARENT_NODE}>
      <button data-testid={ACTIVE_ELEMENT} />
    </div>
  );
};

describe("handleEvents", () => {
  it("should call handleVerticalKeys if direction is vertical", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    const { getByTestId } = render(<Component />);
    const parentNode = getByTestId(PARENT_NODE);
    const activeElement = getByTestId(ACTIVE_ELEMENT);

    act(() => activeElement.focus());
    expect(activeElement).toHaveFocus();

    handleEvents({
      event,
      parentNode,
      direction: "vertical",
    });

    const elements = parentNode.querySelectorAll("button");
    expect(handleVerticalKeys).toHaveBeenCalledWith(
      expect.objectContaining({
        event,
        elements,
      })
    );
  });

  it("should call handleHorizontalKeys if direction is horizontal", async () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    const { getByTestId } = render(<Component />);
    const parentNode = getByTestId(PARENT_NODE);
    const activeElement = getByTestId(ACTIVE_ELEMENT);

    act(() => activeElement.focus());
    expect(activeElement).toHaveFocus();

    handleEvents({
      event,
      parentNode,
      direction: "horizontal",
    });

    const elements = parentNode.querySelectorAll("button");
    expect(handleHorizontalKeys).toHaveBeenCalledWith(
      expect.objectContaining({
        event,
        elements,
      })
    );
  });

  it("should not call event handler if passed incorrect key", () => {
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    const { getByTestId } = render(<Component />);
    const parentNode = getByTestId(PARENT_NODE);
    const activeElement = getByTestId(ACTIVE_ELEMENT);

    act(() => activeElement.focus());
    expect(activeElement).toHaveFocus();

    handleEvents({
      event,
      parentNode,
    });

    expect(handleHorizontalKeys).not.toHaveBeenCalled();
    expect(handleVerticalKeys).not.toHaveBeenCalled();
  });

  it("should not call event handler if active element is not in parent", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    const { getByTestId } = render(<Component />);
    const parentNode = getByTestId(PARENT_NODE);

    act(() => document.body.focus());
    expect(document.body).toHaveFocus();

    handleEvents({
      event,
      parentNode,
    });

    expect(handleHorizontalKeys).not.toHaveBeenCalled();
    expect(handleVerticalKeys).not.toHaveBeenCalled();
  });

  it("should not call event handler if no elements are found", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
    // invalid focusable active element
    const { getByTestId } = render(
      <div data-testid={PARENT_NODE}>
        <textarea data-testid={ACTIVE_ELEMENT} />
      </div>
    );
    const parentNode = getByTestId(PARENT_NODE);
    const activeElement = getByTestId(ACTIVE_ELEMENT);

    act(() => activeElement.focus());
    expect(activeElement).toHaveFocus();

    handleEvents({
      event,
      parentNode,
    });

    expect(handleHorizontalKeys).not.toHaveBeenCalled();
    expect(handleVerticalKeys).not.toHaveBeenCalled();
  });
});
