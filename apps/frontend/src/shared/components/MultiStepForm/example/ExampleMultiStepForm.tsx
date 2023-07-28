import { MultiStepForm } from "@shared/components/MultiStepForm";
import {
  formSchema,
  FormContext,
  formPartials,
  initialFormState,
} from "./ExampleMultiStepForm.config";

export const ExampleMultiStepForm = () => {
  return (
    <MultiStepForm
      _schema={formSchema}
      Context={FormContext}
      partials={formPartials}
      initialState={initialFormState}
    />
  );
};
