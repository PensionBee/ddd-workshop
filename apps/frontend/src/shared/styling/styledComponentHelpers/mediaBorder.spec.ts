import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import {
  mediaBorder,
  mediaBorderBottom,
  mediaBorderLeft,
  mediaBorderRight,
  mediaBorderTop,
  mediaBorderStyle,
  mediaBorderRadius,
} from "./mediaBorder";

vi.mock("styled-components", () => ({ css: vi.fn() }));
vi.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaBorder", () => {
  it("should return css", () => {
    mediaBorder("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ borderWidth: "1px" });
  });
});

describe("mediaBorderBottom", () => {
  it("should return css", () => {
    mediaBorderBottom("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ borderBottomWidth: "1px" });
  });
});

describe("mediaBorderLeft", () => {
  it("should return css", () => {
    mediaBorderLeft("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ borderLeftWidth: "1px" });
  });
});

describe("mediaBorderRight", () => {
  it("should return css", () => {
    mediaBorderRight("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ borderRightWidth: "1px" });
  });
});

describe("mediaBorderTop", () => {
  it("should return css", () => {
    mediaBorderTop("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ borderTopWidth: "1px" });
  });
});

describe("mediaBorderStyle", () => {
  it("should return css", () => {
    mediaBorderStyle("xs", { xs: "dotted" });
    expect(css).toHaveBeenCalledWith({ borderStyle: "dotted" });
  });
});

describe("mediaBorderRadius", () => {
  it("should return css", () => {
    mediaBorderRadius("xs", { xs: 1 });
    expect(css).toHaveBeenCalledWith({ borderRadius: "1px" });
  });
});
