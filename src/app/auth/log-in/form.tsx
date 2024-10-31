"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "../../../../actions/log-in";
import { useForm } from "react-hook-form";
import { logInSchema } from "../../../../actions/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

export const LogInForm = () => {

    const {mutate, error, isPending}= useMutation({
        mutationFn: logIn
    })
  
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof logInSchema>>({
        resolver: zodResolver(logInSchema)
    });

    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className="bg-pink-400 flex flex-col m-20 p-8 border-4 w-[50%]">
            <label htmlFor="email">Email</label>
            <input {...register("email")} name="email" id="email" required />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>} 

            <label htmlFor="password">Password</label>
            <input {...register("password")} name="password" id="password" required />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit">{isPending ? "Logging in..." : "Log in"}</button>
            {error && <p className="text-red-500">{error.message}</p>}
        </form>
    );
}
