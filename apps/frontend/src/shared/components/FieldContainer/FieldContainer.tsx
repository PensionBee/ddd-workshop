import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
import type { LabelProps } from "./Label/Label";
import { Label } from "./Label/Label";
import type { HintTextProps } from "./HintText/HintText";
import { HintText } from "./HintText/HintText";
import { Box } from "@shared/components/Box";
import { StyledFieldContainer } from "./FieldContainer.styled";

type BaseFieldContainerProps = {
  /** The field(s) to wrap */
  children: React.ReactNode;
  /** The error message to display for the input */
  error?: string;
};

export type FieldContainerProps = BaseFieldContainerProps &
  LabelProps &
  HintTextProps;

export const FieldContainer: React.FC<FieldContainerProps> = ({
  children,
  error,
  label,
  labelHref,
  labelLinkText,
  labelTooltip,
  labelHtmlFor,
  hintText,
  ...props
}) => {
  const labelProps = {
    label,
    labelHref,
    labelLinkText,
    labelTooltip,
    labelHtmlFor,
  } satisfies LabelProps;

  const hintTextProps = {
    hintText,
  } satisfies HintTextProps;

  return (
    <StyledFieldContainer {...props}>
      <Label {...labelProps} />
      <Box d="flex" w="100%" rowGap={16} colGap={16} justify="stretch">
        {children}
      </Box>
      <ErrorMessage>{error}</ErrorMessage>
      <HintText {...hintTextProps} />
    </StyledFieldContainer>
  );
};
