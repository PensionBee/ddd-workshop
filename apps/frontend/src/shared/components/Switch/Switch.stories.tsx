import { Switch } from "./Switch";
import type { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

export default {
  title: "Shared/Switch",
  component: Switch,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Switch>;

export const Default = () => {
  const { control } = useForm();

  return <Switch name="Switch" control={control} />;
};

export const Disabled = () => {
  const { control } = useForm();

  return <Switch name="Switch" control={control} disabled />;
};

export const Error = () => {
  const { control } = useForm();

  return <Switch name="Switch" control={control} error={"An error message"} />;
};

export const DefaultActive = () => {
  const { control } = useForm({ defaultValues: { Switch: true } });

  return <Switch name="Switch" control={control} />;
};

export const DisabledActive = () => {
  const { control } = useForm({ defaultValues: { Switch: true } });

  return <Switch name="Switch" control={control} disabled />;
};

export const ErrorActive = () => {
  const { control } = useForm({ defaultValues: { Switch: true } });

  return <Switch name="Switch" control={control} error={"An error message"} />;
};
