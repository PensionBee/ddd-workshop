import { z } from "zod";
import { createMultiStepFormContext } from "../MultiStepForm";
import type {
  MultiStepFormStep,
  MultiStepFormState,
  MultiStepFormPartials,
} from "../MultiStepForm.types";

import { Step1 } from "./partials/Step1";
import { Step2 } from "./partials/Step2";
import { Step3 } from "./partials/Step3";

export type FormSchema = typeof formSchema;
export type FormStep = MultiStepFormStep<FormSchema>;
export type FormState = MultiStepFormState<FormSchema>;
export type FormPartials = MultiStepFormPartials<FormStep>;

// Multi-step form schema
export const formSchema = z.object({
  STEP_1: z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters"),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
  STEP_2: z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
  }),
  STEP_3: z
    .object({
      cardName: z.string().min(1),
      cardNumber: z.string().min(1),
      expiryDate: z.string().min(1),
      cvv: z.string(),
    })
    .refine(({ cardNumber, cvv }) => {
      if (!checkCardNumberValid(cardNumber)) {
        return {
          message: "Card number must be 16 digits",
          path: ["cardNumber"],
        };
      }
      if (!checkCvvValid(cvv)) {
        return {
          message: "CVV must be 3 digits",
          path: ["cvv"],
        };
      }
      return true;
    }),
});

// Refined validation helpers
const checkCardNumberValid = (cardNumber: string) => {
  const cardNumberRegex = new RegExp("^[0-9]{16}$");
  return cardNumberRegex.test(cardNumber);
};

const checkCvvValid = (cvv: string) => {
  const cvvRegex = new RegExp("^[0-9]{3}$");
  return cvvRegex.test(cvv);
};

// Initial Multi-step State
export const initialFormState: FormState = {
  step: "STEP_1",
  data: {
    STEP_1: {
      firstName: "Bob",
    },
  },
};

// Form partials
export const formPartials: FormPartials = {
  STEP_1: Step1,
  STEP_2: Step2,
  STEP_3: Step3,
};

// Multi-step Context
export const FormContext = createMultiStepFormContext(
  formSchema,
  initialFormState
);
