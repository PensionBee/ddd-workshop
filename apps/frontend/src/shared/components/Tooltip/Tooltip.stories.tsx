import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { TooltipProps } from "./Tooltip";
import { Tooltip } from "./Tooltip";
import { Box } from "../Box/Box";
import { SmallSystemIcon } from "../Svg/Svg";
import { CaptionL } from "../Typography/Typography";

export default {
  title: "Shared/Tooltip",
  component: Tooltip,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Tooltip>;

const TooltipTemplate: ComponentStory<typeof Tooltip> = (
  args: TooltipProps
) => {
  return (
    <Box p={50} align="center">
      <CaptionL>Hover over the icon to display tooltip</CaptionL>
      <Tooltip {...args}>
        <SmallSystemIcon icon="Honeypot" />
      </Tooltip>
    </Box>
  );
};

export const Default = TooltipTemplate.bind({});

Default.args = {
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam",
  side: "right",
};
