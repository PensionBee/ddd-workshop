import * as RadixAccordion from "@radix-ui/react-accordion";
import { theme } from "@shared/styling/theme";
import * as typography from "@shared/styling/typography";
import styled from "styled-components";

export const StyledAccordion = styled(RadixAccordion.Root)`
  background: ${theme.colors.white};
  padding: 8px;
  @keyframes accordion__opening {
    0% {
      padding-top: 0;
      height: 0;
    }
    100% {
      padding-top: 20px;
      height: var(--radix-accordion-content-height);
    }
  }
  @keyframes accordion__closing {
    0% {
      padding-top: 20px;
      height: var(--radix-accordion-content-height);
    }
    100% {
      padding-top: 0;
      height: 0;
    }
  }
`;

export const StyledItem = styled(RadixAccordion.Item)`
  margin: 0 0 28px 0;
`;

export const StyledTrigger = styled(RadixAccordion.Trigger)`
  width: 100%;
  cursor: pointer;
  border: 0px;
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: 3px solid ${theme.colors.blue100};
  }
  &:focus-visible [data-state="open"] {
    outline: 3px solid ${theme.colors.blue100};
  }
`;

export const StyledContent = styled(RadixAccordion.Content)`
  padding-left: 40px;
  padding-top: 20px;
  overflow: hidden;
  ${() => typography.bodySmallL}
  ${`color: ${theme.colors.black};`}
  &[data-state="open"] {
    animation: accordion__opening 500ms;
  }
  &[data-state="closed"] {
    animation: accordion__closing 500ms;
  }
  // Provide enough space for focus outlines
  padding-right: 4px;
  padding-bottom: 4px;
  margin-right: -4px;
  margin-bottom: -4px;
`;

export const StyledHeading = styled.div`
  transition: color 500ms ease;
  ${() => typography.bodySmallB}
  ${`color: ${theme.colors.black};`}
  [data-state="open"] & {
    ${`color: ${theme.colors.grey1};`}
  }
  &:hover {
    ${`color: ${theme.colors.grey1};`}
  }
`;
