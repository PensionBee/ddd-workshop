import { render } from "@shared/testUtils";
import { useForm } from "react-hook-form";
import { Checkbox } from "./Checkbox";

const CHECKBOX_TEST_ID = "checkbox";
const CHECKBOX_NAME = "Checkbox name";

const CheckboxForm = () => {
  const { control } = useForm();
  return (
    <Checkbox
      data-testid={CHECKBOX_TEST_ID}
      name={CHECKBOX_NAME}
      control={control}
    />
  );
};

describe("Checkbox", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { queryByRole, asFragment } = render(<CheckboxForm />);
      const checkbox = queryByRole("checkbox");

      expect(checkbox).toBeVisible();
      expect(checkbox).toHaveAttribute("data-state", "unchecked");
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
