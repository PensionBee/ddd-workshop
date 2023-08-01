import { render, vi } from "@shared/testUtils";
import { FieldWrapper } from "./FieldWrapper";

const INPUT_CONTENT = "Input content";
const PREFIX_TEXT = "Prefix text";
const PREFIX_ICON = "AlertInfo";
const SUFFIX_TEXT = "Suffix text";

describe("FieldWrapper", () => {
  describe("With prefix", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <FieldWrapper prefixText={PREFIX_TEXT}>
          <div>{INPUT_CONTENT}</div>
        </FieldWrapper>
      );

      expect(getByText(PREFIX_TEXT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("With prefix icon", () => {
    it("should render correctly", () => {
      const { container, asFragment } = render(
        <FieldWrapper prefixIcon={PREFIX_ICON}>
          <div>{INPUT_CONTENT}</div>
        </FieldWrapper>
      );
      const svgContainer = container.querySelector(
        `[data-rc="SmallSystemIcon.${PREFIX_ICON}"]`
      );

      expect(svgContainer).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("With suffix", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <FieldWrapper suffixText={SUFFIX_TEXT}>
          <div>{INPUT_CONTENT}</div>
        </FieldWrapper>
      );

      expect(getByText(SUFFIX_TEXT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render correctly with suffix icon", () => {
      const { container, asFragment } = render(
        <FieldWrapper suffixIcon={PREFIX_ICON}>
          <div>{INPUT_CONTENT}</div>
        </FieldWrapper>
      );
      const svgContainer = container.querySelector(
        `[data-rc="SmallSystemIcon.${PREFIX_ICON}"]`
      );

      expect(svgContainer).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
