/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  StyledCheckboxButton,
  StyledCheckmark,
  StyledIcon,
  StyledRadioGroup,
  StyledRadioLabel,
} from "./RadioGroup.styled";

type RadioGroupOption = {
  value: string;
  label: string;
};

export type RadioGroupProps = {
  name: string;
  label: string;
  options: RadioGroupOption[];
  control: Control<any, any>;
  error?: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  control,
  error,
  label,
  ...props
}) => {
  return (
    <Controller
      data-rc="RadioGroup"
      control={control}
      name={name}
      render={({ field }) => (
        <StyledRadioGroup
          defaultValue={field.value}
          aria-label={label}
          onValueChange={field.onChange}
        >
          {options.map(({ value, label }) => {
            const key = `radio-${label}-${value}`;
            return (
              <StyledRadioLabel key={key} {...field} value={value}>
                <StyledCheckboxButton $variant="circle" $error={error}>
                  <StyledIcon>
                    <StyledCheckmark $variant="circle" />
                  </StyledIcon>
                </StyledCheckboxButton>
                <span>{label}</span>
              </StyledRadioLabel>
            );
          })}
        </StyledRadioGroup>
      )}
      {...props}
    />
  );
};
