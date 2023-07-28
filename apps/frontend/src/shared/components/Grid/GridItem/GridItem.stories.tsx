import React from "react";
import { ThemeProvider } from "styled-components";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useMediaQueryMd } from "@shared/hooks/useMediaQuery/useMediaQuery";
import { GlobalStyles } from "@shared/styling/globalStyles";
import { theme } from "@shared/styling/theme";
import { Box } from "../../Box/Box";
import { GridContainer } from "../GridContainer/GridContainer";
import { GridRow } from "../GridRow/GridRow";
import type { GridItemProps } from "./GridItem";
import { GridItem } from "./GridItem";
import { CaptionL } from "../../Typography/Typography";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const themeDecorator = (Story: any) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box>
        <Story />
      </Box>
    </ThemeProvider>
  );
};

export default {
  title: "Shared/Grid/Item",
  component: GridItem,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
  decorators: [themeDecorator],
} as ComponentMeta<typeof GridItem>;

const GridItemTemplate: ComponentStory<typeof GridItem> = ({
  children,
  ...args
}: GridItemProps) => {
  return <GridItem {...args}>{children}</GridItem>;
};

const Child = ({ h }: { h?: string }) => (
  <Box backgroundColor="grey4" w="100%" h={h || 200} />
);

const GridItemDefault = GridItemTemplate.bind({});
GridItemDefault.args = {
  children: <Child />,
};

export const OneItem = () => {
  return (
    <GridContainer backgroundColor="grey8">
      <GridRow rowGap={20}>
        <GridItem>
          <Child />
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export const TwoItems = () => {
  const items = [0, 1];
  return (
    <GridContainer backgroundColor="grey8">
      <GridRow rowGap={20}>
        {items.map((item) => (
          <GridItem key={item} span={6}>
            <Child />
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const ThreeItems = () => {
  const items = [0, 1, 2];
  return (
    <GridContainer backgroundColor="grey8">
      <GridRow rowGap={20}>
        {items.map((item) => (
          <GridItem key={item} span={4}>
            <Child />
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const FourItems = () => {
  const items = [0, 1, 2, 3];
  return (
    <GridContainer backgroundColor="grey8">
      <GridRow rowGap={20}>
        {items.map((item) => (
          <GridItem key={item} span={3}>
            <Child />
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const TwelveItems = ({ h }: { h?: string }) => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <GridContainer backgroundColor="grey8">
      <GridRow rowGap={20}>
        {items.map((item) => (
          <GridItem key={item} span={{ xs: 3, md: 1 }}>
            <Child h={h} />
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

const ItemContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box w="100%" justify="center" d="flex" backgroundColor="grey4">
      <CaptionL>{children}</CaptionL>
    </Box>
  );
};

export const ItemSpan = () => {
  const isNotMobile = useMediaQueryMd();

  if (isNotMobile) {
    return (
      <GridContainer>
        <GridRow pb={20}>
          <GridItem span={1}>
            <ItemContent>1</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={2}>
            <ItemContent>2</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={3}>
            <ItemContent>3</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={4}>
            <ItemContent>4</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={5}>
            <ItemContent>5</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={6}>
            <ItemContent>6</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={7}>
            <ItemContent>7</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={8}>
            <ItemContent>8</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={9}>
            <ItemContent>9</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={10}>
            <ItemContent>10</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={11}>
            <ItemContent>11</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={12}>
            <ItemContent>12</ItemContent>
          </GridItem>
        </GridRow>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <GridRow pb={20}>
        <GridItem span={3}>
          <ItemContent>3</ItemContent>
        </GridItem>
      </GridRow>

      <GridRow pb={20}>
        <GridItem span={6}>
          <ItemContent>6</ItemContent>
        </GridItem>
      </GridRow>

      <GridRow pb={20}>
        <GridItem span={9}>
          <ItemContent>9</ItemContent>
        </GridItem>
      </GridRow>

      <GridRow pb={20}>
        <GridItem span={12}>
          <ItemContent>12</ItemContent>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export const ItemOffset = () => {
  const isNotMobile = useMediaQueryMd();

  if (isNotMobile) {
    return (
      <GridContainer>
        <GridRow pb={20}>
          <GridItem span={1} offset={0}>
            <ItemContent>0</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={1}>
            <ItemContent>1</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={2}>
            <ItemContent>2</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={3}>
            <ItemContent>3</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={4}>
            <ItemContent>4</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={5}>
            <ItemContent>5</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={6}>
            <ItemContent>6</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={7}>
            <ItemContent>7</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={8}>
            <ItemContent>8</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={9}>
            <ItemContent>9</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={10}>
            <ItemContent>10</ItemContent>
          </GridItem>
        </GridRow>

        <GridRow pb={20}>
          <GridItem span={1} offset={11}>
            <ItemContent>11</ItemContent>
          </GridItem>
        </GridRow>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <GridRow pb={20}>
        <GridItem span={3} offset={0}>
          <ItemContent>0</ItemContent>
        </GridItem>
      </GridRow>

      <GridRow pb={20}>
        <GridItem span={3} offset={3}>
          <ItemContent>3</ItemContent>
        </GridItem>
      </GridRow>

      <GridRow pb={20}>
        <GridItem span={3} offset={6}>
          <ItemContent>6</ItemContent>
        </GridItem>
      </GridRow>

      <GridRow pb={20}>
        <GridItem span={3} offset={9}>
          <ItemContent>9</ItemContent>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};
