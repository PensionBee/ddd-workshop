import type { ComponentStory } from "@storybook/react";
import {
  AppNav as AppNavComponent,
  BodyLarge as BodyLargeComponent,
  BodyMedium as BodyMediumComponent,
  BodySmallB as BodySmallBComponent,
  BodySmallH as BodySmallHComponent,
  BodySmallL as BodySmallLComponent,
  BodySmallM as BodySmallMComponent,
  BodySmallR as BodySmallRComponent,
  CaptionB as CaptionBComponent,
  CaptionL as CaptionLComponent,
  CaptionM as CaptionMComponent,
  CaptionR as CaptionRComponent,
  Category as CategoryComponent,
  DisclaimerB as DisclaimerBComponent,
  DisclaimerL as DisclaimerLComponent,
  DisclaimerM as DisclaimerMComponent,
  DisclaimerR as DisclaimerRComponent,
  Display1 as Display1Component,
  Display2 as Display2Component,
  Display3 as Display3Component,
  Display4 as Display4Component,
  Heading1 as Heading1Component,
  Heading2 as Heading2Component,
  Heading2El as Heading2ElComponent,
  Heading3 as Heading3Component,
  Heading3El as Heading3ElComponent,
  Heading4 as Heading4Component,
  type VariantTypographyProps,
} from "./Typography";

export default {
  title: "Shared/Typography",
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
  },
};

const BodyLargeTemplate: ComponentStory<typeof BodyLargeComponent> = (
  args: VariantTypographyProps
) => <BodyLargeComponent {...args} />;
export const BodyLarge = BodyLargeTemplate.bind({});
BodyLarge.args = {
  children: "Body Large",
};

const BodyMediumTemplate: ComponentStory<typeof BodyMediumComponent> = (
  args: VariantTypographyProps
) => <BodyMediumComponent {...args} />;
export const BodyMedium = BodyMediumTemplate.bind({});
BodyMedium.args = {
  children: "Body Medium",
};

const BodySmallLTemplate: ComponentStory<typeof BodySmallLComponent> = (
  args: VariantTypographyProps
) => <BodySmallLComponent {...args} />;
export const BodySmallL = BodySmallLTemplate.bind({});
BodySmallL.args = {
  children: "Body Small L",
};

const BodySmallRTemplate: ComponentStory<typeof BodySmallRComponent> = (
  args: VariantTypographyProps
) => <BodySmallRComponent {...args} />;
export const BodySmallR = BodySmallRTemplate.bind({});
BodySmallR.args = {
  children: "Body Small R",
};

const BodySmallMTemplate: ComponentStory<typeof BodySmallMComponent> = (
  args: VariantTypographyProps
) => <BodySmallMComponent {...args} />;
export const BodySmallM = BodySmallMTemplate.bind({});
BodySmallM.args = {
  children: "Body Small M",
};

const BodySmallBTemplate: ComponentStory<typeof BodySmallBComponent> = (
  args: VariantTypographyProps
) => <BodySmallBComponent {...args} />;
export const BodySmallB = BodySmallBTemplate.bind({});
BodySmallB.args = {
  children: "Body Small B",
};

const BodySmallHTemplate: ComponentStory<typeof BodySmallHComponent> = (
  args: VariantTypographyProps
) => <BodySmallHComponent {...args} />;
export const BodySmallH = BodySmallHTemplate.bind({});
BodySmallH.args = {
  children: "Body Small H",
};

const CaptionLTemplate: ComponentStory<typeof CaptionLComponent> = (
  args: VariantTypographyProps
) => <CaptionLComponent {...args} />;
export const CaptionL = CaptionLTemplate.bind({});
CaptionL.args = {
  children: "Caption L",
};

const CaptionRTemplate: ComponentStory<typeof CaptionRComponent> = (
  args: VariantTypographyProps
) => <CaptionRComponent {...args} />;
export const CaptionR = CaptionRTemplate.bind({});
CaptionR.args = {
  children: "Caption R",
};

const CaptionMTemplate: ComponentStory<typeof CaptionMComponent> = (
  args: VariantTypographyProps
) => <CaptionMComponent {...args} />;
export const CaptionM = CaptionMTemplate.bind({});
CaptionM.args = {
  children: "Caption M",
};

const CaptionBTemplate: ComponentStory<typeof CaptionBComponent> = (
  args: VariantTypographyProps
) => <CaptionBComponent {...args} />;
export const CaptionB = CaptionBTemplate.bind({});
CaptionB.args = {
  children: "Caption B",
};

const DisclaimerLTemplate: ComponentStory<typeof DisclaimerLComponent> = (
  args: VariantTypographyProps
) => <DisclaimerLComponent {...args} />;
export const DisclaimerL = DisclaimerLTemplate.bind({});
DisclaimerL.args = {
  children: "Disclaimer L",
};

const DisclaimerRTemplate: ComponentStory<typeof DisclaimerRComponent> = (
  args: VariantTypographyProps
) => <DisclaimerRComponent {...args} />;
export const DisclaimerR = DisclaimerRTemplate.bind({});
DisclaimerR.args = {
  children: "Disclaimer R",
};

const DisclaimerMTemplate: ComponentStory<typeof DisclaimerMComponent> = (
  args: VariantTypographyProps
) => <DisclaimerMComponent {...args} />;
export const DisclaimerM = DisclaimerMTemplate.bind({});
DisclaimerM.args = {
  children: "Disclaimer M",
};

const DisclaimerBTemplate: ComponentStory<typeof DisclaimerBComponent> = (
  args: VariantTypographyProps
) => <DisclaimerBComponent {...args} />;
export const DisclaimerB = DisclaimerBTemplate.bind({});
DisclaimerB.args = {
  children: "Disclaimer B",
};

const Display1Template: ComponentStory<typeof Display1Component> = (
  args: VariantTypographyProps
) => <Display1Component {...args} />;
export const Display1 = Display1Template.bind({});
Display1.args = {
  children: "Display 1",
};

const Display2Template: ComponentStory<typeof Display2Component> = (
  args: VariantTypographyProps
) => <Display2Component {...args} />;
export const Display2 = Display2Template.bind({});
Display2.args = {
  children: "Display 2",
};

const Display3Template: ComponentStory<typeof Display3Component> = (
  args: VariantTypographyProps
) => <Display3Component {...args} />;
export const Display3 = Display3Template.bind({});
Display3.args = {
  children: "Display 3",
};

const Display4Template: ComponentStory<typeof Display4Component> = (
  args: VariantTypographyProps
) => <Display4Component {...args} />;
export const Display4 = Display4Template.bind({});
Display4.args = {
  children: "Display 4",
};

const Heading1Template: ComponentStory<typeof Heading1Component> = (
  args: VariantTypographyProps
) => <Heading1Component {...args} />;
export const Heading1 = Heading1Template.bind({});
Heading1.args = {
  children: "Heading 1",
};

const Heading2Template: ComponentStory<typeof Heading2Component> = (
  args: VariantTypographyProps
) => <Heading2Component {...args} />;
export const Heading2 = Heading2Template.bind({});
Heading2.args = {
  children: "Heading 2",
};

const Heading2ElTemplate: ComponentStory<typeof Heading2ElComponent> = (
  args: VariantTypographyProps
) => <Heading2ElComponent {...args} />;
export const Heading2El = Heading2ElTemplate.bind({});
Heading2El.args = {
  children: "Heading 2 EL",
};

const Heading3Template: ComponentStory<typeof Heading3Component> = (
  args: VariantTypographyProps
) => <Heading3Component {...args} />;
export const Heading3 = Heading3Template.bind({});
Heading3.args = {
  children: "Heading 3",
};

const Heading3ElTemplate: ComponentStory<typeof Heading3ElComponent> = (
  args: VariantTypographyProps
) => <Heading3ElComponent {...args} />;
export const Heading3El = Heading3ElTemplate.bind({});
Heading3El.args = {
  children: "Heading 3 EL",
};

const Heading4Template: ComponentStory<typeof Heading4Component> = (
  args: VariantTypographyProps
) => <Heading4Component {...args} />;
export const Heading4 = Heading4Template.bind({});
Heading4.args = {
  children: "Heading 4",
};

const CategoryTemplate: ComponentStory<typeof CategoryComponent> = (
  args: VariantTypographyProps
) => <CategoryComponent {...args} />;
export const Category = CategoryTemplate.bind({});
Category.args = {
  children: "Category",
};

const AppNavTemplate: ComponentStory<typeof AppNavComponent> = (
  args: VariantTypographyProps
) => <AppNavComponent {...args} />;
export const AppNav = AppNavTemplate.bind({});
AppNav.args = {
  children: "App Nav",
};
