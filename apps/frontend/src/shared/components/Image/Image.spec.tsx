import { render } from "@shared/testUtils";
import { vi } from "vitest";
import { Image } from "./Image";

describe("Image", () => {
  const imageAltText = "Image";

  describe("Default", () => {
    it("should render correctly", () => {
      const { getByAltText, asFragment } = render(
        <Image src="./__tests__/test-image.svg" alt="Image" />
      );

      expect(getByAltText(imageAltText)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
