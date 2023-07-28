import { fireEvent, render } from "@shared/testUtils";
import {
  Button,
  _ButtonBaseComponent,
  _ButtonComponent,
  _ButtonLinkComponent,
} from "./Button";

/* Helper functions */
const fromContainer = (container: HTMLElement) => {
  return {
    getSpans: () => {
      return container.getElementsByTagName("span");
    },
    getIcon: () => {
      return container.querySelector("[data-icon]");
    },
  };
};

describe("Button", () => {
  const buttonText = "Default Button";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <Button onClick={() => null}>{buttonText}</Button>
      );

      expect(getByText(buttonText)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render variant correctly", () => {
      const buttonText = "Variant Button";
      const { getByText, asFragment } = render(
        <Button onClick={() => null} variant="primary-black">
          {buttonText}
        </Button>
      );

      expect(getByText(buttonText)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should fire click event", () => {
      const buttonText = "Variant Button";
      const onClick = jest.fn();
      const { getByText, asFragment } = render(
        <Button onClick={onClick} variant="primary-black">
          {buttonText}
        </Button>
      );
      const button = getByText(buttonText);

      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render as link", () => {
      const buttonTestId = "button-test-id";
      const buttonText = "Variant Button";
      const buttonLink = "/test";
      const { getByTestId, asFragment } = render(
        <Button
          variant="primary-black"
          href={buttonLink}
          data-testid={buttonTestId}
        >
          {buttonText}
        </Button>
      );
      const button = getByTestId(buttonTestId);
      expect(button).toHaveAttribute("href", buttonLink);
      expect(button.tagName).toBe("A");
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Icons", () => {
    it("should render with copy icon", () => {
      const buttonText = "Variant Button";
      const { container, getByText, asFragment } = render(
        <Button onClick={() => null} icon="Copy">
          {buttonText}
        </Button>
      );
      const { getIcon, getSpans } = fromContainer(container);

      expect(getByText(buttonText)).toBeVisible();
      expect(getSpans().length).toBe(2);
      expect(getIcon()?.getAttribute("data-icon")).toEqual("Copy");
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render with arrow icon", () => {
      const buttonText = "Variant Button";
      const { container, getByText, asFragment } = render(
        <Button onClick={() => null} icon="Actions">
          {buttonText}
        </Button>
      );
      const { getIcon, getSpans } = fromContainer(container);

      expect(getByText(buttonText)).toBeVisible();
      expect(getSpans().length).toBe(2);
      expect(getIcon()?.getAttribute("data-icon")).toEqual("Actions");
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render icon on right side (default)", () => {
      const buttonText = "Variant Button";
      const { container, getByText, asFragment } = render(
        <Button onClick={() => null} icon="Copy">
          {buttonText}
        </Button>
      );
      const { getSpans } = fromContainer(container);
      const spans = getSpans();
      const content = spans[0];
      const icon = spans[1];

      expect(getByText(buttonText)).toBeVisible();
      expect(spans.length).toBe(2);
      expect(icon.getElementsByTagName("svg").length).toBe(1);
      expect(content.getElementsByTagName("svg").length).toBe(0);
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render icon on left side", () => {
      const buttonText = "Variant Button";
      const { container, getByText, asFragment } = render(
        <Button onClick={() => null} icon="Copy" iconPosition="left">
          {buttonText}
        </Button>
      );
      const { getSpans } = fromContainer(container);
      const spans = getSpans();
      const icon = spans[0];
      const content = spans[1];

      expect(getByText(buttonText)).toBeVisible();
      expect(spans.length).toBe(2);
      expect(icon.getElementsByTagName("svg").length).toBe(1);
      expect(content.getElementsByTagName("svg").length).toBe(0);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Disabled", () => {
    it("should have disabled attribute when disabled", () => {
      const { container, getByText, asFragment } = render(
        <Button onClick={() => null} disabled>
          {buttonText}
        </Button>
      );
      const buttonElement = container.getElementsByTagName("button")[0];

      expect(getByText(buttonText)).toBeVisible();
      expect(buttonElement).toHaveAttribute("disabled");
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

// Make sure story components are not rendered
describe("Button.stories", () => {
  it("_ButtonBaseComponent should return null", () => {
    expect(_ButtonBaseComponent({})).toBe(null);
  });
  it("_ButtonComponent should return null", () => {
    expect(_ButtonComponent({})).toBe(null);
  });
  it("_ButtonLinkComponent should return null", () => {
    expect(_ButtonLinkComponent({})).toBe(null);
  });
});
