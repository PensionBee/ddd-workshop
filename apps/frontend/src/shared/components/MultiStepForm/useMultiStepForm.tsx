import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { type DeepPartial, useForm } from "react-hook-form";
import type { z } from "zod";
import type {
  MultiStepFormAction,
  MultiStepFormState,
  ZodSchemaObject,
} from "./MultiStepForm.types";

export const useMultiStepForm = <
  PartialSchema extends ZodSchemaObject | z.ZodEffects<ZodSchemaObject>,
  FormZodSchema extends ZodSchemaObject
>(
  _formSchema: FormZodSchema,
  partialSchema: PartialSchema,
  FormContext: React.Context<
    [
      MultiStepFormState<FormZodSchema>,
      React.Dispatch<MultiStepFormAction<FormZodSchema>>
    ]
  >
) => {
  const [{ step, data }, dispatch] = useContext(FormContext);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState<string[] | null>(
    null
  );

  type FormData = z.infer<PartialSchema>;

  const form = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(partialSchema),
    defaultValues: data[step] as DeepPartial<FormData>,
  });

  const handleSetState = async (formData: FormData) => {
    const payload = { [step]: formData } as DeepPartial<z.infer<FormZodSchema>>;
    return dispatch({
      type: "SET_STAGE_STATE",
      payload,
    });
  };

  const handleSetStep = async (
    step: MultiStepFormState<FormZodSchema>["step"]
  ) => {
    return dispatch({ type: "SET_STAGE", payload: step });
  };

  const createSubmitHandler = (
    onSubmit: (formData: FormData) => Promise<unknown>
  ) => {
    return form.handleSubmit(async (formData) => {
      if (isFormLoading) return;
      setIsFormLoading(true);
      setSubmissionErrors(null);
      try {
        handleSetState(formData);
        return onSubmit(formData);
      } catch (error) {
        console.error(error);
        setSubmissionErrors(["Something went wrong!"]);
      } finally {
        setIsFormLoading(false);
      }
    });
  };

  return {
    ...form,
    isFormLoading,
    submissionErrors,
    data,
    handleSetState,
    handleSetStep,
    createSubmitHandler,
  };
};
