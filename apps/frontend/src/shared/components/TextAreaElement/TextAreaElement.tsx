import { useAutoResizeTextArea } from "@shared/hooks/useAutoResizeTextArea/useAutoResizeTextArea";
import { useForwardRef } from "@shared/hooks/useForwardRef/useForwardRef";
import React, { useState } from "react";
import { StyledTextAreaElement } from "./TextAreaElement.styled";

export type TextAreaElementProps = {
  /** The id attribute for the input element. */
  id?: React.HTMLProps<HTMLTextAreaElement>["id"];
  /** If true, the text input will be disabled */
  disabled?: React.HTMLProps<HTMLTextAreaElement>["disabled"];
  /** If true, the text input will be required */
  required?: React.HTMLProps<HTMLTextAreaElement>["required"];
  /** The name attribute for the input element. */
  name: React.HTMLProps<HTMLTextAreaElement>["name"];
  /** Callback: Fired when the input is blurred. */
  onBlur?: React.HTMLProps<HTMLTextAreaElement>["onBlur"];
  /** Callback: Fired when the input value is changed. The event is passed as an input. */
  onChange?: React.HTMLProps<HTMLTextAreaElement>["onChange"];
  /** The text displayed within the input when empty. Defaults to the value of the 'label' prop if not provided */
  placeholder?: React.HTMLProps<HTMLTextAreaElement>["placeholder"];
  /** The input type. */
  type?: "email" | "password" | "text" | "tel" | "number";
  /** Input value */
  value?: string;
};

export const TextAreaElement = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaElementProps
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
      value,
      ...props
    },
    ref
  ) => {
    const textAreaRef = useForwardRef(ref);
    const [currentValue, setCurrentValue] = useState(value);
    useAutoResizeTextArea(textAreaRef.current, currentValue);

    const onTextAreaChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setCurrentValue(event.target.value);
      return onChange?.(event);
    };

    return (
      <StyledTextAreaElement
        id={id}
        disabled={disabled}
        required={required}
        name={name}
        onBlur={onBlur}
        onChange={onTextAreaChange}
        placeholder={placeholder}
        value={value}
        ref={textAreaRef}
        {...props}
      />
    );
  }
);

TextAreaElement.displayName = "TextAreaElement";
