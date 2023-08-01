import { render, vi } from "@shared/testUtils";
import { Label } from "./Label";

const LABEL_TEXT = "Label text";

describe("FieldWrapper/Label", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = render(<Label label={LABEL_TEXT} />);

    expect(getByText(LABEL_TEXT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
  it("should not render if no label", () => {
    const { container } = render(<Label />);

    expect(container.firstChild).toBeNull();
  });
});
