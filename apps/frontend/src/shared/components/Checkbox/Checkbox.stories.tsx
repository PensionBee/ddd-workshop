import { Checkbox } from "./Checkbox";
import type { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

export default {
  title: "Shared/Checkbox",
  component: Checkbox,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Checkbox>;

export const Default = () => {
  const { control } = useForm();

  return <Checkbox name="checkbox" control={control} />;
};

export const Round = () => {
  const { control } = useForm();

  return <Checkbox name="checkbox" control={control} variant="circle" />;
};

export const Disabled = () => {
  const { control } = useForm();

  return <Checkbox name="checkbox" control={control} disabled />;
};

export const Error = () => {
  const { control } = useForm();

  return (
    <Checkbox name="checkbox" control={control} error={"An error message"} />
  );
};

export const DefaultActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return <Checkbox name="checkbox" control={control} />;
};

export const RoundActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return <Checkbox name="checkbox" control={control} variant="circle" />;
};

export const DisabledActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return <Checkbox name="checkbox" control={control} disabled />;
};

export const ErrorActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return (
    <Checkbox name="checkbox" control={control} error={"An error message"} />
  );
};
