import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import {
  mediaAlign,
  mediaColGap,
  mediaRowGap,
  mediaDirection,
  mediaFlex,
  mediaJustify,
  mediaNoWrap,
  mediaFlexItemOrder,
} from "./mediaFlex";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaAlign", () => {
  it("should return css", () => {
    mediaAlign("xs", { xs: "center" });
    expect(css).toHaveBeenCalledWith({ alignItems: "center" });
  });
});

describe("mediaColGap", () => {
  it("should return css", () => {
    mediaColGap("xs", { xs: 2 });
    expect(css).toHaveBeenCalledWith({ columnGap: "2px" });
  });
});

describe("mediaRowGap", () => {
  it("should return css", () => {
    mediaRowGap("xs", { xs: 2 });
    expect(css).toHaveBeenCalledWith({ rowGap: "2px" });
  });
});

describe("mediaDirection", () => {
  it("should return css", () => {
    mediaDirection("xs", { xs: "column" });
    expect(css).toHaveBeenCalledWith({ flexDirection: "column" });
  });
});

describe("mediaFlex", () => {
  it("should return css", () => {
    mediaFlex("xs", { xs: "1" });
    expect(css).toHaveBeenCalledWith({ flex: "1" });
  });
});

describe("mediaJustify", () => {
  it("should return css", () => {
    mediaJustify("xs", { xs: "center" });
    expect(css).toHaveBeenCalledWith({ justifyContent: "center" });
  });
});

describe("mediaNoWrap", () => {
  it("should return css when true", () => {
    mediaNoWrap("xs", { xs: true });
    expect(css).toHaveBeenCalledWith({ flexWrap: "nowrap" });
  });
  it("should return css when undefined", () => {
    mediaNoWrap("xs", { xs: undefined });
    expect(css).toHaveBeenCalledWith({ flexWrap: "wrap" });
  });
});

describe("mediaFlexItemOrder", () => {
  it("should return css", () => {
    mediaFlexItemOrder("xs", { xs: 2 });
    expect(css).toHaveBeenCalledWith({ order: 2 });
  });
});
