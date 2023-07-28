import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaCursor } from "./mediaCursor";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaCursor", () => {
  it("should return css", () => {
    mediaCursor("xs", { xs: "pointer" });
    expect(css).toHaveBeenCalledWith({ cursor: "pointer" });
  });
});
