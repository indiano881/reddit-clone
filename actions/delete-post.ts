"use server"

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";

const deletePost= async (postId: string, authorId:string) => {
    const supabase= createClient();
   
    const {data: post}= await supabase.from("posts").select("user_id").eq("id", postId).single();
    const {data: {user}}= await supabase.auth.getUser()

    const isAuthor= user && user.id=== post?.user_id;

    if (!isAuthor) {
        throw new Error ("you are not allowed to delete this post!")
    }

    const {error}=await supabase.from("posts").delete().eq("id", postId)

    if (error) {
        throw error
    }

    revalidatePath("/")
    redirect("/")
}

export default deletePost;