import { Box } from "@shared/components/Box";
import { BodySmallB, BodySmallL } from "@shared/components/Typography";
import {
  LabelTooltip,
  type LabelTooltipProps,
} from "../FieldContainer/Label/LabelTooltip";

export type FixedTextFieldProps = {
  children: React.ReactNode;
  label: string;
  labelTooltip?: LabelTooltipProps["labelTooltip"];
};

export const FixedTextField: React.FC<FixedTextFieldProps> = ({
  label,
  labelTooltip,
  children,
  ...props
}) => {
  return (
    <Box
      data-rc="FixedTextField"
      borderBottom={1}
      borderColor="grey4"
      d="flex"
      justify="space-between"
      align="center"
      pb={10}
      mb={36}
      {...props}
    >
      <BodySmallB>{label}</BodySmallB>
      <Box ml={10} mr="auto">
        <BodySmallL>{children}</BodySmallL>
      </Box>
      {labelTooltip && <LabelTooltip labelTooltip={labelTooltip} />}
    </Box>
  );
};
