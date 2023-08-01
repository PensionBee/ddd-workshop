import { render, vi } from "@shared/testUtils";
import { ToastProvider } from "./ToastProvider";

describe("ToastProvider", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { asFragment } = render(<ToastProvider />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
