import { render } from "@shared/testUtils";
import React from "react";
import * as ComponentIcons from "./components/ComponentIcons";
import * as FooterSystemIcons from "./components/FooterSystemIcons";
import * as LargeSystemIcons from "./components/LargeSystemIcons";
import * as Logos from "./components/Logos";
import * as SmallSystemIcons from "./components/SmallSystemIcons";
import * as SocialIcons from "./components/SocialIcons";
import * as PlanIcons from "./components/PlanIcons";
import * as RiskProfileIcons from "./components/RiskProfileIcons";

import type { SvgProps } from "./Svg";
import {
  ComponentIcon,
  FooterSystemIcon,
  LargeSystemIcon,
  LogoSvg,
  SmallSystemIcon,
  SocialIcon,
  PlanIcon,
  RiskProfileIcon,
} from "./Svg";

/* Helper functions */
const fromContainer = (container: HTMLElement) => ({
  getSVGs: () => container.getElementsByTagName("svg"),
});

const shouldRenderSvg = (Icons: object) => {
  it("should render svg correctly", () => {
    const IconComponents = Object.entries(Icons);
    const { container, asFragment } = render(
      <>
        {IconComponents.map(([iconName, Svg]) => (
          <Svg key={iconName} data-rc={iconName} />
        ))}
      </>
    );
    const { getSVGs } = fromContainer(container);

    expect(getSVGs().length).toBe(IconComponents.length);
    expect(asFragment()).toMatchSnapshot();
  });
};

const shouldRenderComponent = <T extends string>(
  Component: React.FC<SvgProps<T>>,
  icon: SvgProps<T>["icon"]
) => {
  it("should render component correctly", () => {
    const { container, asFragment } = render(<Component icon={icon} />);
    const { getSVGs } = fromContainer(container);

    expect(getSVGs().length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
  });
};

describe("Svg", () => {
  describe("ComponentIcons", () => shouldRenderSvg(ComponentIcons));
  describe("FooterSystemIcons", () => shouldRenderSvg(FooterSystemIcons));
  describe("LargeSystemIcons", () => shouldRenderSvg(LargeSystemIcons));
  describe("Logos", () => shouldRenderSvg(Logos));
  describe("SmallSystemIcons", () => shouldRenderSvg(SmallSystemIcons));
  describe("SocialIcons", () => shouldRenderSvg(SocialIcons));
  describe("PlanIcons", () => shouldRenderSvg(PlanIcons));
  describe("RiskProfileIcons", () => shouldRenderSvg(RiskProfileIcons));

  describe("ComponentIcon", () =>
    shouldRenderComponent(ComponentIcon, "Check"));
  describe("FooterSystemIcon", () =>
    shouldRenderComponent(FooterSystemIcon, "FscsLogo"));
  describe("LargeSystemIcon", () =>
    shouldRenderComponent(LargeSystemIcon, "AndroidId"));
  describe("LogoSvg", () => shouldRenderComponent(LogoSvg, "PensionBeeLogo"));
  describe("SmallSystemIcon", () =>
    shouldRenderComponent(SmallSystemIcon, "Actions"));
  describe("SocialIcon", () => shouldRenderComponent(SocialIcon, "Facebook"));
  describe("PlanIcon", () => shouldRenderComponent(PlanIcon, "Tailored"));
  describe("RiskProfileIcon", () =>
    shouldRenderComponent(RiskProfileIcon, "Medium"));
});
