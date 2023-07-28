import type { DeepPartial } from "react-hook-form";
import type { z } from "zod";

export type ZodSchemaObject = z.AnyZodObject;

export type MultiStepFormData<ZodSchema extends ZodSchemaObject> = DeepPartial<
  z.infer<ZodSchema>
>;

export type MultiStepFormStep<ZodSchema extends ZodSchemaObject> = z.infer<
  ReturnType<ZodSchema["keyof"]>
>;

export type MultiStepFormAction<ZodSchema extends ZodSchemaObject> =
  | {
      type: "SET_STAGE";
      payload: MultiStepFormStep<ZodSchema>;
    }
  | {
      type: "SET_STAGE_STATE";
      payload: MultiStepFormData<ZodSchema>;
    };

export type MultiStepFormState<ZodSchema extends ZodSchemaObject> = {
  step: MultiStepFormStep<ZodSchema>;
  data: MultiStepFormData<ZodSchema>;
};

export type MultiStepFormPartials<Step extends Uppercase<string>> = {
  [Key in Step]: React.FC;
};

export type MultiStepFormInferredState<
  Steps extends Uppercase<string>,
  ZodSchema extends ZodSchemaObject
> = {
  step: Steps;
  data: {
    [Key in Steps]?: z.infer<ZodSchema> | object;
  };
};

export type MultiStepFormReducer<ZodSchema extends ZodSchemaObject> = [
  MultiStepFormState<ZodSchema>,
  React.Dispatch<MultiStepFormAction<ZodSchema>>
];

export type MultiStepFormContext<ZodSchema extends ZodSchemaObject> =
  React.Context<MultiStepFormReducer<ZodSchema>>;
