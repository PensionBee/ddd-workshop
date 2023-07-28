import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { GridContainer } from "@shared/components/Grid";
import { LIST_WITH_MIXED_ITEMS } from "../Nav.content";
import { MainNav, type MainNavProps } from "./MainNav";
import { MemoryRouter } from "react-router-dom";
import { Box } from "@shared/components/Box";

export default {
  title: "Shared/Menus/Main Nav",
  component: MainNav,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof MainNav>;

const MainNavTemplate: ComponentStory<typeof MainNav> = (
  args: MainNavProps
) => {
  return (
    <MemoryRouter initialEntries={[{ pathname: "/example" }]}>
      <GridContainer>
        <Box
          d="flex"
          justify="space-between"
          align="center"
          py={{ xs: 5, lg: 15 }}
          w="100%"
        >
          <Box d="flex">
            <Box ml="auto" mr={{ xs: 20, md: 40 }}>
              <MainNav {...args} />
            </Box>
          </Box>
        </Box>
      </GridContainer>
    </MemoryRouter>
  );
};

export const Default = MainNavTemplate.bind({});
Default.args = {
  list: LIST_WITH_MIXED_ITEMS,
};
