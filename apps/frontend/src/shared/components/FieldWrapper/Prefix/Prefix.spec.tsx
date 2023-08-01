import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { Prefix } from "./Prefix";

const PREFIX_TEXT = "Prefix text";
const PREFIX_ICON = "AlertInfo";

describe("FieldWrapper/Prefix", () => {
  describe("Text", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <Prefix prefixText={PREFIX_TEXT} />
      );

      expect(getByText(PREFIX_TEXT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
    it("should not render if no prefix", () => {
      const { container } = render(<Prefix />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("Icon", () => {
    it("should render correctly", () => {
      const { container, asFragment } = render(
        <Prefix prefixIcon={PREFIX_ICON} />
      );
      const svgContainer = container.querySelector(
        `[data-rc="SmallSystemIcon.${PREFIX_ICON}"]`
      );

      expect(svgContainer).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
    it("should not render if no prefix", () => {
      const { container } = render(<Prefix />);

      expect(container.firstChild).toBeNull();
    });
  });
});
