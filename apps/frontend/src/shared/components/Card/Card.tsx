/* eslint-disable react-refresh/only-export-components */
import type { BoxProps } from "../Box/Box";
import { Box } from "../Box/Box";
import { theme } from "@shared/styling/theme";
import type { Button } from "../Button/Button";
import type { Link } from "../Link/Link";

type CardBaseProps = BoxProps & {
  /** Card content */
  children: React.ReactNode;
  /** Card elevation */
  elevation?: 4 | 8 | 12;
};

type CardDivProps = {
  as?: never;
  onClick?: never;
  type?: never;
  href?: never;
  target?: never;
};

type CardButtonProps = {
  as: "button";
  /** Event on click */
  onClick?: React.ComponentProps<typeof Button>["onClick"];
  /** Button type */
  type?: React.ComponentProps<typeof Button>["type"];
  href?: never;
  target?: never;
};

type CardLinkProps = {
  as: "a";
  /** Link href */
  href?: React.ComponentProps<typeof Link>["href"];
  /** Link target */
  target?: React.ComponentProps<typeof Link>["target"];
  onClick?: never;
  type?: never;
};

export type CardProps = CardBaseProps &
  (CardButtonProps | CardLinkProps | CardDivProps);

export const cardElevation = {
  "4": "0px 0px 10px 4px",
  "8": "0px 0px 20px 8px",
  "12": "0px 0px 28px 12px",
};

type CardElevation = CardBaseProps["elevation"];

export const getBoxShadow = (elevation?: CardElevation) => {
  const shadow = (elevation: CardElevation = 4) => cardElevation[elevation];
  const hexPercent30 = "4D"; // Appended to end of hex code sets it opacity to 30%
  return `${shadow(elevation)} ${theme.colors.grey3}${hexPercent30}`;
};

export const Card: React.FC<CardProps> = ({
  as,
  children,
  border = 0,
  elevation = 4,
  borderRadius = 12,
  ...props
}) => {
  const boxShadow = getBoxShadow(elevation);

  return (
    <Box
      as={as}
      backgroundColor="white"
      border={border}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      overflow="hidden"
      d="inline-block"
      p={28}
      transition="outline 200ms ease"
      {...props}
    >
      {children}
    </Box>
  );
};

// Not to be used outside of stories
type _ButtonProps = Omit<CardButtonProps, "href" | "target">;
type _LinkProps = Omit<CardLinkProps, "onClick" | "type">;
export const _CardBaseComponent: React.FC<CardBaseProps> = () => null;
export const _CardButtonComponent: React.FC<_ButtonProps> = () => null;
export const _CardLinkComponent: React.FC<_LinkProps> = () => null;
