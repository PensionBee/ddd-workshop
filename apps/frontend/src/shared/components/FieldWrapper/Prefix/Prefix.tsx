import { SmallSystemIcon } from "@shared/components/Svg";
import { Box } from "@shared/components/Box";
import { BodySmallB } from "@shared/components/Typography";
import { useMemo } from "react";

type SmallSystemIconProps = React.ComponentProps<typeof SmallSystemIcon>;

export type PrefixProps = {
  /* Optional prefix icon to display i.e. AlertIcon */
  prefixIcon?: SmallSystemIconProps["icon"];
  /* Optional prefix icon fill color */
  prefixIconFill?: SmallSystemIconProps["fill"];
  /* Optional prefix text to display i.e. £ */
  prefixText?: string;
};

const PrefixIcon: React.FC<SmallSystemIconProps> = (props) => (
  <SmallSystemIcon {...props} w={20} h={20} />
);

export const Prefix: React.FC<PrefixProps> = ({
  prefixIcon,
  prefixIconFill,
  prefixText,
}) => {
  const conditionalContent = useMemo(() => {
    if (prefixText) return <BodySmallB>{prefixText}</BodySmallB>;
    if (prefixIcon)
      return <PrefixIcon icon={prefixIcon} fill={prefixIconFill} />;
    return null;
  }, [prefixIcon, prefixIconFill, prefixText]);

  // Add additional padding when no prefix content
  if (!conditionalContent) return null;

  return (
    <Box
      d="flex"
      align="center"
      px={16}
      py={13}
      backgroundColor="grey6"
      mr={-8}
    >
      {conditionalContent}
    </Box>
  );
};
