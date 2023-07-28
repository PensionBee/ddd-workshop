import * as RadixTooltip from "@radix-ui/react-tooltip";
import { theme } from "@shared/styling/theme";
import styled from "styled-components";

export const StyledTooltipContent = styled(RadixTooltip.Content)`
  background: ${() => theme.colors.black};
  border-radius: 4px;
  padding: 20px;
`;

export const StyledTooltipArrow = styled(RadixTooltip.Arrow)`
  fill: ${() => theme.colors.black};
`;
