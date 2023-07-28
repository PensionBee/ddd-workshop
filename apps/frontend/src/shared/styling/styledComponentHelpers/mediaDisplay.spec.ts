import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaDisplay } from "./mediaDisplay";

jest.mock("styled-components", () => ({ css: jest.fn() }));
jest.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

import { css } from "styled-components";

describe("mediaDisplay", () => {
  it("should return css", () => {
    mediaDisplay("xs", { xs: "flex" });
    expect(css).toHaveBeenCalledWith({ display: "flex" });
  });
});
