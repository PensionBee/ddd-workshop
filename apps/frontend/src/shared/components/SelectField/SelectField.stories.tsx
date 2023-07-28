import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { SelectFieldProps } from "./SelectField";
import { SelectField } from "./SelectField";

export default {
  title: "Shared/Select Field",
  component: SelectField,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof SelectField>;

const SelectFieldTemplate: ComponentStory<typeof SelectField> = (
  args: SelectFieldProps
) => {
  return <SelectField {...args} />;
};

export const Default = SelectFieldTemplate.bind({});
Default.args = {
  name: "input",
  label: "Default Select Field",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Tooltip = SelectFieldTemplate.bind({});
Tooltip.args = {
  name: "input",
  label: "With Tooltip",
  labelTooltip: "Some tooltip text",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Link = SelectFieldTemplate.bind({});
Link.args = {
  name: "input",
  label: "With Link",
  labelLinkText: "Link text",
  labelHref: "https://www.google.com",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const PrefixText = SelectFieldTemplate.bind({});
PrefixText.args = {
  name: "input",
  label: "With Prefix Text",
  prefixText: "£",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const PrefixIcon = SelectFieldTemplate.bind({});
PrefixIcon.args = {
  name: "input",
  label: "With Prefix Icon",
  prefixIcon: "Actions",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const PrefixIconFill = SelectFieldTemplate.bind({});
PrefixIconFill.args = {
  name: "input",
  label: "With Prefix Icon (Filled Grey1)",
  prefixIcon: "Actions",
  prefixIconFill: "grey1",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Placeholder = SelectFieldTemplate.bind({});
Placeholder.args = {
  name: "input",
  label: "With Placeholder",
  placeholder: "Placeholder text",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const DefaultValue = SelectFieldTemplate.bind({});
DefaultValue.args = {
  name: "input",
  label: "With Default Value",
  value: "Default value",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Error = SelectFieldTemplate.bind({});
Error.args = {
  name: "input",
  label: "Error",
  error: "Error message",
  options: ["Option 1", "Option 2", "Option 3"],
};

export const Disabled = SelectFieldTemplate.bind({});
Disabled.args = {
  name: "input",
  label: "Disabled",
  disabled: true,
  options: ["Option 1", "Option 2", "Option 3"],
};

export const HintText = SelectFieldTemplate.bind({});
HintText.args = {
  name: "input",
  label: "With Hint Text",
  hintText: "Hint text",
  options: ["Option 1", "Option 2", "Option 3"],
};
