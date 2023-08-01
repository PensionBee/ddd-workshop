import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { useForm } from "react-hook-form";
import { CheckboxContainer } from "./CheckboxContainer";

const CHECKBOX_TEST_ID = "checkbox";
const CHECKBOX_NAME = "Checkbox name";
const CHECKBOX_CONTENT = "Checkbox content";

const CHECKBOX_ERROR = "An error message";

const CheckboxContainerForm = ({ hasError }: { hasError?: boolean }) => {
  const { control } = useForm();
  return (
    <CheckboxContainer
      data-testid={CHECKBOX_TEST_ID}
      name={CHECKBOX_NAME}
      control={control}
      error={hasError ? CHECKBOX_ERROR : undefined}
    >
      {CHECKBOX_CONTENT}
    </CheckboxContainer>
  );
};

describe("CheckboxContainer", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByRole, getByText, asFragment } = render(
        <CheckboxContainerForm />
      );
      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeVisible();
      expect(checkbox).toHaveAttribute("data-state", "unchecked");

      expect(getByText(CHECKBOX_CONTENT)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Error", () => {
    it("should render correctly", () => {
      const { getByRole, getByText, asFragment } = render(
        <CheckboxContainerForm hasError />
      );
      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeVisible();
      expect(checkbox).toHaveAttribute("data-state", "unchecked");

      expect(getByText(CHECKBOX_CONTENT)).toBeVisible();
      expect(getByText(CHECKBOX_ERROR)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
