"use server"

import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { commentSchema } from "./schema";
import { z } from "zod";

const createComment = async (data: z.infer<typeof commentSchema>, postId:string) => {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    if (!user.email) {
        throw new Error("User email is required but not available");
    }


    const { error } = await supabase
        .from("comments")
        .insert([
            {
                content: data.content,
                user_id: user.id,         
                author_email: user.email,
                post_id: postId
               
                
            }
        ])
        .throwOnError();

    if (error) {
        throw error;
    }

    revalidatePath("/");
};

export default createComment;
