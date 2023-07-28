import { mockMediaMatches, render } from "@shared/testUtils";
import { HeaderMainNavbar } from "./HeaderMainNavbar";

describe("HeaderMainNavbar", () => {
  const TEST_ID = "HeaderMainNavbar";
  it("should render", () => {
    mockMediaMatches("xs");
    const { getByTestId, asFragment } = render(
      <HeaderMainNavbar data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
