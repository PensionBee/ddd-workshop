import type {
  BreakpointValues,
  ValueOrBreakpointValues,
} from "@shared/utils/types";
import { Box } from "../../Box/Box";
import { asBreakpointObject } from "@shared/utils/asBreakpointObject";
import type { GridItemOffset, GridItemSpan } from "./GridItem.types";
import type {
  MediaDirectionType,
  MediaFlexType,
  MediaMarginType,
  MediaWidthType,
} from "@shared/styling/styledComponentHelpers";

export type GridItemProps = {
  /** React children */
  children: React.ReactNode;
  /** Element to render as */
  as?: React.ComponentProps<typeof Box>["as"];
  /** Horizontal alignment */
  align?: React.ComponentProps<typeof Box>["align"];
  /** Column offset */
  offset?: ValueOrBreakpointValues<GridItemOffset>;
  /** Column span */
  span?: ValueOrBreakpointValues<GridItemSpan>;
  /** Background color */
  backgroundColor?: React.ComponentProps<typeof Box>["backgroundColor"];
  /** Flex direction */
  direction?: ValueOrBreakpointValues<MediaDirectionType>;
};

const defaultOffset: ValueOrBreakpointValues<GridItemOffset> = { xs: 0 };
const defaultSpan: ValueOrBreakpointValues<GridItemSpan> = { xs: 12 };

export const GridItem: React.FC<GridItemProps> = ({
  children,
  as = "div",
  align = "stretch",
  offset = defaultOffset,
  span = defaultSpan,
  backgroundColor,
  direction = "column",
  ...props
}) => {
  const transformedProps = {
    ...transformOffsetToBoxStyles({
      ...defaultOffset,
      ...asBreakpointObject(offset),
    }),
    ...transformSpanToBoxStyles({
      ...defaultSpan,
      ...asBreakpointObject(span),
    }),
  };

  const styledProps = {
    $direction: asBreakpointObject(direction),
  };

  return (
    <Box
      data-rc="GridItem"
      align={align}
      as={as}
      d="flex"
      direction="column"
      px={{ xs: 12, md: 14, lg: 24 }}
      backgroundColor={backgroundColor}
      {...transformedProps}
      {...styledProps}
      {...props}
    >
      {children}
    </Box>
  );
};

export const transformOffsetToBoxStyles = (
  offset: BreakpointValues<GridItemOffset>
) =>
  Object.entries(offset).reduce(
    (prev, [breakpoint, colsToOffset]) => {
      const ml = {
        ...prev.ml,
        [breakpoint]: (colsToOffset / 12) * 100 + "%",
      };
      return { ...prev, ml };
    },
    { ml: {} satisfies BreakpointValues<MediaMarginType> }
  );

export const transformSpanToBoxStyles = (
  span: BreakpointValues<GridItemSpan>
) =>
  Object.entries(span).reduce(
    (prev, [breakpoint, colsToSpan]) => {
      const percentageWidth = `${(colsToSpan / 12) * 100}%`;
      const flex = {
        ...prev.flex,
        [breakpoint]: `0 0 ${percentageWidth}`,
      };
      const wMax = {
        ...prev.wMax,
        [breakpoint]: percentageWidth,
      };
      return { ...prev, flex, wMax };
    },
    {
      flex: {} satisfies BreakpointValues<MediaFlexType>,
      wMax: {} satisfies BreakpointValues<MediaWidthType>,
    }
  );
