import { render } from "@shared/testUtils";
import { vi } from "vitest";
import {
  Card,
  _CardBaseComponent,
  _CardButtonComponent,
  _CardLinkComponent,
} from "./Card";

describe("Card", () => {
  describe("Default", () => {
    it("should render correctly", () => {
      const { asFragment } = render(
        <Card>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Card>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});

// Make sure story components are not rendered
describe("Card.stories", () => {
  it("_CardBaseComponent should return null", () => {
    expect(_CardBaseComponent({ children: null })).toBe(null);
  });
  it("_CardButtonComponent should return null", () => {
    expect(_CardButtonComponent({ as: "button" })).toBe(null);
  });
  it("_CardLinkComponent should return null", () => {
    expect(_CardLinkComponent({ as: "a" })).toBe(null);
  });
});
