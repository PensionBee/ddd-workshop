import { Box } from "../../Box/Box";

export type GridRowProps = {
  children: React.ComponentProps<typeof Box>["children"];
  /** Element to render as */
  as?: React.ComponentProps<typeof Box>["as"];
  /** Vertical alignment */
  align?: React.ComponentProps<typeof Box>["align"];
  /** Border bottom in px */
  borderBottom?: React.ComponentProps<typeof Box>["borderBottom"];
  /** Border colour */
  borderColor?: React.ComponentProps<typeof Box>["borderColor"];
  /** Border top in px */
  borderTop?: React.ComponentProps<typeof Box>["borderTop"];
  /** If wrap should be disabled */
  nowrap?: React.ComponentProps<typeof Box>["nowrap"];
  /** Padding bottom in px */
  pb?: React.ComponentProps<typeof Box>["pb"];
  /** Padding top in px */
  pt?: React.ComponentProps<typeof Box>["pt"];
  /** Horizontal space between elements */
  rowGap?: React.ComponentProps<typeof Box>["rowGap"];
  /** Background color */
  backgroundColor?: React.ComponentProps<typeof Box>["backgroundColor"];
};

export const GridRow: React.FC<GridRowProps> = ({
  children,
  as,
  align,
  borderBottom,
  borderColor,
  borderTop,
  nowrap,
  pb,
  pt,
  rowGap,
  backgroundColor,
  ...props
}) => {
  return (
    <Box
      data-rc="GridRow"
      as={as}
      d="flex"
      align={align}
      borderBottom={borderBottom}
      borderColor={borderColor}
      borderTop={borderTop}
      mx={{ xs: -12, md: -14, lg: -24 }}
      nowrap={nowrap}
      pb={pb}
      pt={pt}
      rowGap={rowGap}
      backgroundColor={backgroundColor}
      w={{
        xs: "calc(100% + 24px)",
        md: "calc(100% + 28px)",
        lg: "calc(100% + 48px)",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
