import { render } from "@shared/testUtils";
import { FooterCopyrightSection } from "./FooterCopyrightSection";

describe("FooterCopyrightSection", () => {
  const TEST_ID = "FooterCopyrightSection";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <FooterCopyrightSection data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
