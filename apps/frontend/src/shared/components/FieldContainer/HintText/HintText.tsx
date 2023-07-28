import { DisclaimerR } from "@shared/components/Typography";

export type HintTextProps = {
  /** Hint text to be displayed */
  hintText?: string;
};

export const HintText: React.FC<HintTextProps> = ({ hintText }) => {
  if (!hintText) return null;
  return (
    <DisclaimerR color="grey1" mt={8}>
      {hintText}
    </DisclaimerR>
  );
};
