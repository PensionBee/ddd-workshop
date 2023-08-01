import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { FooterContactSection } from "./FooterContactSection";

describe("FooterContactSection", () => {
  const TEST_ID = "FooterContactSection";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <FooterContactSection data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
