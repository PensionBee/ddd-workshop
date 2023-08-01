import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { ToastProvider } from "./ToastProvider";

describe("ToastProvider", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { asFragment } = render(<ToastProvider />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
