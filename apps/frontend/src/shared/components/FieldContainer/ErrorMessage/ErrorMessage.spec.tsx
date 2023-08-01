import { render, vi } from "@shared/testUtils";
import { ErrorMessage } from "./ErrorMessage";

const ERROR_MESSAGE = "Error message";

describe("FieldWrapper/ErrorMessage", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = render(
      <ErrorMessage>{ERROR_MESSAGE}</ErrorMessage>
    );

    expect(getByText(ERROR_MESSAGE)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
  it("should not render if no children", () => {
    const { container } = render(<ErrorMessage />);

    expect(container.firstChild).toBeNull();
  });
});
