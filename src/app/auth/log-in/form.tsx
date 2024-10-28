"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "../../../../actions/log-in"
import {useForm} from "react-hook-form";
import { logInSchema } from "../../../../actions/schema";
import { z } from "zod";

export const LogInForm = () => {
    const {register, handleSubmit} = useForm<z.infer<typeof logInSchema>>({
        resolver: zodResolver(logInSchema)
    })


    return (
        <form onSubmit={handleSubmit((values)=> logIn(values) )} className="bg-pink-400 flex flex-col m-20 p-8 border-4 w-[50%]">
        <label htmlFor="email">Email</label>
        <input {...register("email")} name="email" id="email" required />

        <label htmlFor="password">Password</label>
        <input {...register("password")} name="password" id="password" required />

        <button type="submit">Log in</button>
    </form>
    )
}