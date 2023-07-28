import { Button } from "@shared/components/Button";
import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { TextField } from "@shared/components/TextField";
import { Heading1, BodySmallB } from "@shared/components/Typography";
import { useScrollToTopOnLoad } from "@shared/hooks/useScrollToTopOnLoad/useScrollToTopOnLoad";
import { Box } from "@shared/components/Box";
import { useExampleMultiStepForm } from "../useMultiStepForm";

export const Step3 = () => {
  const { formState, data, register } = useExampleMultiStepForm("STEP_3");

  useScrollToTopOnLoad();

  return (
    <GridContainer>
      <GridRow pt={{ xs: 40, lg: 80 }} pb={{ xs: 20, lg: 40 }}>
        <GridItem align="center">
          <Heading1>Step 3</Heading1>
        </GridItem>
      </GridRow>
      <GridRow>
        <GridItem>
          <TextField
            label="Address"
            error={formState.errors.cardName?.message}
            aria-label="cardName"
            {...register("cardName")}
          />
          <TextField
            label="City"
            error={formState.errors.cardNumber?.message}
            aria-label="cardNumber"
            {...register("cardNumber")}
          />
          <TextField
            label="State"
            error={formState.errors.cvv?.message}
            aria-label="cvv"
            {...register("cvv")}
          />
          <TextField
            label="Zip"
            error={formState.errors.expiryDate?.message}
            aria-label="expiryDate"
            {...register("expiryDate")}
          />
          <Button type="submit">Next</Button>
        </GridItem>
      </GridRow>
      <Box borderBottom={2} borderColor="grey5" w="100%" my={32} />
      <GridRow>
        <GridItem align="center">
          <Button onClick={() => window.location.reload()}>Reset Form</Button>
        </GridItem>
      </GridRow>
      <Box borderBottom={2} borderColor="grey5" w="100%" my={32} />
      <GridRow>
        <GridItem>
          <BodySmallB>Form Data:</BodySmallB>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};
