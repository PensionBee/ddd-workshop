import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import type { Breakpoints } from "./styling/breakpoints";
import { BREAKPOINTS } from "./styling/breakpoints";
import { theme } from "./styling/theme";
import { vi } from "vitest"

type ReactTestingLibraryProviderProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
const ReactTestingLibraryProviders: React.FC<
  ReactTestingLibraryProviderProps
> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: React.ReactElement, options?: any) => {
  return render(ui, { wrapper: ReactTestingLibraryProviders, ...options });
};

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const mockMediaMatches = (breakpoint: Breakpoints) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => {
      const breakpointValue = BREAKPOINTS[breakpoint];
      const queryValue = parseInt(query.replace(/^\D+/g, ""));
      const breakpointValues = [...Object.values(BREAKPOINTS)];
      if (!breakpointValues.includes(queryValue)) {
        throw new Error(
          `Invalid breakpoint value: ${queryValue}, this likely means there has been a change to the way that breakpoints are setup.`
        );
      }
      return {
        matches: queryValue <= breakpointValue,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    },
  });
};

export const routerRender = (ui: React.ReactNode, pathname = "/") => {
  return customRender(
    <MemoryRouter initialEntries={[{ pathname }]}>{ui}</MemoryRouter>
  );
};
