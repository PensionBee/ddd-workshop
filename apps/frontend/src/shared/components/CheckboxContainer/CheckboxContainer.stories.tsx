import type { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import { CheckboxContainer } from "./CheckboxContainer";
import { Box } from "../Box/Box";

export default {
  title: "Shared/Checkbox Container",
  component: CheckboxContainer,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof CheckboxContainer>;

export const Default = () => {
  const { control } = useForm();

  return (
    <Box d="flex">
      <CheckboxContainer name="checkbox" control={control}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const Round = () => {
  const { control } = useForm();

  return (
    <Box d="flex">
      <CheckboxContainer name="checkbox" control={control} variant="circle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const Disabled = () => {
  const { control } = useForm();

  return (
    <Box d="flex">
      <CheckboxContainer name="checkbox" control={control} disabled>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const Error = () => {
  const { control } = useForm();

  return (
    <Box d="flex">
      <CheckboxContainer
        name="checkbox"
        control={control}
        error={"An error message"}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const DefaultActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return (
    <Box d="flex">
      <CheckboxContainer name="checkbox" control={control}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const RoundActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return (
    <Box d="flex">
      <CheckboxContainer name="checkbox" control={control} variant="circle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const DisabledActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return (
    <Box d="flex">
      <CheckboxContainer name="checkbox" control={control} disabled>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};

export const ErrorActive = () => {
  const { control } = useForm({ defaultValues: { checkbox: true } });

  return (
    <Box d="flex">
      <CheckboxContainer
        name="checkbox"
        control={control}
        error={"An error message"}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo laboriosam
        assumenda minima facere. Recusandae illum consequatur laboriosam quia
        inventore similique id rerum pariatur incidunt possimus eius modi
        repudiandae, temporibus excepturi.
      </CheckboxContainer>
    </Box>
  );
};
