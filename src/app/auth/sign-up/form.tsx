"use client"

import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../../../actions/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUpSchema } from "../../../../actions/schema"
import { toast } from "sonner"

export const SignUpForm = () => {
    const { mutate, error, isPending } = useMutation({
        mutationFn: signUp,
        onError: (error)=>toast.error(error.message),
        onSuccess:()=> toast.success("Sign up completed")
    });
    
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    });

    console.log(errors);

    return (
        <form onSubmit={handleSubmit((data) => {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);
            mutate(formData);
        })} className="bg-orange-100 flex flex-col m-20 p-8 border-4 border-black items-center">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                {...register("email")}
                id="email"
                required
                className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%] md:w-[50%]"
            />
            {errors.email && <p className="text-red-500 font-bold">{errors.email.message}</p>}

            <label htmlFor="password">Password</label>
            <input
                type="password"
                {...register("password")}
                id="password"
                required
                className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%] md:w-[50%]"
            />
            {errors.password && <p className="text-red-500 font-bold">{errors.password.message}</p>}

            <button type="submit" className="border-2 border-black rounded-xl bg-green-500 hover:bg-green-200 w-[98%] sm:w-[75%] md:w-[20%]">
                Sign Up
            </button>
        </form>
    );
};
