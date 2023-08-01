import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { HintText } from "./HintText";

const HINT_TEXT = "Hint text";

describe("FieldWrapper/HintText", () => {
  it("should render correctly", () => {
    const { getByText, asFragment } = render(<HintText hintText={HINT_TEXT} />);

    expect(getByText(HINT_TEXT)).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
  it("should not render if no hintText", () => {
    const { container } = render(<HintText />);

    expect(container.firstChild).toBeNull();
  });
});
