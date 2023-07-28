import { fireEvent, render } from "@shared/testUtils";
import { act } from "react-dom/test-utils";
import type { ReactPlayerProps } from "react-player";
import { Video } from "./Video";

const COMPONENT = "video-component";
const EXAMPLE_URL = "example-url";
const EXAMPLE_THUMB = "example-thumbnail";

const CLICK_EVENT = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
});

jest.mock("react-player/lazy", () => ({
  __esModule: true,
  default: ({ url, muted, controls, loop, fallback }: ReactPlayerProps) => (
    <div
      data-url={url}
      data-muted={muted}
      data-controls={controls}
      data-loop={loop}
      data-fallback={fallback}
    >
      {COMPONENT}
    </div>
  ),
}));

describe("Video", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { asFragment, queryByText, container } = render(
        <Video src={EXAMPLE_URL} thumbnail={EXAMPLE_THUMB} />
      );
      const button = container.querySelector("button");
      expect(queryByText(COMPONENT)).not.toBeInTheDocument();
      act(() => button && fireEvent(button, CLICK_EVENT));
      expect(queryByText(COMPONENT)).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly without thumbnail", () => {
      const { asFragment, queryByText, container } = render(
        <Video src={EXAMPLE_URL} />
      );
      const button = container.querySelector("button");
      expect(queryByText(COMPONENT)).not.toBeInTheDocument();
      act(() => button && fireEvent(button, CLICK_EVENT));
      expect(queryByText(COMPONENT)).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Modal", () => {
    it("should render correctly", () => {
      const { asFragment, queryByText, container } = render(
        <Video src={EXAMPLE_URL} thumbnail={EXAMPLE_THUMB} isModal />
      );
      const button = container.querySelector("button");
      expect(queryByText(COMPONENT)).not.toBeInTheDocument();
      act(() => button && fireEvent(button, CLICK_EVENT));
      expect(queryByText(COMPONENT)).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should close correctly", () => {
      const { asFragment, queryByText, container } = render(
        <Video src={EXAMPLE_URL} thumbnail={EXAMPLE_THUMB} isModal />
      );
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();

      act(() => button && fireEvent(button, CLICK_EVENT));
      expect(queryByText(COMPONENT)).toBeInTheDocument();

      const closeButton = document.querySelector("#modal-root button");
      expect(closeButton).toBeInTheDocument();

      act(() => closeButton && fireEvent(closeButton, CLICK_EVENT));
      expect(queryByText(COMPONENT)).not.toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
