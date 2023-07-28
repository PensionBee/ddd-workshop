import { render } from "@shared/testUtils";
import { DashboardLayout } from "./DashboardLayout";

jest.mock("@shared/panels/HeaderBeehiveMenu", () => ({
  HeaderBeehiveMenu: () => <div data-testid="HeaderBeehiveMenu" />,
}));
jest.mock("@shared/panels/HeaderMainNavbar", () => ({
  HeaderMainNavbar: () => <div data-testid="HeaderMainNavbar" />,
}));
jest.mock("@shared/panels/FooterContactSection", () => ({
  FooterContactSection: () => <div data-testid="FooterContactSection" />,
}));
jest.mock("@shared/panels/FooterCopyrightSection", () => ({
  FooterCopyrightSection: () => <div data-testid="FooterCopyrightSection" />,
}));
jest.mock("@shared/panels/FooterCredentialsSection", () => ({
  FooterCredentialsSection: () => (
    <div data-testid="FooterCredentialsSection" />
  ),
}));
jest.mock("@shared/panels/FooterFcaSection", () => ({
  FooterFcaSection: () => <div data-testid="FooterFcaSection" />,
}));
jest.mock("@shared/panels/FooterQuestionSection", () => ({
  FooterQuestionSection: () => <div data-testid="FooterQuestionSection" />,
}));
jest.mock("@shared/panels/FooterSitemap", () => ({
  FooterSitemap: () => <div data-testid="FooterSitemap" />,
}));
jest.mock("@shared/panels/FooterSocialMediaList", () => ({
  FooterSocialMediaList: () => <div data-testid="FooterSocialMediaList" />,
}));

describe("DashboardLayout", () => {
  const TEST_ID = "DashboardLayout";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <DashboardLayout data-testid={TEST_ID} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should render each panel", () => {
    const { getByTestId } = render(<DashboardLayout />);
    expect(getByTestId("HeaderBeehiveMenu")).toBeInTheDocument();
    expect(getByTestId("FooterContactSection")).toBeInTheDocument();
    expect(getByTestId("FooterCopyrightSection")).toBeInTheDocument();
    expect(getByTestId("FooterCredentialsSection")).toBeInTheDocument();
    expect(getByTestId("FooterFcaSection")).toBeInTheDocument();
    expect(getByTestId("FooterQuestionSection")).toBeInTheDocument();
    expect(getByTestId("FooterSitemap")).toBeInTheDocument();
    expect(getByTestId("FooterSocialMediaList")).toBeInTheDocument();
    expect(getByTestId("HeaderMainNavbar")).toBeInTheDocument();
  });
});
