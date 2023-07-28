import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import {
  mediaPadding,
  mediaPaddingX,
  mediaPaddingY,
  mediaPaddingBottom,
  mediaPaddingLeft,
  mediaPaddingRight,
  mediaPaddingTop,
} from "./mediaPadding";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaPadding", () => {
  it("should return number css", () => {
    mediaPadding("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ padding: "10px" });
  });
  it("should return string css", () => {
    mediaPadding("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ padding: "2rem" });
  });
});

describe("mediaPaddingX", () => {
  it("should return number css", () => {
    mediaPaddingX("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({
      paddingLeft: "10px",
      paddingRight: "10px",
    });
  });
  it("should return string css", () => {
    mediaPaddingX("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({
      paddingLeft: "2rem",
      paddingRight: "2rem",
    });
  });
});

describe("mediaPaddingY", () => {
  it("should return number css", () => {
    mediaPaddingY("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({
      paddingTop: "10px",
      paddingBottom: "10px",
    });
  });
  it("should return string css", () => {
    mediaPaddingY("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({
      paddingTop: "2rem",
      paddingBottom: "2rem",
    });
  });
});

describe("mediaPaddingBottom", () => {
  it("should return number css", () => {
    mediaPaddingBottom("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ paddingBottom: "10px" });
  });
  it("should return string css", () => {
    mediaPaddingBottom("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ paddingBottom: "2rem" });
  });
});

describe("mediaPaddingLeft", () => {
  it("should return number css", () => {
    mediaPaddingLeft("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ paddingLeft: "10px" });
  });
  it("should return string css", () => {
    mediaPaddingLeft("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ paddingLeft: "2rem" });
  });
});

describe("mediaPaddingRight", () => {
  it("should return number css", () => {
    mediaPaddingRight("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ paddingRight: "10px" });
  });
  it("should return string css", () => {
    mediaPaddingRight("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ paddingRight: "2rem" });
  });
});

describe("mediaPaddingTop", () => {
  it("should return number css", () => {
    mediaPaddingTop("xs", { xs: 10 });
    expect(css).toHaveBeenCalledWith({ paddingTop: "10px" });
  });
  it("should return string css", () => {
    mediaPaddingTop("xs", { xs: "2rem" });
    expect(css).toHaveBeenCalledWith({ paddingTop: "2rem" });
  });
});
