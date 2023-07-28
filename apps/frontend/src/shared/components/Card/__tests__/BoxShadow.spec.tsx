import { render } from "@shared/testUtils";
import { Card, getBoxShadow } from "../Card";

jest.mock("../../Box/Box", () => ({
  __esModule: true,
  Box: jest.fn(() => null),
}));

import { Box } from "../../Box/Box";

const DEFAULT_ELEVATION = 4;

describe("getBoxShadow", () => {
  it("should return correct box shadow", () => {
    expect(getBoxShadow()).toBe(getBoxShadow(DEFAULT_ELEVATION));
  });
});

describe("elevation", () => {
  it("should pass boxShadow based on default elevation", () => {
    const { asFragment } = render(
      <Card>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Card>
    );

    expect(Box).toHaveBeenCalledWith(
      expect.objectContaining({
        boxShadow: getBoxShadow(DEFAULT_ELEVATION),
      }),
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should pass boxShadow based on elevation", () => {
    const elevation = 8;
    const { asFragment } = render(
      <Card elevation={elevation}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Card>
    );

    expect(Box).toHaveBeenCalledWith(
      expect.objectContaining({
        boxShadow: getBoxShadow(elevation),
      }),
      {}
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
