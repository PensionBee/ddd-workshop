import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaHeight, mediaMinHeight, mediaMaxHeight } from "./mediaHeight";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaHeight", () => {
  it("should return number css", () => {
    mediaHeight("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ height: "10px" });
  });
  it("should return string css", () => {
    mediaHeight("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ height: "2rem" });
  });
});

describe("mediaMinHeight", () => {
  it("should return number css", () => {
    mediaMinHeight("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ minHeight: "10px" });
  });
  it("should return string css", () => {
    mediaMinHeight("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ minHeight: "2rem" });
  });
});

describe("mediaMaxHeight", () => {
  it("should return number css", () => {
    mediaMaxHeight("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ maxHeight: "10px" });
  });
  it("should return string css", () => {
    mediaMaxHeight("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ maxHeight: "2rem" });
  });
});
