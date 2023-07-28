import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { CardProps } from "./Card";
import { Card } from "./Card";

export default {
  title: "Shared/Card",
  component: Card,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Card>;

const CardTemplate: ComponentStory<typeof Card> = (args: CardProps) => {
  return <Card {...args} />;
};

export const Standard = CardTemplate.bind({});
Standard.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export const SpecificElevation = CardTemplate.bind({});
SpecificElevation.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  elevation: 12,
};

export const SpecificRadius = CardTemplate.bind({});
SpecificRadius.args = {
  children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  borderRadius: 20,
};

export const AsButton = CardTemplate.bind({});
AsButton.args = {
  as: "button",
  children:
    "I console log 'hello world'. seriously... Open up your console and click",
  onClick: () => {
    console.log("hello world");
  },
};

export const AsLink = CardTemplate.bind({});
AsLink.args = {
  as: "a",
  children:
    "I go to google.com - click me if you want to check your 'back' button is still working",
  href: "https://google.com",
};
