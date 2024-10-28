"use server"

import { createClient } from "../utils/supabase/server"

export const logIn= (formData: FormData) => {
    const supabase= createClient();

    const data= {
        email: formData.get("email") as string,
        password: formData.get
    }
}