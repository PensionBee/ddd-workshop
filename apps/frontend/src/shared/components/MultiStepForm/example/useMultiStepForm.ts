import { useMultiStepForm } from "@shared/components/MultiStepForm";
import {
  type FormStep,
  formSchema,
  FormContext,
} from "./ExampleMultiStepForm.config";

export const useExampleMultiStepForm = <Step extends FormStep>(step: Step) => {
  const partialSchema = formSchema.shape[step];
  return useMultiStepForm(formSchema, partialSchema, FormContext);
};
