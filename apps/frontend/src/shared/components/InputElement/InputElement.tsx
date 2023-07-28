import React from "react";
import { StyledInputElement } from "./InputElement.styled";

export type InputElementProps = {
  /** The id attribute for the input element. */
  id?: React.HTMLProps<HTMLInputElement>["id"];
  /** If true, the text input will be disabled */
  disabled?: React.HTMLProps<HTMLInputElement>["disabled"];
  /** If true, the text input will be required */
  required?: React.HTMLProps<HTMLInputElement>["required"];
  /** The name attribute for the input element. */
  name: React.HTMLProps<HTMLInputElement>["name"];
  /** Callback: Fired when the input is blurred. */
  onBlur?: React.HTMLProps<HTMLInputElement>["onBlur"];
  /** Callback: Fired when the input value is changed. The event is passed as an input. */
  onChange?: React.HTMLProps<HTMLInputElement>["onChange"];
  /** The text displayed within the input when empty. Defaults to the value of the 'label' prop if not provided */
  placeholder?: React.HTMLProps<HTMLInputElement>["placeholder"];
  /** The input type. */
  type?: "email" | "password" | "text" | "tel" | "number";
  /** Input value */
  value?: React.HTMLProps<HTMLInputElement>["value"];
};

export const InputElement = React.forwardRef<
  HTMLInputElement,
  InputElementProps
>(
  (
    {
      id,
      disabled,
      required,
      name,
      onBlur,
      onChange,
      placeholder,
      type = "text",
      value,
      ...props
    },
    ref
  ) => {
    return (
      <StyledInputElement
        id={id}
        disabled={disabled}
        required={required}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        ref={ref}
        {...props}
      />
    );
  }
);

InputElement.displayName = "InputElement";
