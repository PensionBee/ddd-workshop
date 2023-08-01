import { render, vi } from "@shared/testUtils";
import { FooterCredentialsSection } from "./FooterCredentialsSection";

describe("FooterCredentialsSection", () => {
  const TEST_ID = "FooterCredentialsSection";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <FooterCredentialsSection data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
