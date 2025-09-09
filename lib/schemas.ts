import { z } from 'zod';

const today = new Date();
const minBirthDate = new Date('1900-01-01');

export const orderSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }).max(100),
  dob: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date >= minBirthDate && date <= today;
  }, {
    message: 'Please enter a valid date of birth between 1900 and today.',
  }),
  birthplace: z.string().min(1, { message: 'Birthplace is required.' }).max(100),
  q1: z.string().min(1, { message: 'Question 1 is required.' }).max(500),
  q2: z.string().max(500).optional(),
  q3: z.string().max(500).optional(),
  cardPulls: z.string().max(200).optional(),
  lang: z.literal('en').default('en'),
  product: z.literal('three').default('three'),
});

export type OrderFormData = z.infer<typeof orderSchema>;
