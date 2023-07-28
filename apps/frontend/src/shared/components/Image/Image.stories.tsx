import { Box } from "../Box/Box";
import type { ComponentMeta } from "@storybook/react";
import { Image } from "./Image";

export default {
  title: "Shared/Image",
  component: Image,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Image>;

export const Default = () => {
  return (
    <Box>
      <Image
        w={200}
        h={300}
        src="https://picsum.photos/200/300"
        lazyPlaceholder="https://picsum.photos/20/30"
        alt="(Optional) Something that's actually useful for users, otherwise leave me blank"
      />
    </Box>
  );
};
