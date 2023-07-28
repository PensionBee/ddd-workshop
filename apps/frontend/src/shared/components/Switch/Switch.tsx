/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Box } from "../Box/Box";
import { StyledToggleButton } from "./Switch.styled";

export type SwitchProps = {
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
};

export const Switch: React.FC<SwitchProps> = ({
  error,
  name,
  disabled,
  control,
  ...props
}) => {
  return (
    <Box d="flex" data-rc="Switch">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <StyledToggleButton
            key={name}
            $error={error}
            disabled={disabled}
            aria-disabled={disabled}
            {...field}
            value={undefined}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
        {...props}
      />
    </Box>
  );
};
