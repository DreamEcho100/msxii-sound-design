import { z } from "zod";

export const customerAccessTokenCreateInputSchema = {
  email: z.string().email(),
  password: z.string().min(5),
};

export const customerUpdateSchema = {
  acceptsMarketing: z.boolean().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
};
export const customerCreateAddressSchema = {
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  zip: z.string().optional(),
};
export const customerUpdateAddressSchema = {
  id: z.string(),

  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  zip: z.string().optional(),
};
