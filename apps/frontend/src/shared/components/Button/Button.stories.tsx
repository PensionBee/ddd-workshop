import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";

export default {
  title: "Shared/Button",
  component: Button,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Button>;

const ButtonTemplate: ComponentStory<typeof Button> = (args: ButtonProps) => {
  return <Button {...args} />;
};

export const PrimaryYellowVariant = ButtonTemplate.bind({});
PrimaryYellowVariant.args = {
  children: "Primary yellow button",
};

export const PrimaryBlackVariant = ButtonTemplate.bind({});
PrimaryBlackVariant.args = {
  children: "Primary black button",
  variant: "primary-black",
};

export const SecondaryVariant = ButtonTemplate.bind({});
SecondaryVariant.args = {
  children: "Secondary button",
  variant: "secondary",
};

export const TertiaryVariant = ButtonTemplate.bind({});
TertiaryVariant.args = {
  children: "Tertiary button",
  variant: "tertiary",
};

export const Disabled = ButtonTemplate.bind({});
Disabled.args = {
  children: "Disabled button",
  disabled: true,
};

export const WithRightIcon = ButtonTemplate.bind({});
WithRightIcon.args = {
  children: "With right icon",
  icon: "Actions",
};

export const WithLeftIcon = ButtonTemplate.bind({});
WithLeftIcon.args = {
  children: "With left icon",
  icon: "Actions",
  iconPosition: "left",
};

export const ButtonAsLink = ButtonTemplate.bind({});
ButtonAsLink.args = {
  children: "Button as link",
  href: "https://google.com",
  target: "_blank",
};
