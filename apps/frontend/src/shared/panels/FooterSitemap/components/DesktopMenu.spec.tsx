import { render, vi } from "@shared/testUtils";
import { FOOTER_MENU_SECTIONS } from "../FooterSitemap.content";
import { DesktopMenu, DesktopListItem, DesktopList } from "./DesktopMenu";

describe("DesktopMenu", () => {
  const TEST_ID = "DesktopMenu";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <DesktopMenu data-testid={TEST_ID} sections={FOOTER_MENU_SECTIONS} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});

describe("DesktopListItem", () => {
  const TEST_ID = "DesktopListItem";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <DesktopListItem data-testid={TEST_ID} linkText={""} href={undefined} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});

describe("DesktopList", () => {
  const TEST_ID = "DesktopList";
  it("should render", () => {
    const { getByTestId, asFragment } = render(
      <DesktopList data-testid={TEST_ID} title={""} list={[]} />
    );
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(asFragment).toMatchSnapshot();
  });
});
