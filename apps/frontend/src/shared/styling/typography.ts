import { css } from "styled-components";
import { mediaFrom } from "./mediaQueries";

// DISPLAY FONTS
// =============================================================================

/**
 * Font weight mappings (for reference):
 *
 * EL (Extra Light) = 200
 * L (Light) = 300
 * R (Regular) = 400
 * M (Medium) = 500
 * B (Bold) = 700
 * H (Heavy) = 800
 */

export const display1 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 9rem;
  line-height: 11.2rem;
  letter-spacing: -0.02rem;
`;

export const display2 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 7rem;
  line-height: 8.8rem;
  letter-spacing: -0.01rem;
`;

export const display3 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 6rem;
  line-height: 7.5rem;
  letter-spacing: 0rem;
`;

export const display4 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 4.2rem;
  line-height: 6rem;
  letter-spacing: 0rem;
`;

// HEADER FONTS
// =============================================================================

export const heading1 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 800;
  font-size: 3.6rem;
  line-height: 4.5rem;
  letter-spacing: 0rem;
  ${mediaFrom.xl} {
    font-size: 4.8rem;
    line-height: 6rem;
  }
`;

export const heading2 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 800;
  font-size: 3rem;
  line-height: 4.2rem;
  letter-spacing: 0rem;
`;

export const heading2El = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 3rem;
  line-height: 4.2rem;
  letter-spacing: 0rem;
`;

export const heading3 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 800;
  font-size: 2.5rem;
  line-height: 3.5rem;
  letter-spacing: 0rem;
`;

export const heading3El = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 2.5rem;
  line-height: 3.5rem;
  letter-spacing: 0rem;
`;

export const heading4 = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 800;
  font-size: 2.2rem;
  line-height: 3.1rem;
  letter-spacing: 0rem;
`;

// BODY FONTS + OTHER
// =============================================================================

// Body

export const bodyLarge = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 200;
  font-size: 2.2rem;
  line-height: 3.1rem;
  letter-spacing: 0rem;
`;

export const bodyMedium = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 2.9rem;
  letter-spacing: 0.02rem;
`;

export const bodySmallL = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 2.6rem;
  letter-spacing: 0.02rem;
`;

export const bodySmallR = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.6rem;
  letter-spacing: 0.02rem;
`;

export const bodySmallM = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.6rem;
  letter-spacing: 0.02rem;
`;

export const bodySmallB = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.6rem;
  letter-spacing: 0.02rem;
`;

export const bodySmallH = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 800;
  font-size: 1.6rem;
  line-height: 2.6rem;
  letter-spacing: 0.02rem;
`;

// Caption

export const captionL = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 2.2rem;
  letter-spacing: 0.02rem;
`;

export const captionR = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.2rem;
  letter-spacing: 0.02rem;
`;

export const captionM = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.2rem;
  letter-spacing: 0.02rem;
`;

export const captionB = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.2rem;
  letter-spacing: 0.02rem;
`;

// Disclaimer

export const disclaimerL = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.02rem;
`;

export const disclaimerR = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.02rem;
`;

export const disclaimerM = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.02rem;
`;

export const disclaimerB = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.02rem;
`;

// Utility

export const category = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 1.7rem;
  letter-spacing: 0.02rem;
`;

export const appNav = css`
  font-family: "ryo-gothic-plusn", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.5rem;
  letter-spacing: 0.02rem;
`;
