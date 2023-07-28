import { RadioGroup } from "./RadioGroup";
import type { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { Box } from "../Box/Box";

export default {
  title: "Shared/Radio Group",
  component: RadioGroup,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof RadioGroup>;

export const Default = () => {
  const { control } = useForm();

  return (
    <Box d="flex">
      <RadioGroup
        label="radio"
        name="radio"
        control={control}
        options={[
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
        ]}
      />
    </Box>
  );
};

export const Error = () => {
  const { control } = useForm();

  return (
    <Box d="flex">
      <RadioGroup
        label="radio"
        name="radio"
        error={"An error message"}
        control={control}
        options={[
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
        ]}
      />
    </Box>
  );
};

export const DefaultActive = () => {
  const { control } = useForm({ defaultValues: { radio: "yes" } });

  return (
    <Box d="flex">
      <RadioGroup
        label="radio"
        name="radio"
        control={control}
        options={[
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
        ]}
      />
    </Box>
  );
};

export const ErrorActive = () => {
  const { control } = useForm({ defaultValues: { radio: "yes" } });

  return (
    <Box d="flex">
      <RadioGroup
        label="radio"
        name="radio"
        error={"An error message"}
        control={control}
        options={[
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
        ]}
      />
    </Box>
  );
};
