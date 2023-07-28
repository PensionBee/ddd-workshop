import { StyledChildWrapper, StyledFieldWrapper } from "./FieldWrapper.styled";
import { Prefix, type PrefixProps } from "./Prefix/Prefix";
import { Suffix, type SuffixProps } from "./Suffix/Suffix";

type BaseFieldWrapperProps = {
  /** The input to wrap */
  children?: React.ReactNode;
  /** The error message to display for the input */
  error?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input has a value */
  hasValue?: boolean;
  /** Whether the field has a focus state */
  hasFocusState?: boolean;
};

export type FieldWrapperProps = BaseFieldWrapperProps &
  PrefixProps &
  SuffixProps;

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  error,
  disabled,
  hasValue,
  hasFocusState = true,
  prefixIcon,
  prefixIconFill,
  prefixText,
  suffixIcon,
  suffixIconFill,
  suffixText,
  ...props
}) => {
  const prefixProps = {
    prefixIcon,
    prefixIconFill,
    prefixText,
  } satisfies PrefixProps;

  const suffixProps = {
    suffixIcon,
    suffixIconFill,
    suffixText,
  } satisfies SuffixProps;

  return (
    <StyledFieldWrapper
      $isError={Boolean(error)}
      $isDisabled={Boolean(disabled)}
      $hasValue={Boolean(hasValue)}
      $hasFocusState={hasFocusState}
      {...props}
    >
      <Prefix {...prefixProps} />
      <StyledChildWrapper flex="1" d="flex" nowrap>
        {children}
      </StyledChildWrapper>
      <Suffix {...suffixProps} />
    </StyledFieldWrapper>
  );
};
