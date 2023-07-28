/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import {
  StyledSignatureButton,
  StyledSignatureLine,
  StyledSignatureErrorCaret,
  StyledSignatureError,
} from "./SignatureField.styled";
import { Box } from "@shared/components/Box";
import { LargeSystemIcon } from "@shared/components/Svg";
import { DisclaimerR } from "@shared/components/Typography";

export type SignatureFieldProps = {
  /** Form control */
  control: Control<any, any>;
  /** Message if error */
  error?: string;
  /** Field name */
  name: string;
};

export const SignatureField: React.FC<SignatureFieldProps> = ({
  error,
  name,
  control,
  ...props
}) => {
  const canvasRef = useRef<SignatureCanvas>(null);

  const convertToPNG = () => {
    const url = canvasRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (url) return url;
  };

  const clear = () => {
    canvasRef.current?.clear();
  };

  const borderColor = error ? "red100" : "grey4";
  const marginBottom = error ? { xs: 0, lg: 0 } : { xs: 20, lg: 40 };

  return (
    <>
      <Box
        mt={{ xs: 20, lg: 40 }}
        mb={marginBottom}
        ml={"auto"}
        mr={"auto"}
        border={5}
        borderColor={borderColor}
        borderStyle="dashed"
        borderRadius={25}
        w="100%"
        h="260px"
        d="flex"
        justify="center"
        data-rc="SignatureField"
        {...props}
      >
        <StyledSignatureButton onClick={clear}>clear</StyledSignatureButton>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <SignatureCanvas
              canvasProps={{
                width: 490,
                height: 250,
              }}
              ref={canvasRef}
              onEnd={() => field.onChange(convertToPNG())}
            />
          )}
        />
        <StyledSignatureLine>
          <LargeSystemIcon icon="SignatureMarker" fill="black" />
        </StyledSignatureLine>
      </Box>
      {error && (
        <>
          <StyledSignatureError>
            <StyledSignatureErrorCaret />
            <DisclaimerR color="white">{error}</DisclaimerR>
          </StyledSignatureError>
        </>
      )}
    </>
  );
};
