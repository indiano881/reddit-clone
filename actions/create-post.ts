"use server"

import { z } from "zod";
import { createClient } from "../utils/supabase/server"
import { postSchema } from "./schema";
import { slugify } from "../utils/slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createPost= async (data: z.infer<typeof postSchema>) => {
    //the .parse is zod´s method both validates and transforms the data object according to the rules in postSchema. If data doesn’t meet the schema’s requirements, .parse will throw an error; if it passes, it will return data, potentially in a transformed form.
    const parsedData= postSchema.parse(data);

    const supabase= createClient();

    const {data: {user}}= await supabase.auth.getUser();

    if(!user) {
        throw new Error("not authenticathed")
    }

    const {error}=await supabase
    .from("posts")
    .insert([
        {
            ...parsedData,
            user_id: user.id,
            slug: slugify(parsedData.title) + "-" +user.id.slice(0, 8),
            content: parsedData.content ?? "", // Provide a default empty string if content is undefined
        },
    ])
    .throwOnError();

    revalidatePath("/")
    redirect("/")
}

export default createPost;