import { mockMediaMatches, render, vi } from "@shared/testUtils";
import { FooterSitemap } from "./FooterSitemap";

describe("FooterSitemap", () => {
  it("should render on xs", () => {
    mockMediaMatches("xs");

    const { getByTestId, asFragment } = render(<FooterSitemap />);
    expect(getByTestId("MobileMenu")).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should render on sm", () => {
    mockMediaMatches("sm");

    const { getByTestId, asFragment } = render(<FooterSitemap />);
    expect(getByTestId("MobileMenu")).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should render on md", () => {
    mockMediaMatches("md");

    const { getByTestId, asFragment } = render(<FooterSitemap />);
    expect(getByTestId("MobileMenu")).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should render on lg", () => {
    mockMediaMatches("lg");

    const { getByTestId, asFragment } = render(<FooterSitemap />);
    expect(getByTestId("DesktopMenu")).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });

  it("should render on xl", () => {
    mockMediaMatches("xl");

    const { getByTestId, asFragment } = render(<FooterSitemap />);
    expect(getByTestId("DesktopMenu")).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
