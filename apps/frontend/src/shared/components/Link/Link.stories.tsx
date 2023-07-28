import type { ComponentMeta } from "@storybook/react";
import { Link } from "./Link";
import { BodySmallL } from "../Typography/Typography";

export default {
  title: "Shared/Link",
  component: Link,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Link>;

export const DefaultLink = () => (
  <BodySmallL>
    <Link href="https://google.com" target="_blank">
      A link that can be clicked on.
    </Link>
  </BodySmallL>
);

export const NestedLink = () => (
  <BodySmallL>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
    <Link href="https://google.com" target="_blank">
      A nested link should be underlined.
    </Link>{" "}
    Necessitatibus maxime architecto mollitia maiores! Aliquam, sint facere!
  </BodySmallL>
);
