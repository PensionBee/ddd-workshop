import { DisclaimerR } from "@shared/components/Typography";
import { StyledErrorMessage } from "./ErrorMessage.styled";

export type ErrorMessageProps = {
  /** Error message to be displayed */
  children?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  if (!children) return null;
  return (
    <StyledErrorMessage
      px={16}
      py={4}
      backgroundColor="red100"
      borderRadius={4}
      mt={5}
    >
      <DisclaimerR color="white">{children}</DisclaimerR>
    </StyledErrorMessage>
  );
};
