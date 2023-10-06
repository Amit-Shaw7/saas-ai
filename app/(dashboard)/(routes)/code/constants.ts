import * as z from "zod";

export const formSchema = z.object({
    prompt: z
        .string().min(1, { message: "Prompt is required" }),
});

export const signupSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Enter a valid name." }),
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("Enter a valid email."),
    password: z
        .string()
        .min(6, { message: "Must be atleast 6 characters." }),
})

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("Enter a valid email."),
    password: z
        .string()
        .min(6, { message: "Must be atleast 6 characters." }),
})