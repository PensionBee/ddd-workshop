import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { LIST_WITH_MIXED_ITEMS } from "../Nav.content";
import { MemoryRouter } from "react-router-dom";
import { Box } from "@shared/components/Box";
import type { MobileMenuProps } from "./MobileMenu";
import { MobileMenu } from "./MobileMenu";

export default {
  title: "Shared/Menus/Mobile Menu",
  component: MobileMenu,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof MobileMenu>;

const MobileMenuTemplate: ComponentStory<typeof MobileMenu> = (
  args: MobileMenuProps
) => {
  return (
    <MemoryRouter initialEntries={[{ pathname: "/example" }]}>
      <Box d="flex" direction="column" w={320}>
        <MobileMenu {...args} />
      </Box>
    </MemoryRouter>
  );
};

export const Default = MobileMenuTemplate.bind({});
Default.args = {
  subList: LIST_WITH_MIXED_ITEMS,
};
