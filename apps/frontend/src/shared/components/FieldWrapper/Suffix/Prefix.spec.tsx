import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { Suffix } from "./Suffix";

const SUFFIX_TEXT = "Suffix text";
const SUFFIX_ICON = "AlertInfo";

describe("FieldWrapper/Suffix", () => {
  describe("Text", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <Suffix suffixText={SUFFIX_TEXT} />
      );

      expect(getByText(SUFFIX_TEXT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
    it("should not render if no suffix", () => {
      const { container } = render(<Suffix />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("Icon", () => {
    it("should render correctly", () => {
      const { container, asFragment } = render(
        <Suffix suffixIcon={SUFFIX_ICON} />
      );
      const svgContainer = container.querySelector(
        `[data-rc="SmallSystemIcon.${SUFFIX_ICON}"]`
      );

      expect(svgContainer).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
    it("should not render if no suffix", () => {
      const { container } = render(<Suffix />);

      expect(container.firstChild).toBeNull();
    });
  });
});
