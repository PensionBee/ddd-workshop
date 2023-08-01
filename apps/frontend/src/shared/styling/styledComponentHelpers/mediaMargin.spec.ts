import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import {
  mediaMargin,
  mediaMarginX,
  mediaMarginY,
  mediaMarginBottom,
  mediaMarginLeft,
  mediaMarginRight,
  mediaMarginTop,
} from "./mediaMargin";

vi.mock("styled-components", () => ({ css: vi.fn() }));
vi.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaMargin", () => {
  it("should return number css", () => {
    mediaMargin("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ margin: "10px" });
  });
  it("should return string css", () => {
    mediaMargin("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ margin: "2rem" });
  });
});

describe("mediaMarginX", () => {
  it("should return number css", () => {
    mediaMarginX("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({
      marginLeft: "10px",
      marginRight: "10px",
    });
  });
  it("should return string css", () => {
    mediaMarginX("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({
      marginLeft: "2rem",
      marginRight: "2rem",
    });
  });
});

describe("mediaMarginY", () => {
  it("should return number css", () => {
    mediaMarginY("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({
      marginTop: "10px",
      marginBottom: "10px",
    });
  });
  it("should return string css", () => {
    mediaMarginY("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({
      marginTop: "2rem",
      marginBottom: "2rem",
    });
  });
});

describe("mediaMarginBottom", () => {
  it("should return number css", () => {
    mediaMarginBottom("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ marginBottom: "10px" });
  });
  it("should return string css", () => {
    mediaMarginBottom("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ marginBottom: "2rem" });
  });
});

describe("mediaMarginLeft", () => {
  it("should return number css", () => {
    mediaMarginLeft("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ marginLeft: "10px" });
  });
  it("should return string css", () => {
    mediaMarginLeft("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ marginLeft: "2rem" });
  });
});

describe("mediaMarginRight", () => {
  it("should return number css", () => {
    mediaMarginRight("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ marginRight: "10px" });
  });
  it("should return string css", () => {
    mediaMarginRight("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ marginRight: "2rem" });
  });
});

describe("mediaMarginTop", () => {
  it("should return number css", () => {
    mediaMarginTop("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ marginTop: "10px" });
  });
  it("should return string css", () => {
    mediaMarginTop("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ marginTop: "2rem" });
  });
});
