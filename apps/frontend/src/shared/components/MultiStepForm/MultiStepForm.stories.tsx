import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ExampleMultiStepForm } from "./example/ExampleMultiStepForm";

export default {
  title: "Shared/Multi Step Form",
  component: ExampleMultiStepForm,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof ExampleMultiStepForm>;

const MultiStepFormTemplate: ComponentStory<
  typeof ExampleMultiStepForm
> = () => {
  return <ExampleMultiStepForm />;
};

export const Example = MultiStepFormTemplate.bind({});
