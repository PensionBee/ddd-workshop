import { render, vi } from "@shared/testUtils";
import { LazyLoad } from "./LazyLoad";

describe("LazyLoad", () => {
  const lazyContent = "Lazy Content";
  const lazyPlaceholder = "Lazy Placeholder";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <LazyLoad placeholder={lazyPlaceholder}>{lazyContent}</LazyLoad>
      );

      expect(getByText(lazyContent)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});