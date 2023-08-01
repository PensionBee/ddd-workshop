import { render, vi } from "@shared/testUtils";
import { FooterQuestionSection } from "./FooterQuestionSection";

describe("FooterQuestionSection", () => {
  const TEST_ID = "FooterQuestionSection";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <FooterQuestionSection data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
