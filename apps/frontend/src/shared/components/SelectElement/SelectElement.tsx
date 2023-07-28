import React from "react";
import { StyledSelectElement } from "./SelectElement.styled";

export type SelectElementProps = {
  /** The id attribute for the input element. */
  id?: React.HTMLProps<HTMLSelectElement>["id"];
  /** If true, the text input will be disabled */
  disabled?: React.HTMLProps<HTMLSelectElement>["disabled"];
  /** If true, the text input will be required */
  required?: React.HTMLProps<HTMLSelectElement>["required"];
  /** The name attribute for the input element. */
  name: React.HTMLProps<HTMLSelectElement>["name"];
  /** Callback: Fired when the input is blurred. */
  onBlur?: React.HTMLProps<HTMLSelectElement>["onBlur"];
  /** Callback: Fired when the input value is changed. The event is passed as an input. */
  onChange?: React.HTMLProps<HTMLSelectElement>["onChange"];
  /** The text displayed within the input when empty. Defaults to the value of the 'label' prop if not provided */
  placeholder?: React.HTMLProps<HTMLSelectElement>["placeholder"];
  /** The input type. */
  type?: "email" | "password" | "text";
  /** Input value */
  value?: React.HTMLProps<HTMLSelectElement>["value"];
  /** Options for the select element */
  options: string[];
};

export const SelectElement = React.forwardRef<
  HTMLSelectElement,
  SelectElementProps
>(({ options, ...props }, ref) => {
  return (
    <StyledSelectElement ref={ref} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelectElement>
  );
});

SelectElement.displayName = "SelectElement";
