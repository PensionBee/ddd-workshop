import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Box } from "../../Box/Box";
import type { GridContainerProps } from "./GridContainer";
import { GridContainer } from "./GridContainer";

export default {
  title: "Shared/Grid/Container",
  component: GridContainer,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof GridContainer>;

const GridContainerTemplate: ComponentStory<typeof GridContainer> = (
  args: GridContainerProps
) => {
  return (
    <Box position="relative">
      <GridContainer {...args}>
        <Box backgroundColor="grey4" w="100%" h={200} />
      </GridContainer>
    </Box>
  );
};

export const GridContainerDefault = GridContainerTemplate.bind({});
GridContainerDefault.args = {
  backgroundColor: "grey8",
};
