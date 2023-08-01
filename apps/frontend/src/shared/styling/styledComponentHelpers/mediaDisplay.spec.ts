import type { BreakpointValues } from "@shared/utils/types";
import type { Breakpoints } from "../breakpoints";
import { mediaDisplay } from "./mediaDisplay";
import { css } from "styled-components";
import { vi } from "@shared/testUtils";

vi.mock("styled-components", () => ({ css: vi.fn() }));
vi.mock("./createMediaValue", () => ({
  createMediaValue: <T>(createMedia: (value: T) => null) => {
    return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
      return createMedia(value[breakpoint] as T);
    };
  },
}));

describe("mediaDisplay", () => {
  it("should return css", () => {
    mediaDisplay("xs", { xs: "flex" });
    expect(css).toHaveBeenCalledWith({ display: "flex" });
  });
});
