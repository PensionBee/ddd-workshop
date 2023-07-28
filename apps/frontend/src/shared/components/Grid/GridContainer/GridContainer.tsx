import { Box } from "../../Box/Box";

export type GridContainerProps = {
  /** React children */
  children: React.ReactNode;
  /** Background color */
  backgroundColor?: React.ComponentProps<typeof Box>["backgroundColor"];
  /** Border top in px */
  borderTop?: React.ComponentProps<typeof Box>["borderTop"];
  /** Border bottom in px */
  borderBottom?: React.ComponentProps<typeof Box>["borderBottom"];
  /** Border colour */
  borderColor?: React.ComponentProps<typeof Box>["borderColor"];
  /** Padding top in px */
  pt?: React.ComponentProps<typeof Box>["pt"];
  /** Padding bottom in px */
  pb?: React.ComponentProps<typeof Box>["pb"];
  /** Z Index */
  z?: React.ComponentProps<typeof Box>["z"];
};

export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  backgroundColor,
  borderTop,
  borderBottom,
  borderColor,
  pt,
  pb,
  z,
  ...props
}) => {
  return (
    <Box
      data-rc="GridContainer"
      as="section"
      backgroundColor={backgroundColor}
      borderTop={borderTop}
      borderBottom={borderBottom}
      borderColor={borderColor}
      pt={pt}
      pb={pb}
      z={z}
      {...props}
    >
      <Box wMax={{ xl: 1200 }} mx={{ xs: 20, md: 28, lg: 36, xl: "auto" }}>
        {children}
      </Box>
    </Box>
  );
};
