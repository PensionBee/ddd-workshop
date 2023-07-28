import { useMemo } from "react";
import { Box } from "@shared/components/Box";
import { Link } from "@shared/components/Link";
import { BodySmallB } from "@shared/components/Typography";
import { LabelTooltip } from "./LabelTooltip";

export type LabelProps = {
  /** Label for field */
  label?: string;
  /** Label 'i' tooltip */
  labelTooltip?: React.ComponentProps<typeof LabelTooltip>["labelTooltip"];
  /** Label link href */
  labelHref?: string;
  /** Label link text */
  labelLinkText?: string;
  /** Label htmlFor - id of input */
  labelHtmlFor?: string;
};

export const Label: React.FC<LabelProps> = ({
  label,
  labelTooltip,
  labelHref,
  labelLinkText,
  labelHtmlFor,
  ...props
}) => {
  const conditionalContent = useMemo(() => {
    if (labelTooltip) return <LabelTooltip labelTooltip={labelTooltip} />;
    if (labelHref) return <Link href={labelHref}>{labelLinkText}</Link>;
    return null;
  }, [labelTooltip, labelHref, labelLinkText]);

  if (!label) return null;

  return (
    <Box
      as="label"
      htmlFor={labelHtmlFor}
      d="flex"
      justify="space-between"
      align="start"
      pb={16}
      colGap={16}
      mt={0}
      nowrap
      {...props}
    >
      <BodySmallB>{label}</BodySmallB>
      {conditionalContent}
    </Box>
  );
};
