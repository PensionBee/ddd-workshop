import { mockMediaMatches, routerRender } from "@shared/testUtils";
import { HeaderBeehiveMenu } from "./HeaderBeehiveMenu";
import { vi } from "vitest";

vi.mock("@modules/_app/api/appQueries", () => ({
  _esModule: true,
  usePermissionsQuery: () => ({
    isLoading: true,
    data: {},
  }),
}));

describe("HeaderBeehiveMenu", () => {
  describe("isLoading", () => {
    const TEST_ID = "HeaderBeehiveMenu";

    it("should not render when loading", () => {
      mockMediaMatches("lg");
      const { queryByTestId, asFragment } = routerRender(
        <HeaderBeehiveMenu data-testid={TEST_ID} />
      );
      expect(queryByTestId(TEST_ID)).not.toBeInTheDocument();
      expect(asFragment).toMatchSnapshot();
    });
  });
});