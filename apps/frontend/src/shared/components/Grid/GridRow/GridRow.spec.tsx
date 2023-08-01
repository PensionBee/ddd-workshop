import { render, vi } from "@shared/testUtils";
import { GridRow } from "./GridRow";

describe("GridRow", () => {
  const rowContent = "GridRow Content";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(<GridRow>{rowContent}</GridRow>);

      expect(getByText(rowContent)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render as elements", () => {
      const { container, asFragment } = render(
        <GridRow as="span">{rowContent}</GridRow>
      );

      expect(container.getElementsByTagName("span").length).toBe(1);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
