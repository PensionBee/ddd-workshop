import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaBoxShadow, mediaOpacity } from "./mediaEffects"
import { css } from "styled-components";
import { vi } from "vitest";

vi.mock("styled-components", () => ({ css: vi.fn() }));
vi.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

describe("mediaBoxShadow", () => {
  it("should return css", () => {
    const BOX_SHADOW = "0px 0px 10px 4px #dce0e14d";
    mediaBoxShadow("xs", { xs: BOX_SHADOW });
    expect(css).toHaveBeenCalledWith({ boxShadow: BOX_SHADOW });
  });
});

describe("mediaOpacity", () => {
  it("should return css", () => {
    mediaOpacity("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ opacity: 1 });
  });
});
