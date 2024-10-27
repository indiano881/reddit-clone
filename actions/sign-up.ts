"use server"

import { createClient } from "../utils/supabase/server";

export const signUp = async (formData: FormData) => {
    const data= {
        //referes to name in the form
        email: formData.get("email") as string, //type casting
        password: formData.get("password") as string
    }
    //after getting the dta we need to send the data

    const supabase = createClient();

    const {data: {user}, error}= await supabase.auth.signUp(data);
    
    if (user && user.email) {
        await supabase.from("users").insert([{id: user.id, email: user.email }])
        console.log({data, error})
    }

   

}