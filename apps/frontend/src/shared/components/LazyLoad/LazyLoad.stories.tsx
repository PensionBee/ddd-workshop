import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { LazyLoadProps } from "./LazyLoad";
import { LazyLoad } from "./LazyLoad";

export default {
  title: "Shared/Lazy Load",
  component: LazyLoad,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof LazyLoad>;

const LazyLoadTemplate: ComponentStory<typeof LazyLoad> = (
  args: LazyLoadProps
) => {
  return <LazyLoad {...args} />;
};

export const Default = LazyLoadTemplate.bind({});
Default.args = {
  children: "Loaded",
  placeholder: "Loading ...",
};
