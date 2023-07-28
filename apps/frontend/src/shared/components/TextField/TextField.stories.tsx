import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";

export default {
  title: "Shared/Text Field",
  component: TextField,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof TextField>;

const TextFieldTemplate: ComponentStory<typeof TextField> = (
  args: TextFieldProps
) => {
  return <TextField {...args} />;
};

export const Default = TextFieldTemplate.bind({});
Default.args = {
  name: "input",
  label: "Default Text Field",
};

export const Tooltip = TextFieldTemplate.bind({});
Tooltip.args = {
  name: "input",
  label: "With Tooltip",
  labelTooltip: "Some tooltip text",
};

export const Link = TextFieldTemplate.bind({});
Link.args = {
  name: "input",
  label: "With Link",
  labelLinkText: "Link text",
  labelHref: "https://www.google.com",
};

export const PrefixText = TextFieldTemplate.bind({});
PrefixText.args = {
  name: "input",
  label: "With Prefix Text",
  prefixText: "£",
};

export const PrefixIcon = TextFieldTemplate.bind({});
PrefixIcon.args = {
  name: "input",
  label: "With Prefix Icon (Default)",
  prefixIcon: "Actions",
};

export const PrefixIconFill = TextFieldTemplate.bind({});
PrefixIconFill.args = {
  name: "input",
  label: "With Prefix Icon (Grey1)",
  prefixIcon: "Actions",
  prefixIconFill: "grey1",
};

export const SuffixText = TextFieldTemplate.bind({});
SuffixText.args = {
  name: "input",
  label: "With Suffix",
  suffixText: "%",
};

export const SuffixIcon = TextFieldTemplate.bind({});
SuffixIcon.args = {
  name: "input",
  label: "With Suffix Icon (Default)",
  suffixIcon: "Actions",
};

export const SuffixIconFill = TextFieldTemplate.bind({});
SuffixIconFill.args = {
  name: "input",
  label: "With Suffix Icon (Filled Grey1)",
  suffixIcon: "Actions",
  suffixIconFill: "grey1",
};

export const BothIcons = TextFieldTemplate.bind({});
BothIcons.args = {
  name: "input",
  label: "With Both Prefix & Suffix Icons",
  prefixIcon: "Actions",
  suffixIcon: "AlertInfo",
};

export const BothText = TextFieldTemplate.bind({});
BothText.args = {
  name: "input",
  label: "With Both Prefix & Suffix Text",
  prefixText: "£",
  suffixText: "%",
};

export const Placeholder = TextFieldTemplate.bind({});
Placeholder.args = {
  name: "input",
  label: "With Placeholder",
  placeholder: "Placeholder text",
};

export const DefaultValue = TextFieldTemplate.bind({});
DefaultValue.args = {
  name: "input",
  label: "With Default Value",
  value: "Default value",
};

export const Error = TextFieldTemplate.bind({});
Error.args = {
  name: "input",
  label: "With Error",
  error: "Error message",
};

export const Disabled = TextFieldTemplate.bind({});
Disabled.args = {
  name: "input",
  label: "Disabled",
  disabled: true,
};

export const HintText = TextFieldTemplate.bind({});
HintText.args = {
  name: "input",
  label: "With Hint Text",
  hintText: "Hint text",
};
