import { Box } from "@shared/components/Box";
import { Link } from "@shared/components/Link";
import { BodySmallL } from "@shared/components/Typography";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { AccordionProps } from "./Accordion";
import { Accordion } from "./Accordion";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et tincidunt faucibus neque scelerisque sagittis. Vitae nibh congue placerat enim tortor vitae dictum eu mi. Faucibus tincidunt rhoncus turpis eget.";

export default {
  title: "Shared/Accordion",
  component: Accordion,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Accordion>;

const AccordionTemplate: ComponentStory<typeof Accordion> = (
  args: AccordionProps
) => {
  return <Accordion {...args} />;
};

export const Default = AccordionTemplate.bind({});
Default.args = {
  items: [
    {
      id: "first-item",
      heading: "First Item",
      content: loremIpsum,
    },
    {
      id: "second-item",
      heading: "Second Item",
      content: loremIpsum,
    },
    {
      id: "third-item",
      heading: "Third Item",
      content: loremIpsum,
    },
  ],
};

export const InitiallyOpen = AccordionTemplate.bind({});
InitiallyOpen.args = {
  items: [
    {
      id: "first-item",
      heading: "First Item",
      content: loremIpsum,
    },
    {
      id: "second-item",
      heading: "Second Item",
      content: loremIpsum,
    },
    {
      id: "third-item",
      heading: "Third Item",
      content: loremIpsum,
    },
  ],
  isInitiallyOpen: true,
};

const LinkContent = () => (
  <Box d="flex" direction="column">
    <BodySmallL>
      {loremIpsum} <Link href="/">An inline link</Link>
    </BodySmallL>
    <Box mb={24} />
    <Link href="/">A longer full-width link.</Link>
  </Box>
);

export const WithLink = AccordionTemplate.bind({});
WithLink.args = {
  items: [
    {
      id: "first-item",
      heading: "First Item",
      content: <LinkContent />,
    },
    {
      id: "second-item",
      heading: "Second Item",
      content: <LinkContent />,
    },
    {
      id: "third-item",
      heading: "Third Item",
      content: <LinkContent />,
    },
  ],
};
