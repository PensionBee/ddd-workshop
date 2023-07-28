import { theme } from "@shared/styling/theme";
import { bodySmallM } from "@shared/styling/typography";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export const StyledToastContainer = styled(ToastContainer)`
  --toastify-color-light: ${theme.colors.white};
  --toastify-color-dark: ${theme.colors.black};
  --toastify-color-info: ${theme.colors.teal100};
  --toastify-color-success: ${theme.colors.green100};
  --toastify-color-warning: ${theme.colors.orange100};
  --toastify-color-error: ${theme.colors.red100};
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-toast-width: 320px;
  --toastify-toast-background: ${theme.colors.white};
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;

  --toastify-text-color-light: ${theme.colors.black};
  --toastify-text-color-dark: ${theme.colors.white};

  //Used only for colored theme
  --toastify-text-color-info: ${theme.colors.white};
  --toastify-text-color-success: ${theme.colors.white};
  --toastify-text-color-warning: ${theme.colors.white};
  --toastify-text-color-error: ${theme.colors.white};

  --toastify-spinner-color: ${theme.colors.black};
  --toastify-spinner-color-empty-area: ${theme.colors.white};

  // Used when no type is provided
  // toast("**hello**")
  --toastify-color-progress-light: ${theme.colors.yellow};
  // Used when no type is provided
  --toastify-color-progress-dark: ${theme.colors.yellow};
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);

  .Toastify {
    &__toast-body {
      ${bodySmallM}
    }
  }
`;
