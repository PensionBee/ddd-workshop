import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaWidth, mediaMinWidth, mediaMaxWidth } from "./mediaWidth";

vi.mock("styled-components", () => ({ css: vi.fn() }));
vi.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaWidth", () => {
  it("should return number css", () => {
    mediaWidth("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ width: "10px" });
  });
  it("should return string css", () => {
    mediaWidth("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ width: "2rem" });
  });
});

describe("mediaMinWidth", () => {
  it("should return number css", () => {
    mediaMinWidth("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ minWidth: "10px" });
  });
  it("should return string css", () => {
    mediaMinWidth("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ minWidth: "2rem" });
  });
});

describe("mediaMaxWidth", () => {
  it("should return number css", () => {
    mediaMaxWidth("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ maxWidth: "10px" });
  });
  it("should return string css", () => {
    mediaMaxWidth("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ maxWidth: "2rem" });
  });
});
