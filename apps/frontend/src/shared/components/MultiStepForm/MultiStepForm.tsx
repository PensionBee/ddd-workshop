/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";
import type { z } from "zod";
import type {
  ZodSchemaObject,
  MultiStepFormStep,
  MultiStepFormState,
  MultiStepFormPartials,
  MultiStepFormReducer,
  MultiStepFormContext,
  MultiStepFormAction,
  MultiStepFormInferredState,
} from "./MultiStepForm.types";

export const multiStepFormReducer = <
  ZodSchema extends ZodSchemaObject,
  FormState extends MultiStepFormInferredState<
    MultiStepFormStep<ZodSchema>,
    ZodSchema
  >
>(
  state: FormState,
  action: MultiStepFormAction<ZodSchema>
) => {
  switch (action.type) {
    case "SET_STAGE":
      return {
        ...state,
        step: action.payload,
      };
    case "SET_STAGE_STATE":
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export type MultiStepFormProps<FormSchema extends z.AnyZodObject> = {
  _schema: FormSchema;
  Context: MultiStepFormContext<FormSchema>;
  partials: MultiStepFormPartials<MultiStepFormStep<FormSchema>>;
  initialState: MultiStepFormState<FormSchema>;
};

export const createMultiStepFormContext = <FormSchema extends z.AnyZodObject>(
  _formSchema: FormSchema,
  initialState: MultiStepFormState<FormSchema>
) =>
  createContext<MultiStepFormReducer<FormSchema>>([initialState, () => null]);

export const MultiStepForm = <FormSchema extends z.AnyZodObject>({
  _schema, // Required to infer the type of the form schema
  Context,
  partials,
  initialState,
}: MultiStepFormProps<FormSchema>) => {
  const reducer = multiStepFormReducer<
    FormSchema,
    MultiStepFormState<FormSchema>
  >;
  const [multiStepFormState, dispatch] = useReducer(reducer, initialState);
  const Partial = partials[multiStepFormState.step] as React.FC;

  return (
    <Context.Provider value={[multiStepFormState, dispatch]}>
      <Partial />
    </Context.Provider>
  );
};
