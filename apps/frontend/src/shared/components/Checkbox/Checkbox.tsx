/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { StyledCheckboxButtonProps } from "./Checkbox.styled";
import {
  StyledCheckboxButton,
  StyledCheckmark,
  StyledIcon,
} from "./Checkbox.styled";
import { Box } from "../Box/Box";

export type CheckboxProps = {
  /** Form control */
  control: Control<any, any>;
  /** If switch is disabled */
  disabled?: boolean;
  /** Message if error */
  error?: string;
  /** Field name */
  name: string;
  /** Input value */
  value?: React.HTMLProps<HTMLInputElement>["value"];
  /** Button variant */
  variant?: StyledCheckboxButtonProps["$variant"];
};

export const Checkbox: React.FC<CheckboxProps> = ({
  variant = "square",
  error,
  name,
  disabled,
  control,
  ...props
}) => {
  return (
    <Box d="flex" data-rc="Checkbox">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <StyledCheckboxButton
            key={name}
            $error={error}
            $variant={variant}
            disabled={disabled}
            aria-disabled={disabled}
            {...field}
            value={undefined}
            checked={field.value}
            onCheckedChange={field.onChange}
          >
            <StyledIcon>
              <StyledCheckmark $variant={variant} />
            </StyledIcon>
          </StyledCheckboxButton>
        )}
        {...props}
      />
    </Box>
  );
};
