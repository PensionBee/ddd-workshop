import { Box } from "../Box/Box";
import type { ComponentMeta } from "@storybook/react";
import { Video } from "./Video";
import { GridContainer } from "../Grid";
import { GridItem } from "../Grid/GridItem/GridItem";
import { GridRow } from "../Grid/GridRow/GridRow";

export default {
  title: "Shared/Video",
  component: Video,
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
} as ComponentMeta<typeof Video>;

export const Default = () => {
  return (
    <GridContainer>
      <Video
        src="https://res.cloudinary.com/pensionbee/video/upload/q_auto/v1646048083/Pensions%20Academy/pension-academy-videos/Pension_Academy_Ep_1_CC.mp4"
        thumbnail="https://res.cloudinary.com/pensionbee/image/upload/v1644591246/Pensions%20Academy/thumbnail_1.jpg"
      />
    </GridContainer>
  );
};

export const Modal = () => {
  return (
    <GridContainer>
      <Video
        src="https://res.cloudinary.com/pensionbee/video/upload/q_auto/v1646048083/Pensions%20Academy/pension-academy-videos/Pension_Academy_Ep_1_CC.mp4"
        thumbnail="https://res.cloudinary.com/pensionbee/image/upload/v1644591246/Pensions%20Academy/thumbnail_1.jpg"
        isModal
      />
    </GridContainer>
  );
};

export const InColumn = () => {
  return (
    <GridContainer>
      <GridRow>
        <GridItem span={{ lg: 4 }}>
          <Box backgroundColor="grey4" h="100%" />
        </GridItem>
        <GridItem span={{ lg: 4 }}>
          <Video
            src="https://res.cloudinary.com/pensionbee/video/upload/q_auto/v1646048083/Pensions%20Academy/pension-academy-videos/Pension_Academy_Ep_1_CC.mp4"
            thumbnail="https://res.cloudinary.com/pensionbee/image/upload/v1644591246/Pensions%20Academy/thumbnail_1.jpg"
          />
        </GridItem>
        <GridItem span={{ lg: 4 }}>
          <Box backgroundColor="grey4" h="100%" />
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export const Muted = () => {
  return (
    <GridContainer>
      <Video
        src="https://res.cloudinary.com/pensionbee/video/upload/q_auto/v1646048083/Pensions%20Academy/pension-academy-videos/Pension_Academy_Ep_1_CC.mp4"
        thumbnail="https://res.cloudinary.com/pensionbee/image/upload/v1644591246/Pensions%20Academy/thumbnail_1.jpg"
        muted={true}
      />
    </GridContainer>
  );
};

export const NoThumbnail = () => {
  return (
    <GridContainer>
      <Video src="https://res.cloudinary.com/pensionbee/video/upload/q_auto/v1646048083/Pensions%20Academy/pension-academy-videos/Pension_Academy_Ep_1_CC.mp4" />
    </GridContainer>
  );
};
