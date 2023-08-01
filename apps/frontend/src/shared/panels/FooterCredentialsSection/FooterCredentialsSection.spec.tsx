import { render } from "@shared/testUtils";
import { vi } from "vitest";
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
