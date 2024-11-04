import {z} from "zod";

export const logInSchema= z.object({
    email: z.string().email(),
    password: z.string().min(3, "password must be longer of 3 characters")

})

export const postSchema= z.object({
    title: z.string().min(3),
    content: z.string().optional(),
})

export const commentSchema= z.object({
    content: z.string()
})