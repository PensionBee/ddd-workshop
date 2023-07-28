import { ThemeProvider } from "styled-components";
import type { ComponentMeta } from "@storybook/react";
import { GlobalStyles } from "@shared/styling/globalStyles";
import { theme } from "@shared/styling/theme";
import { Box } from "../../Box/Box";
import { GridContainer } from "../GridContainer/GridContainer";
import { GridItem } from "../GridItem/GridItem";
import { GridRow } from "./GridRow";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const themeDecorator = (Story: any) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box position="relative">
        <GridContainer backgroundColor="grey8">
          <Box
            d="flex"
            direction="column"
            backgroundColor="grey6"
            pt={20}
            pb={20}
            rowGap={20}
          >
            <Story />
          </Box>
        </GridContainer>
      </Box>
    </ThemeProvider>
  );
};

export default {
  title: "Shared/Grid/Row",
  component: GridRow,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
  decorators: [themeDecorator],
} as ComponentMeta<typeof GridRow>;

const Child = () => <Box backgroundColor="grey4" w="100%" h={200} />;

export const OneRow = () => (
  <GridRow>
    <Child />
  </GridRow>
);

export const TwoRows = () => {
  const items = [0, 1];
  return (
    <>
      {items.map((item) => (
        <GridRow key={item}>
          <Child />
        </GridRow>
      ))}
    </>
  );
};

export const RowAlignStart = () => (
  <GridRow>
    <GridItem span={6}>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem.
      </Box>
    </GridItem>
    <GridItem span={6}>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem, maiores, consectetur sed provident ratione laborum
        autem nihil enim aliquid, ipsum saepe excepturi vero. Veniam perferendis
        tempora repellat? Molestiae quaerat autem illum enim consequuntur
        repellat alias quam iure, aspernatur eum?
      </Box>
    </GridItem>
  </GridRow>
);

export const RowAlignCenter = () => (
  <GridRow align="center">
    <GridItem span={6}>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem.
      </Box>
    </GridItem>
    <GridItem span={6}>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem, maiores, consectetur sed provident ratione laborum
        autem nihil enim aliquid, ipsum saepe excepturi vero. Veniam perferendis
        tempora repellat? Molestiae quaerat autem illum enim consequuntur
        repellat alias quam iure, aspernatur eum?
      </Box>
    </GridItem>
  </GridRow>
);

export const RowAlignEnd = () => (
  <GridRow align="end">
    <GridItem span={6}>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem.
      </Box>
    </GridItem>
    <GridItem span={6}>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem, maiores, consectetur sed provident ratione laborum
        autem nihil enim aliquid, ipsum saepe excepturi vero. Veniam perferendis
        tempora repellat? Molestiae quaerat autem illum enim consequuntur
        repellat alias quam iure, aspernatur eum?
      </Box>
    </GridItem>
  </GridRow>
);

export const RowGap = () => (
  <GridRow rowGap={{ xs: 20, md: 28, lg: 36 }}>
    <GridItem>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem, maiores, consectetur sed provident ratione laborum
        autem nihil enim aliquid, ipsum saepe excepturi vero. Veniam perferendis
        tempora repellat? Molestiae quaerat autem illum enim consequuntur
        repellat alias quam iure, aspernatur eum?
      </Box>
    </GridItem>
    <GridItem>
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet quibusdam
        cupiditate dolorem, maiores, consectetur sed provident ratione laborum
        autem nihil enim aliquid, ipsum saepe excepturi vero. Veniam perferendis
        tempora repellat? Molestiae quaerat autem illum enim consequuntur
        repellat alias quam iure, aspernatur eum?
      </Box>
    </GridItem>
  </GridRow>
);

export const RowCentered = () => (
  <GridRow>
    <GridItem align="center">
      <Box backgroundColor="grey4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </Box>
    </GridItem>
  </GridRow>
);
