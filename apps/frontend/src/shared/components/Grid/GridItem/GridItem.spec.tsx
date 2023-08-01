import { render } from "@shared/testUtils";
import { GridItem } from "./GridItem";

describe("GridItem", () => {
  const colContent = "GridItem Content";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <GridItem>{colContent}</GridItem>
      );

      expect(getByText(colContent)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render as elements", () => {
      const { container, asFragment } = render(
        <GridItem as="span">{colContent}</GridItem>
      );

      expect(container.getElementsByTagName("span").length).toBe(1);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
