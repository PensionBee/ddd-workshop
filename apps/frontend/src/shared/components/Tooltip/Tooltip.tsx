import * as RadixTooltip from "@radix-ui/react-tooltip";
import { BodySmallM } from "@shared/components/Typography";
import { StyledTooltipArrow, StyledTooltipContent } from "./Tooltip.styled";

export type TooltipProps = {
  /** The element that triggers the tooltip when hovered over */
  children: React.ReactNode;
  /** The text to display in the body of the tooltip */
  content: string;
  /** The side that the tooltip is positioned relative to the trigger element */
  side?: "top" | "bottom" | "left" | "right";
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  ...props
}) => {
  return (
    <RadixTooltip.Provider {...props}>
      <RadixTooltip.Root delayDuration={300}>
        <RadixTooltip.Trigger type="button">{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <StyledTooltipContent side={side}>
            <BodySmallM color="white">{content}</BodySmallM>
            <StyledTooltipArrow width={20} height={10} />
          </StyledTooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
