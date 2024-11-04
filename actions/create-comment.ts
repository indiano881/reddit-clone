"use server"

import { z } from "zod"
import { commentSchema } from "./schema"
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";

const createComment = async (formData: FormData) => {
    const data = {
        content: formData.get("content") as string,
    };

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
            }
        ])
        .throwOnError();

    if (error) {
        throw error;
    }

    revalidatePath("/");
};

export default createComment;
