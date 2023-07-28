import {
  StyledCheckboxContainer,
  StyledCheckboxContainerError,
} from "./CheckboxContainer.styled";
import { Checkbox, type CheckboxProps } from "../Checkbox/Checkbox";
import { Box } from "../Box/Box";
import { BodySmallL, DisclaimerR } from "../Typography/Typography";

export type CheckboxContainerProps = CheckboxProps & {
  children: React.ReactNode;
};

export const CheckboxContainer: React.FC<CheckboxContainerProps> = ({
  children,
  error,
  ...props
}) => {
  return (
    <>
      <StyledCheckboxContainer data-rc="CheckboxContainer">
        <Box d="flex" mt={2}>
          <Checkbox error={error} {...props} />
        </Box>
        <BodySmallL>{children}</BodySmallL>
      </StyledCheckboxContainer>
      {error && (
        <StyledCheckboxContainerError>
          <DisclaimerR color="white">{error}</DisclaimerR>
        </StyledCheckboxContainerError>
      )}
    </>
  );
};
