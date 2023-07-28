import { render } from "@shared/testUtils";
import { GridContainer } from "./GridContainer";

describe("Container", () => {
  const containerContent = "Container Content";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <GridContainer>{containerContent}</GridContainer>
      );

      expect(getByText(containerContent)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
