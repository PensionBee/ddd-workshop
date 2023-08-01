import { mockMediaMatches, routerRender, vi } from "@shared/testUtils";
import { HeaderBeehiveMenu } from "./HeaderBeehiveMenu";
import { getDynamicHeaderBeehiveMenuContent } from "./HeaderBeehiveMenu.content";

vi.mock("@modules/_app/api/appQueries", () => ({
  _esModule: true,
  usePermissionsQuery: () => ({
    isLoading: false,
    data: {
      beehiveMenu: {
        canAccessBalance: false,
      },
    },
  }),
}));

describe("HeaderBeehiveMenu", () => {
  const TEST_ID = "HeaderBeehiveMenu";
  it("should render on desktop", () => {
    mockMediaMatches("lg");
    const { getByTestId, asFragment } = routerRender(
      <HeaderBeehiveMenu data-testid={TEST_ID} />
    );
    const menu = getByTestId(TEST_ID);
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveAttribute("data-state", "desktop");
    expect(asFragment).toMatchSnapshot();
  });

  it("should render on mobile", () => {
    mockMediaMatches("xs");
    const { getByTestId, asFragment } = routerRender(
      <HeaderBeehiveMenu data-testid={TEST_ID} />
    );
    const menu = getByTestId(TEST_ID);
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveAttribute("data-state", "mobile");
    expect(asFragment).toMatchSnapshot();
  });
});

describe("HeaderBeehiveMenuContent", () => {
  describe("Default", () => {
    it("should hide hidden links", () => {
      getDynamicHeaderBeehiveMenuContent().forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(item, "hidden")) {
          return expect(item.hidden).toBe(true);
        }
        return expect(item.hidden).toBe(undefined);
      });
    });
  });

  describe("Dynamic", () => {
    it("should hide hidden links", () => {
      getDynamicHeaderBeehiveMenuContent().forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(item, "hidden")) {
          return expect(item.hidden).toBe(true);
        }
        return expect(item.hidden).toBe(undefined);
      });
    });

    it("should show links when permissions allow it", () => {
      getDynamicHeaderBeehiveMenuContent({
        beehiveMenu: {
          canAccessBalance: true,
        },
      }).forEach((item) => {
        if (item.children === "Balance") {
          return expect(item.hidden).toBe(false);
        }
        if (Object.prototype.hasOwnProperty.call(item, "hidden")) {
          return expect(item.hidden).toBe(true);
        }
        return expect(item.hidden).toBe(undefined);
      });
    });
  });
});
