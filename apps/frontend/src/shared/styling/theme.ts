const colors = {
  yellow: "#f9c000",
  black: "#343a40",
  white: "#ffffff",
  success: "#24B6B6",
  error: "#D7384D",
  warning: "#FA8C2E",
  link: "#007DB7",
  linkActive: "#004b6e",
  red100: "#D7384D",
  teal100: "#24B6B6",
  orange100: "#FA8C2E",
  green100: "#519828",
  blue10: "#e5f3fa",
  blue100: "#007DB7",
  blue140: "#004b6e",
  grey1: "#667984",
  grey2: "#b0bdbf",
  grey3: "#dce0e1",
  grey4: "#e2e8ec",
  grey5: "#eff2f4",
  grey6: "#f4f6f8",
  grey7: "#f9fafb",
  grey8: "#fbfcfd",
  transparent: "#00000000",
} as const;

const gradients = {
  grey: [colors.grey6, colors.white],
  blue: [colors.blue10, colors.white],
  dark: [colors.white, colors.black],
  light: [colors.white, colors.transparent],
  // Reversed gradients
  greyAlt: [colors.white, colors.grey6],
  blueAlt: [colors.white, colors.blue10],
  darkAlt: [colors.black, colors.white],
  lightAlt: [colors.transparent, colors.white],
} as const;

const transitions = {
  main: ".2s cubic-bezier(.6, .55, .65, 1.55)",
} as const;

const borderStyle = {
  dotted: "dotted",
  dashed: "dashed",
  solid: "solid",
} as const;

// Exports
export const theme = {
  colors,
  gradients,
  transitions,
  borderStyle,
} as const;

export type ThemeType = typeof theme;
export type ThemeColors = keyof typeof theme.colors;
export type ThemeGradients = keyof typeof theme.gradients;
