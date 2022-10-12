import { z } from 'zod'

export const loginBodySchema = z.object({
  redirectTo: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(7),
})

export const logoutBodySchema = z.object({
  redirectTo: z.string().optional(),
})

export const signupBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(7),
})
