import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import {
  mediaTextColor,
  mediaTextNoWrap,
  mediaTextAlign,
} from "./mediaTypography";
import { theme } from "../theme";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaTextColor", () => {
  it("should return css", () => {
    mediaTextColor("xs", { xs: "yellow" });
    expect(css).toHaveBeenCalledWith({ color: theme.colors["yellow"] });
  });
});

describe("mediaTextNoWrap", () => {
  it("should return css when true", () => {
    mediaTextNoWrap("xs", { xs: true });
    expect(css).toHaveBeenCalledWith({ whiteSpace: "nowrap" });
  });
  it("should return css when undefined", () => {
    mediaTextNoWrap("xs", { xs: undefined });
    expect(css).toHaveBeenCalledWith({ whiteSpace: "normal" });
  });
});

describe("mediaTextAlign", () => {
  it("should return css", () => {
    mediaTextAlign("xs", { xs: "center" });
    expect(css).toHaveBeenCalledWith({ textAlign: "center" });
  });
});
