import React from "react";
import { asBreakpointObject } from "@shared/utils/asBreakpointObject";
import type { ValueOrBreakpointValues } from "@shared/utils/types";
import { SmallSystemIcon } from "../Svg/Svg";
import type { Link } from "../Link/Link";
import { StyledButton } from "./Button.styled";
import type {
  ButtonIconPosition,
  ButtonType,
  ButtonVariant,
} from "./Button.types";
import type { MediaWidthType } from "@shared/styling/styledComponentHelpers";

type ButtonBaseProps = {
  /** Button text */
  children?: string;
  /** The variant from the style guide */
  variant?: ButtonVariant;
  /** Position of button icon */
  iconPosition?: ButtonIconPosition;
  /** Button icon type */
  icon?: React.ComponentProps<typeof SmallSystemIcon>["icon"];
  /** If the button is disabled */
  disabled?: boolean;
  /** Width */
  w?: ValueOrBreakpointValues<MediaWidthType>;
  /** Maximum width */
  wMax?: ValueOrBreakpointValues<MediaWidthType>;
  /** Minimum width */
  wMin?: ValueOrBreakpointValues<MediaWidthType>;
};

type StandardButtonProps = {
  /** Event on click */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Button type */
  type?: ButtonType;
  href?: never;
  target?: never;
};

type ButtonLinkProps = {
  /** Link href */
  href?: string;
  /** Link target */
  target?: React.ComponentProps<typeof Link>["target"];
  onClick?: never;
  type?: never;
};

export type ButtonProps =
  | (ButtonBaseProps & StandardButtonProps)
  | (ButtonBaseProps & ButtonLinkProps);

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  iconPosition = "right",
  variant = "primary-yellow",
  w,
  wMax,
  wMin,
  ...props
}) => {
  const isLink = Boolean((props as ButtonLinkProps).href);

  const styledProps = {
    $variant: variant,
    $w: asBreakpointObject(w),
    $wMax: asBreakpointObject(wMax),
    $wMin: asBreakpointObject(wMin),
  };

  const renderAs = () => {
    if (isLink) return "a";
    return "button";
  };

  return (
    <StyledButton data-rc="Button" as={renderAs()} {...styledProps} {...props}>
      {icon && iconPosition === "left" && (
        <SmallSystemIcon icon={icon} data-icon={icon} h={20} w={20} />
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <SmallSystemIcon icon={icon} data-icon={icon} h={20} w={20} />
      )}
    </StyledButton>
  );
};

Button.defaultProps = {
  type: "button",
  disabled: false,
};

// Not to be used outside of stories
export const _ButtonBaseComponent: React.FC<ButtonBaseProps> = () => null;
export const _ButtonComponent: React.FC<
  Omit<StandardButtonProps, "href" | "target">
> = () => null;
export const _ButtonLinkComponent: React.FC<
  Omit<ButtonLinkProps, "onClick" | "type">
> = () => null;
