import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { FooterFcaSection } from "./FooterFcaSection";

describe("FooterFcaSection", () => {
  const TEST_ID = "FooterFcaSection";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <FooterFcaSection data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
