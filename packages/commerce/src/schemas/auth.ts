import { z } from 'zod'

export const loginBodySchema = z.object({
  redirectTo: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
})

export const logoutBodySchema = z.object({
  redirectTo: z.string().optional(),
})

export const signupBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
})
