import { Button } from "@shared/components/Button";
import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { TextField } from "@shared/components/TextField";
import { Heading1, BodySmallB } from "@shared/components/Typography";
import { useScrollToTopOnLoad } from "@shared/hooks/useScrollToTopOnLoad/useScrollToTopOnLoad";
import { useEffect } from "react";
import { Box } from "@shared/components/Box";
import { useExampleMultiStepForm } from "../useMultiStepForm";

export const Step1 = () => {
  const {
    handleSetStep,
    register,
    formState,
    createSubmitHandler,
    watch,
    data,
  } = useExampleMultiStepForm("STEP_1");

  const handleSubmit = createSubmitHandler(
    async () => await handleSetStep("STEP_2")
  );

  useScrollToTopOnLoad();

  const watchedFirstName = watch("firstName");

  useEffect(() => {
    if (!watchedFirstName.length) {
      setTimeout(() => alert("You need to have a name!"), 0);
    }
  }, [watchedFirstName]);

  return (
    <form onSubmit={handleSubmit}>
      <GridContainer>
        <GridRow pt={{ xs: 40, lg: 80 }} pb={{ xs: 20, lg: 40 }}>
          <GridItem align="center">
            <Heading1>Step 1</Heading1>
          </GridItem>
        </GridRow>
        <GridRow>
          <GridItem>
            <TextField
              label="First Name"
              error={formState.errors.firstName?.message}
              aria-label="firstName"
              {...register("firstName")}
            />
            <TextField
              label="Last Name"
              error={formState.errors.lastName?.message}
              aria-label="lastName"
              {...register("lastName")}
            />
            <TextField
              label="Email"
              error={formState.errors.email?.message}
              aria-label="email"
              {...register("email")}
            />
            <TextField
              label="Password"
              error={formState.errors.password?.message}
              aria-label="password"
              {...register("password")}
            />
            <TextField
              label="Confirm Password"
              error={formState.errors.confirmPassword?.message}
              aria-label="confirmPassword"
              {...register("confirmPassword")}
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
