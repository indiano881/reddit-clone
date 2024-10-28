"use server"

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server"
import { logInSchema } from "./schema";

export const logIn= async (formData: FormData) => {
    const supabase= createClient();

    const data= {
        email: formData.get("email"),
        password: formData.get("password")
    }
    const parsedData= logInSchema.parse(data);
    const {error}= await supabase.auth.signInWithPassword(parsedData)
    if (error) {
       throw error
    }
    redirect("/");
}