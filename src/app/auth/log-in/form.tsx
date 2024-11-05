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

        <form onSubmit={handleSubmit((values) => mutate(values))} className="bg-orange-200 flex flex-col m-20 p-8 border-4 border-black items-center">
            <label htmlFor="email">Email</label>
            <input {...register("email")} name="email" id="email" required className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]"/>
            {errors.email && <p className="text-red-500 font-bold">{errors.email.message}</p>} 

            <label htmlFor="password">Password</label>
            <input {...register("password")} name="password" id="password" required className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]"/>
            {errors.password && <p className="text-red-500 font-bold">{errors.password.message}</p>}

            <button type="submit" className="border-2 border-black rounded-xl bg-green-500 hover:bg-green-200 w-[98%] sm:w-[75%] md:w-[20%]">{isPending ? "Logging in..." : "Log in"}</button>
            {error && <p className="text-red-500 font-bold">{error.message}</p>}
        </form>
    );
}
