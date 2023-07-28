import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { AvatarProps } from "./Avatar";
import { Avatar } from "./Avatar";

export default {
  title: "Shared/Avatar",
  component: Avatar,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Avatar>;

const AvatarTemplate: ComponentStory<typeof Avatar> = (args: AvatarProps) => {
  return <Avatar {...args} />;
};

export const Default = AvatarTemplate.bind({});
Default.args = {
  src: "https://res.cloudinary.com/pensionbee/image/upload/w_200,h_200/v1611330623/Jasper_new_headshot_hrywvw.png",
  size: 100,
};

export const Highlighted = AvatarTemplate.bind({});
Highlighted.args = {
  src: "https://res.cloudinary.com/pensionbee/image/upload/w_200,h_200/v1611330623/Jasper_new_headshot_hrywvw.png",
  isHighlighted: true,
  size: 100,
};
