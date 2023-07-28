import { LargeSystemIcon } from "@shared/components/Svg";
import { Tooltip } from "@shared/components/Tooltip";

export type LabelTooltipProps = {
  labelTooltip: string;
};

export const LabelTooltip: React.FC<LabelTooltipProps> = ({
  labelTooltip,
  ...props
}) => (
  <Tooltip content={labelTooltip} {...props}>
    <LargeSystemIcon icon="Info" fill="grey2" w={24} h={24} />
  </Tooltip>
);
