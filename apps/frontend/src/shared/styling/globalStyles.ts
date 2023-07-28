import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  // RESET STYLES
  // ============

  // Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property.
  // The "symbol *" part is to solve Firefox SVG sprite bug
  *:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol
        *)) {
    all: unset;
    display: revert;
  }

  // Preferred box-sizing value
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  // Reapply the pointer cursor for anchor tags
  a,
  button {
    cursor: revert;
  }

  // Remove list styles (bullets/numbers)
  ol,
  ul,
  menu {
    list-style: none;
  }

  // For images to not be able to exceed their container
  img {
    max-width: 100%;
  }

  // Removes spacing between cells in tables
  table {
    border-collapse: collapse;
  }

  // Safari - solving issue when using user-select:none on the <body> text input doesn't working
  input,
  textarea {
    -webkit-user-select: auto;
  }

  // revert the 'white-space' property for textarea elements on Safari
  textarea {
    white-space: revert;
  }

  // Minimum style to allow to style meter element
  meter {
    -webkit-appearance: revert;
    appearance: revert;
  }

  // Reset default text opacity of input placeholder
  ::placeholder {
    color: unset;
  }

  // Fix the feature of 'hidden' attribute.
  // display:revert; revert to element instead of attribute
  :where([hidden]) {
    display: none;
  }

  // Revert for bug in Chromium browsers
  // Fix for the content editable attribute will work properly.
  // webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element
  :where([contenteditable]:not([contenteditable="false"])) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    -webkit-user-select: auto;
  }

  // Apply back the draggable feature - exist only in Chromium and Safari
  :where([draggable="true"]) {
    -webkit-user-drag: element;
  }

  // GLOBAL STYLES

  html {
    font-size: 62.5%;
    font-family: sans-serif;
  }

  body {
    font-family: "ryo-gothic-plusn", sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 1.625;
    letter-spacing: 0.5px;
    color: #343a40;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
