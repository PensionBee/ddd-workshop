import React, { useId } from "react";
import {
  FieldContainer,
  type FieldContainerProps,
} from "../FieldContainer/FieldContainer";
import {
  FieldWrapper,
  type FieldWrapperProps,
} from "../FieldWrapper/FieldWrapper";
import {
  SelectElement,
  type SelectElementProps,
} from "../SelectElement/SelectElement";

export type SelectFieldProps = SelectElementProps &
  Omit<FieldContainerProps, "children" | "hasValue"> &
  Omit<
    FieldWrapperProps,
    "children" | "hasValue" | "suffixIcon" | "suffixText" | "suffixIconFill"
  >;

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(
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
      options,
      prefixIcon,
      prefixIconFill,
      prefixText,
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
      options,
    };

    const id = useId();

    const fieldWrapperProps = {
      disabled,
      prefixIcon,
      prefixIconFill,
      prefixText,
    } satisfies FieldWrapperProps;

    return (
      <FieldContainer data-rc="SelectField" labelHtmlFor={id} {...props}>
        <FieldWrapper hasValue={Boolean(value)} {...fieldWrapperProps}>
          <SelectElement id={id} ref={ref} {...inputProps} />
        </FieldWrapper>
      </FieldContainer>
    );
  }
);

SelectField.displayName = "SelectField";

SelectField.defaultProps = {
  type: "text",
};
