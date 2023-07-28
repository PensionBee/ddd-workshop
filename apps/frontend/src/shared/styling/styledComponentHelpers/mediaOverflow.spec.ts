import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaOverflow, mediaOverflowX, mediaOverflowY } from "./mediaOverflow";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaOverflow", () => {
  it("should return number css", () => {
    mediaOverflow("xs", { xs: "hidden" });
    expect(css).toHaveBeenCalledWith({ overflow: "hidden" });
  });
});

describe("mediaOverflowX", () => {
  it("should return number css", () => {
    mediaOverflowX("xs", { xs: "hidden" });
    expect(css).toHaveBeenCalledWith({ overflowX: "hidden" });
  });
});

describe("mediaOverflowY", () => {
  it("should return number css", () => {
    mediaOverflowY("xs", { xs: "hidden" });
    expect(css).toHaveBeenCalledWith({ overflowY: "hidden" });
  });
});
