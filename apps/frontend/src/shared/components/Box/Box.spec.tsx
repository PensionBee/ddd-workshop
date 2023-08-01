import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  const boxContent = "Box Content";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(<Box>{boxContent}</Box>);

      expect(getByText(boxContent)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render as elements", () => {
      const { container, asFragment } = render(
        <Box as="span">{boxContent}</Box>
      );

      expect(container.getElementsByTagName("span").length).toBe(1);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
