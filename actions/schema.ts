import {z} from "zod";

export const logInSchema= z.object({
    email: z.string().email(),
    password: z.string().min(3, "password must be longer of 3 characters")

})