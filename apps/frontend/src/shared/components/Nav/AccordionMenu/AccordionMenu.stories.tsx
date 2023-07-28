import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { LIST_WITH_MIXED_ITEMS } from "../Nav.content";
import type { AccordionMenuProps } from "./AccordionMenu";
import { AccordionMenu } from "./AccordionMenu";

export default {
  title: "Shared/Menus/Accordion Menu",
  component: AccordionMenu,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof AccordionMenu>;

const AccordionMenuTemplate: ComponentStory<typeof AccordionMenu> = (
  args: AccordionMenuProps
) => {
  return (
    <GridContainer>
      <GridRow>
        <GridItem>
          <AccordionMenu {...args} />
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export const Default = AccordionMenuTemplate.bind({});
Default.args = {
  list: LIST_WITH_MIXED_ITEMS,
};
