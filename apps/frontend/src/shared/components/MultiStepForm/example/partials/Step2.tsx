import { Button } from "@shared/components/Button";
import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { TextField } from "@shared/components/TextField";
import { Heading1, BodySmallB } from "@shared/components/Typography";
import { useScrollToTopOnLoad } from "@shared/hooks/useScrollToTopOnLoad/useScrollToTopOnLoad";
import { Box } from "@shared/components/Box";
import { useExampleMultiStepForm } from "../useMultiStepForm";

export const Step2 = () => {
  const { handleSetStep, register, formState, createSubmitHandler, data } =
    useExampleMultiStepForm("STEP_2");

  const handleSubmit = createSubmitHandler(
    async () => await handleSetStep("STEP_3")
  );

  useScrollToTopOnLoad();

  return (
    <form onSubmit={handleSubmit}>
      <GridContainer>
        <GridRow pt={{ xs: 40, lg: 80 }} pb={{ xs: 20, lg: 40 }}>
          <GridItem align="center">
            <Heading1>Step 2</Heading1>
          </GridItem>
        </GridRow>
        <GridRow>
          <GridItem>
            <TextField
              label="Address"
              error={formState.errors.address?.message}
              aria-label="address"
              {...register("address")}
            />
            <TextField
              label="City"
              error={formState.errors.city?.message}
              aria-label="city"
              {...register("city")}
            />
            <TextField
              label="State"
              error={formState.errors.state?.message}
              aria-label="state"
              {...register("state")}
            />
            <TextField
              label="Zip"
              error={formState.errors.zip?.message}
              aria-label="zip"
              {...register("zip")}
            />
            <Button type="submit">Next</Button>
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
    </form>
  );
};
