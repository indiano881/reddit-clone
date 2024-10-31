"use server"

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";

const deletePost= async (postId: string) => {
    const supabase= createClient();

    const {error}=await supabase.from("posts").delete().eq("id", postId)
    if (error) {
        throw error
    }

    revalidatePath("/")
    redirect("/")
}

export default deletePost;