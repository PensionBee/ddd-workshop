import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { BoxProps } from "./Box";
import { Box } from "./Box";

export default {
  title: "Shared/Box",
  component: Box,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Box>;

const BoxTemplate: ComponentStory<typeof Box> = (args: BoxProps) => {
  return (
    <Box {...args}>This is a Box - You can style me however you need to</Box>
  );
};

export const Default = BoxTemplate.bind({});
