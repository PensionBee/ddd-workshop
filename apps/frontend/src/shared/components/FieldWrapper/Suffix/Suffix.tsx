import { SmallSystemIcon } from "@shared/components/Svg";
import { Box } from "@shared/components/Box";
import { BodySmallB } from "@shared/components/Typography";
import { useMemo } from "react";

type SmallSystemIconProps = React.ComponentProps<typeof SmallSystemIcon>;

export type SuffixProps = {
  /* Optional suffix icon to display i.e. AlertIcon */
  suffixIcon?: SmallSystemIconProps["icon"];
  /* Optional suffix icon fill color */
  suffixIconFill?: SmallSystemIconProps["fill"];
  /* Optional suffix text to display i.e. % */
  suffixText?: string;
};

const SuffixIcon: React.FC<SmallSystemIconProps> = (props) => (
  <SmallSystemIcon {...props} w={20} h={20} />
);

export const Suffix: React.FC<SuffixProps> = ({
  suffixIcon,
  suffixIconFill,
  suffixText,
}) => {
  const conditionalContent = useMemo(() => {
    if (suffixText) return <BodySmallB>{suffixText}</BodySmallB>;
    if (suffixIcon)
      return <SuffixIcon icon={suffixIcon} fill={suffixIconFill} />;
    return null;
  }, [suffixIcon, suffixIconFill, suffixText]);

  // Add additional padding when no suffix content
  if (!conditionalContent) return null;

  return (
    <Box d="flex" align="center" px={16} py={13} ml={-8}>
      {conditionalContent}
    </Box>
  );
};
