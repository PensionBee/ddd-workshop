import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { FooterSocialMediaList } from "./FooterSocialMediaList";

describe("FooterSocialMediaList", () => {
  const TEST_ID = "FooterSocialMediaList";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <FooterSocialMediaList data-testid={TEST_ID} />
    );
    expect(getByTestId("FooterSocialMediaList")).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
