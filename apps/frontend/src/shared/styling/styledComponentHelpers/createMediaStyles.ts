import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";
import type { Breakpoints } from "../breakpoints";
import { mediaFrom } from "../mediaQueries";

export const createMediaStyles = (
  fn: (breakpoint: Breakpoints) => FlattenSimpleInterpolation | undefined
) => {
  const xs = fn("xs");
  const sm = fn("sm");
  const md = fn("md");
  const lg = fn("lg");
  const xl = fn("xl");

  const smStyles = css`
    ${mediaFrom.sm} {
      ${() => sm}
    }
  `;
  const mdStyles = css`
    ${mediaFrom.md} {
      ${() => md}
    }
  `;
  const lgStyles = css`
    ${mediaFrom.lg} {
      ${() => lg}
    }
  `;
  const xlStyles = css`
    ${mediaFrom.xl} {
      ${() => xl}
    }
  `;

  return css`
    ${() => xs}
    ${() => (sm ? smStyles : null)}
    ${() => (md ? mdStyles : null)}
    ${() => (lg ? lgStyles : null)}
    ${() => (xl ? xlStyles : null)}
  `;
};
