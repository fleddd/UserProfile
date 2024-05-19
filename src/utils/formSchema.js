import { z } from "zod"

export const formSchema = z.object({
  firstName: z
    .string()
    .max(25, "First name should be no longer than 25 symbols!")
    .regex(/^[A-Za-z]+$/, "Name should contain only alphabets"),
  middleName: z
    .string()
    .max(25, "Middle name should be no longer than 25 symbols!")
    .regex(/^[A-Za-z]+$/, "Name should contain only alphabets"),
  lastName: z
    .string()
    .max(25, "Last name should be no longer than 25 symbols!"),
  date: z.string().date().max(new Date("2006-01-01"), {
    message: "You have to be at least 18 years old!",
  }),
  desc: z
    .string()
    .max(1024, "The description should not contain more than 1024 symbols!"),
  role: z.string(),
})
export const loginSchema = z.object({
  email: z.string().max(50, "Email should be no longer than 50 symbols!"),
  password: z.string().min(8, "Password should at least 8 symbols!"),
})
export const registerSchema = z
  .object({
    email: z.string().max(50, "Email should be no longer than 50 symbols!"),
    password: z.string().min(8, "Password should at least 8 symbols!"),
    confirmedPassword: z.string().min(8, "Password should at least 8 symbols!"),
  })
  .refine((data) => data.confirmedPassword === data.password, {
    path: ["confirmedPassword"],
    message: "Passwords don't match!",
  })

export const profileSchema = z.object({
  email: z.string().max(50, "Email should be no longer than 50 symbols!"),
  password: z.string().min(8, "Password should at least 8 symbols!"),
  newEmail: z.string().max(50, "Email should be no longer than 50 symbols!"),
})
