import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { LIST_WITH_MIXED_ITEMS } from "../Nav.content";
import type { DropdownMenuProps } from "./DropdownMenu";
import { DropdownMenu } from "./DropdownMenu";
import { MemoryRouter } from "react-router-dom";
import { StyledMenu, StyledList } from "../MainNav/MainNav.styled";
import {
  StyledItem,
  StyledTrigger,
  StyledCaret,
  StyledContent,
} from "../MainNav/MainNavItem/MainNavItem.styled";
import { Box } from "@shared/components/Box";
import { GridContainer } from "@shared/components/Grid";

export default {
  title: "Shared/Menus/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof DropdownMenu>;

const DropdownMenuTemplate: ComponentStory<typeof DropdownMenu> = (
  args: DropdownMenuProps
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
              <StyledMenu>
                <StyledList $colGapLarge={40}>
                  <StyledItem>
                    <StyledTrigger>
                      Open Dropdown Nav
                      <StyledCaret icon="ChevronYellow" />
                    </StyledTrigger>
                    <StyledContent>
                      <DropdownMenu {...args} />
                    </StyledContent>
                  </StyledItem>
                </StyledList>
              </StyledMenu>
            </Box>
          </Box>
        </Box>
      </GridContainer>
    </MemoryRouter>
  );
};

export const Default = DropdownMenuTemplate.bind({});
Default.args = {
  subList: LIST_WITH_MIXED_ITEMS,
};
