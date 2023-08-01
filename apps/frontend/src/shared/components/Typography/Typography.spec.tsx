import { render } from "@shared/testUtils";
import { vi } from "vitest";
import {
  AppNav,
  BodyLarge,
  BodyMedium,
  BodySmallB,
  BodySmallH,
  BodySmallL,
  BodySmallM,
  BodySmallR,
  CaptionB,
  CaptionL,
  CaptionM,
  CaptionR,
  Category,
  DisclaimerB,
  DisclaimerL,
  DisclaimerM,
  DisclaimerR,
  Display1,
  Display2,
  Display3,
  Display4,
  Heading1,
  Heading2,
  Heading2El,
  Heading3,
  Heading3El,
  Heading4,
  Typography,
  type VariantTypographyProps,
} from "./Typography";
import type { TypographyTags } from "./Typography.types";

const textContent = "Default text";

describe("Default Typography", () => {
  it("should render correctly", () => {
    const { container, getByText, asFragment } = render(
      <Typography variant="bodySmallL">{textContent}</Typography>
    );
    expect(getByText(textContent)).toBeVisible();
    expect(container.getElementsByTagName("span").length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });
});

const itShouldRender = (Component: React.FC<VariantTypographyProps>) => {
  const { getByText, asFragment } = render(
    <Component>{textContent}</Component>
  );
  expect(getByText(textContent)).toBeVisible();
  expect(asFragment()).toMatchSnapshot();
};

const itShouldRenderAs = (
  Component: React.FC<VariantTypographyProps>,
  element: TypographyTags = "span"
) => {
  const { container, getByText, asFragment } = render(
    <Component>{textContent}</Component>
  );
  expect(getByText(textContent)).toBeVisible();
  expect(container.getElementsByTagName(element).length).toBe(1);
  expect(asFragment()).toMatchSnapshot();
};

// Test headings

describe("Heading 1", () => {
  it("should render correctly", () => itShouldRender(Heading1));
  it("should render as correct element", () =>
    itShouldRenderAs(Heading1, "h1"));
});

describe("Heading 2", () => {
  it("should render correctly", () => itShouldRender(Heading2));
  it("should render as correct element", () =>
    itShouldRenderAs(Heading2, "h2"));
});

describe("Heading 3", () => {
  it("should render correctly", () => itShouldRender(Heading3));
  it("should render as correct element", () =>
    itShouldRenderAs(Heading3, "h3"));
});

describe("Heading 4", () => {
  it("should render correctly", () => itShouldRender(Heading4));
  it("should render as correct element", () =>
    itShouldRenderAs(Heading4, "h4"));
});

describe("Heading 2 El", () => {
  it("should render correctly", () => itShouldRender(Heading2El));
  it("should render as correct element", () =>
    itShouldRenderAs(Heading2El, "h2"));
});

describe("Heading 3 El", () => {
  it("should render correctly", () => itShouldRender(Heading3El));
  it("should render as correct element", () =>
    itShouldRenderAs(Heading3El, "h3"));
});

// Test rest of typography components

const typographyComponentsToTest = [
  AppNav,
  BodyLarge,
  BodyMedium,
  BodySmallB,
  BodySmallH,
  BodySmallL,
  BodySmallM,
  BodySmallR,
  CaptionL,
  CaptionR,
  CaptionM,
  CaptionB,
  Category,
  DisclaimerL,
  DisclaimerR,
  DisclaimerM,
  DisclaimerB,
  Display1,
  Display2,
  Display3,
  Display4,
];

Object.values(typographyComponentsToTest).forEach((Component) => {
  describe(Component.displayName || Component.name, () => {
    it("should render correctly", () => itShouldRender(Component));
    it("should render as correct element", () => itShouldRenderAs(Component));
  });
});
