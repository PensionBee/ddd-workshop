import type { ComponentMeta } from "@storybook/react";
import * as ComponentIcons from "./components/ComponentIcons";
import * as FooterSystemIcons from "./components/FooterSystemIcons";
import * as LargeSystemIcons from "./components/LargeSystemIcons";
import * as LogoSVGs from "./components/Logos";
import * as SmallSystemIcons from "./components/SmallSystemIcons";
import * as SocialIcons from "./components/SocialIcons";
import * as PlanIcons from "./components/PlanIcons";
import * as RiskProfileIcons from "./components/RiskProfileIcons";
import { GridContainer } from "../Grid";
import { GridRow } from "../Grid/GridRow/GridRow";
import { GridItem } from "../Grid/GridItem/GridItem";

export default {
  title: "Shared/SVG",
  parameters: {
    viewMode: "story",
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
    controls: {
      disable: true,
    },
  },
} satisfies ComponentMeta<
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
>;

export const ComponentIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(ComponentIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName} span={{ xs: 4 }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const LogoSvgOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(LogoSVGs).map(([iconName, Svg]) => (
          <GridItem key={iconName}>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const FooterSystemIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(FooterSystemIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName}>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const SmallIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(SmallSystemIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName} span={{ xs: 4 }}>
            <div
              style={{
                width: "250px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const LargeIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(LargeSystemIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName} span={{ xs: 4 }}>
            <div
              style={{
                width: "250px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const PlanIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(PlanIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName} span={{ xs: 4 }}>
            <div
              style={{
                width: "250px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const RiskProfileIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(RiskProfileIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName} span={{ xs: 4 }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  width: "100px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};

export const SocialIconOptions = () => {
  return (
    <GridContainer>
      <GridRow rowGap={20}>
        {Object.entries(SocialIcons).map(([iconName, Svg]) => (
          <GridItem key={iconName} span={{ xs: 4 }}>
            <div
              style={{
                width: "250px",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Svg />
              </span>
              <span>{iconName}</span>
            </div>
          </GridItem>
        ))}
      </GridRow>
    </GridContainer>
  );
};
