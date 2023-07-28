import React, { useId } from "react";
import type { FieldContainerProps } from "../FieldContainer/FieldContainer";
import { FieldContainer } from "../FieldContainer/FieldContainer";
import type { FieldWrapperProps } from "../FieldWrapper/FieldWrapper";
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import type { PrefixProps } from "../FieldWrapper/Prefix/Prefix";
import type { SuffixProps } from "../FieldWrapper/Suffix/Suffix";
import type { TextAreaElementProps } from "../TextAreaElement/TextAreaElement";
import { TextAreaElement } from "../TextAreaElement/TextAreaElement";

export type TextAreaFieldProps = TextAreaElementProps &
  Omit<FieldContainerProps, "children" | "hasValue"> &
  Omit<
    FieldWrapperProps,
    "children" | "hasValue" | keyof PrefixProps | keyof SuffixProps
  >;

export const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
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
    } satisfies FieldWrapperProps;

    return (
      <FieldContainer labelHtmlFor={id} {...props}>
        <FieldWrapper hasValue={Boolean(value)} {...fieldWrapperProps}>
          <TextAreaElement id={id} ref={ref} {...inputProps} />
        </FieldWrapper>
      </FieldContainer>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

TextAreaField.defaultProps = {
  type: "text",
};
