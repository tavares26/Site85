import { z } from "zod";
import { isValidCep } from "@/lib/commerce";

/** Brazilian states, used to keep the address step honest. */
export const UF = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
  "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const;

export const contactSchema = z.object({
  email: z.string().min(1, "Enter your email.").email("That email does not look right."),
  firstName: z.string().min(2, "Enter your first name."),
  lastName: z.string().min(2, "Enter your last name."),
  phone: z
    .string()
    .min(14, "Enter a phone as (00) 00000-0000.")
    .max(16, "That phone number is too long."),
  newsletter: z.boolean(),
});

export const addressSchema = z.object({
  cep: z.string().refine(isValidCep, "Enter a CEP as 00000-000."),
  street: z.string().min(3, "Enter the street."),
  number: z.string().min(1, "Enter the number."),
  complement: z.string().optional(),
  district: z.string().min(2, "Enter the district."),
  city: z.string().min(2, "Enter the city."),
  state: z.enum(UF, { message: "Choose a state." }),
});

export const paymentSchema = z.object({
  cardName: z.string().min(3, "Enter the name on the card."),
  cardNumber: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length === 16, "Enter all 16 digits."),
  expiry: z
    .string()
    .refine((v) => /^\d{2}\/\d{2}$/.test(v), "Enter the expiry as MM/YY.")
    .refine((v) => {
      const month = Number(v.slice(0, 2));
      return month >= 1 && month <= 12;
    }, "That month does not exist."),
  cvv: z.string().refine((v) => /^\d{3,4}$/.test(v), "Enter the 3 or 4 digit code."),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type AddressValues = z.infer<typeof addressSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;

/** Fills the payment step for the demo. Deliberately an invalid Luhn number. */
export const DEMO_CARD: PaymentValues = {
  cardName: "DEMO CLIENT",
  cardNumber: "4000 0085 0000 0085",
  expiry: "12/30",
  cvv: "085",
};
