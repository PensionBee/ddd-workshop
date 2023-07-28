import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { FixedTextFieldProps } from "./FixedTextField";
import { FixedTextField } from "./FixedTextField";

export default {
  title: "Shared/Fixed Text Field",
  component: FixedTextField,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof FixedTextField>;

const FixedTextFieldTemplate: ComponentStory<typeof FixedTextField> = (
  args: FixedTextFieldProps
) => {
  return <FixedTextField {...args} />;
};

export const Default = FixedTextFieldTemplate.bind({});
Default.args = {
  children: "Some value",
  label: "Field label",
};

export const WithTooltip = FixedTextFieldTemplate.bind({});
WithTooltip.args = {
  children: "Some value",
  label: "Field label",
  labelTooltip: "Tooltip text",
};
