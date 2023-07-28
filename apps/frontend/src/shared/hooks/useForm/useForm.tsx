import { useState } from "react";
import { useForm as useRHFForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import type { UseMutationResult } from "@tanstack/react-query";

export const useForm = <T extends z.ZodTypeAny>(
  schema: T,
  mutation: UseMutationResult
) => {
  type Schema = z.infer<typeof schema>;
  const [submissionErrors, setSubmissionErrors] = useState<string[] | null>(
    null
  );

  const form = useRHFForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const isFormSubmissionDisabled =
    mutation.isLoading || !form.formState.isValid;

  const handlePostSubmission: SubmitHandler<Schema> = async (formData) => {
    if (isFormSubmissionDisabled) {
      return;
    }
    setSubmissionErrors(null);
    try {
      const payload: Schema = {
        ...formData,
      };
      mutation.mutate(payload);
    } catch (error) {
      setSubmissionErrors(["Something went wrong!"]); // TODO: extract API response errors (with 'Something went wrong!' as the default)
    }
  };

  return {
    /**
     * TODO: Description needed
     *
     * @example
     * TODO: Add example
     */
    control: form.control,
    /**
     * Registers an input field so it can be validated/controlled by this hook. Note that name registered must match one of the fields defined in the form schema
     *
     * @example
     * <TextField
     *   registerInput('email')
     *   {...props}
     * />
     * <SelectInput
     *   registerInput('gender')
     *   {...props}
     * />
     */
    registerInput: form.register,
    /**
     * Form submission handler - calls the useMutation function used to initialise this hook
     *
     * @example
     * <form onSubmit={handleFormSubmit} >
     *   <TextField
     *     registerInput('email')
     *     {...props}
     *   />
     *   <Button type='sumbit'>
     *     Submit
     *   </Button>
     * </form>
     */
    handleFormSubmit: form.handleSubmit(handlePostSubmission),
    /**
     * An object containing the validation errors for each registered input, if any. Errors are generated based on the schema definition used to initialise this hook
     *
     * @example
     * <TextField
     *   registerInput('email')
     *   error={validationErrors.email.messages}
     *   {...props}
     * />
     */
    validationErrors: form.formState.errors,
    /**
     * Defines whether a form is in a state to be submitted or not - useful for implementing visual feedback on a form, e.g. disabling a button
     *
     * @example
     * <form onSubmit={handleFormSubmit} >
     *   ...
     *   <Button type='sumbit' isDisabled={isFormSubmissionDisabled}>
     *     Submit
     *   </Button>
     * </form>
     */
    isFormSubmissionDisabled,
    /**
     * Defines if a POST submission is in progress (i.e. the form has been submitted but the result is not yet defined) - useful for implementing visual feedback on a form, e.g. rendering a spinner
     *
     * @example
     * TODO: Add example
     */
    isSubmitting: mutation.isLoading,
    /**
     * An object containing errors resulting from the form submission, if any.
     *
     * @example
     * <form onSubmit={handleFormSubmit} >
     *  <TextField ... />
     *  <Button ... >Submit</Button>
     *  {submissionErrors && <BodyLarge>{submissionErrors}</BodyLarge>}
     * </form>
     */
    submissionErrors: submissionErrors,
  };
};
