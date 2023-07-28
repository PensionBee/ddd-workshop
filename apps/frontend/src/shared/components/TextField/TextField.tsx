import React, { useId } from "react";
import {
  FieldContainer,
  type FieldContainerProps,
} from "../FieldContainer/FieldContainer";
import {
  InputElement,
  type InputElementProps,
} from "../InputElement/InputElement";
import {
  FieldWrapper,
  type FieldWrapperProps,
} from "../FieldWrapper/FieldWrapper";

export type TextFieldProps = InputElementProps &
  Omit<FieldContainerProps, "children" | "hasValue"> &
  Omit<FieldWrapperProps, "children" | "hasValue">;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      disabled,
      required,
      name,
      onBlur,
      onChange,
      placeholder,
      type,
      value,
      prefixIcon,
      prefixIconFill,
      prefixText,
      suffixIcon,
      suffixIconFill,
      suffixText,
      ...props
    },
    ref
  ) => {
    const inputProps = {
      disabled,
      required,
      name,
      onBlur,
      onChange,
      placeholder,
      type,
      value,
    };

    const id = useId();

    const fieldWrapperProps = {
      disabled,
      prefixIcon,
      prefixIconFill,
      prefixText,
      suffixIcon,
      suffixIconFill,
      suffixText,
    } satisfies FieldWrapperProps;

    return (
      <FieldContainer data-rc="TextField" labelHtmlFor={id} {...props}>
        <FieldWrapper hasValue={Boolean(value)} {...fieldWrapperProps}>
          <InputElement id={id} ref={ref} {...inputProps} />
        </FieldWrapper>
      </FieldContainer>
    );
  }
);

TextField.displayName = "TextField";

TextField.defaultProps = {
  type: "text",
};
