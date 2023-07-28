import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import {
  mediaPosition,
  mediaBottom,
  mediaLeft,
  mediaRight,
  mediaTop,
  mediaZIndex,
} from "./mediaPosition";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaPosition", () => {
  it("should return css", () => {
    mediaPosition("xs", { xs: "absolute" });
    expect(css).toHaveBeenCalledWith({ position: "absolute" });
  });
});

describe("mediaBottom", () => {
  it("should return number css", () => {
    mediaBottom("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ bottom: "10px" });
  });
  it("should return string css", () => {
    mediaBottom("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ bottom: "2rem" });
  });
});

describe("mediaLeft", () => {
  it("should return number css", () => {
    mediaLeft("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ left: "10px" });
  });
  it("should return string css", () => {
    mediaLeft("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ left: "2rem" });
  });
});

describe("mediaRight", () => {
  it("should return number css", () => {
    mediaRight("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ right: "10px" });
  });
  it("should return string css", () => {
    mediaRight("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ right: "2rem" });
  });
});

describe("mediaTop", () => {
  it("should return number css", () => {
    mediaTop("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ top: "10px" });
  });
  it("should return string css", () => {
    mediaTop("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ top: "2rem" });
  });
});

describe("mediaZIndex", () => {
  it("should return css", () => {
    mediaZIndex("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ zIndex: 10 });
  });
});
