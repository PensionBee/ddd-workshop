import { mockMediaMatches, routerRender, vi } from "@shared/testUtils";
import { HeaderBeehiveMenu } from "./HeaderBeehiveMenu";

vi.mock("@modules/_app/api/appQueries", () => ({
  _esModule: true,
  usePermissionsQuery: () => ({
    isLoading: false,
    data: {},
  }),
}));

describe("HeaderBeehiveMenu", () => {
  describe("Permissions", () => {
    const TEST_ID = "HeaderBeehiveMenu";

    it("should load basic content without permissions", () => {
      mockMediaMatches("lg");
      const { queryByTestId, asFragment } = routerRender(
        <HeaderBeehiveMenu data-testid={TEST_ID} />
      );
      expect(queryByTestId(TEST_ID)).toBeInTheDocument();
      expect(asFragment).toMatchSnapshot();
    });
  });
});
