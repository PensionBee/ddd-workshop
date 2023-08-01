import { render } from "@shared/testUtils";
import { Link } from "./Link";

describe("Link", () => {
  const linkText = "Link text";
  const linkUrl = "/test";
  describe("Default", () => {
    it("should render correctly", () => {
      const { getByText, asFragment } = render(
        <Link href={linkUrl}>{linkText}</Link>
      );

      expect(getByText(linkText)).toBeVisible();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
