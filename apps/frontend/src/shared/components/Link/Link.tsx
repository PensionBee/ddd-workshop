import type { StyledLinkProps } from "./Link.styled";
import { StyledLink } from "./Link.styled";

export type LinkProps = {
  /** React children */
  children: React.ReactNode;
  /** Link color */
  color?: StyledLinkProps["$color"];
  /** Link href */
  href?: React.HTMLProps<HTMLAnchorElement>["href"];
  /** Defines if the link should be underlined - use this if the link is part of a larger body of copy */
  noUnderline?: StyledLinkProps["$noUnderline"];
  /** If true, prevents portion of text from wrapping, forcing the entire content onto a new line */
  nowrap?: StyledLinkProps["$nowrap"];
  /** Link target */
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
};

export const Link: React.FC<LinkProps> = ({
  children,
  color = "link",
  href,
  noUnderline = false,
  nowrap = false,
  target = "_self",
  ...props
}) => {
  const styledProps = {
    $color: color,
    $nowrap: nowrap,
    $noUnderline: noUnderline,
  };

  return (
    <StyledLink
      data-rc="Link"
      href={href}
      target={target}
      {...styledProps}
      {...props}
    >
      {children}
    </StyledLink>
  );
};
