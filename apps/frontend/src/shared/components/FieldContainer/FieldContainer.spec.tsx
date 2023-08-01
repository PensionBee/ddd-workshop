import { render, vi } from "@shared/testUtils";
import { FieldContainer } from "./FieldContainer";

const INPUT_CONTENT = "Input content";
const LABEL = "Label";
const HINT_TEXT = "Hint text";

describe("FieldContainer", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <FieldContainer>
          <div>{INPUT_CONTENT}</div>
        </FieldContainer>
      );

      expect(getByText(INPUT_CONTENT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("With label", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <FieldContainer label={LABEL}>
          <div>{INPUT_CONTENT}</div>
        </FieldContainer>
      );

      expect(getByText(INPUT_CONTENT)).toBeVisible();
      expect(getByText(LABEL)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("With hint text", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <FieldContainer hintText={HINT_TEXT}>
          <div>{INPUT_CONTENT}</div>
        </FieldContainer>
      );

      expect(getByText(HINT_TEXT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("With error message", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <FieldContainer label="Label" error="Error message">
          <div>{INPUT_CONTENT}</div>
        </FieldContainer>
      );

      expect(getByText(INPUT_CONTENT)).toBeVisible();
      expect(getByText("Error message")).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
