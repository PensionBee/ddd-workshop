import { SignatureField } from "./SignatureField";
import type { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";

export default {
  title: "Shared/Signature Field",
  component: SignatureField,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof SignatureField>;

export const Default = () => {
  const { control } = useForm();

  return <SignatureField name="signature" control={control} />;
};

export const Error = () => {
  const { control } = useForm();

  return (
    <SignatureField
      name="signature"
      control={control}
      error={"An error message"}
    />
  );
};
