import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { TextAreaFieldProps } from "./TextAreaField";
import { TextAreaField } from "./TextAreaField";

export default {
  title: "Shared/Text Area Field",
  component: TextAreaField,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof TextAreaField>;

const TextAreaFieldTemplate: ComponentStory<typeof TextAreaField> = (
  args: TextAreaFieldProps
) => {
  return <TextAreaField {...args} />;
};

export const Default = TextAreaFieldTemplate.bind({});
Default.args = {
  name: "input",
  label: "Default Text Area",
};

export const Tooltip = TextAreaFieldTemplate.bind({});
Tooltip.args = {
  name: "input",
  label: "With Tooltip",
  labelTooltip: "Some tooltip text",
};

export const Link = TextAreaFieldTemplate.bind({});
Link.args = {
  name: "input",
  label: "With Link",
  labelLinkText: "Link text",
  labelHref: "https://www.google.com",
};

export const Placeholder = TextAreaFieldTemplate.bind({});
Placeholder.args = {
  name: "input",
  label: "With Placeholder",
  placeholder: "Placeholder text",
};

export const DefaultValue = TextAreaFieldTemplate.bind({});
DefaultValue.args = {
  name: "input",
  label: "With Default Value",
  value: "Default value",
};

export const Error = TextAreaFieldTemplate.bind({});
Error.args = {
  name: "input",
  label: "With Error",
  error: "Error message",
};

export const Disabled = TextAreaFieldTemplate.bind({});
Disabled.args = {
  name: "input",
  label: "Disabled",
  disabled: true,
};

export const HintText = TextAreaFieldTemplate.bind({});
HintText.args = {
  name: "input",
  label: "With Hint Text",
  hintText: "Hint text",
};
