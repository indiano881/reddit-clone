"use server"

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server"


const deleteComments= async(commentId: number, postId: string) => {
    const supabase= createClient();
    const {data: {user}}= await supabase.auth.getUser()
    const {data: commentAuthor} = await supabase.from("comments").select("user_id").eq("id", commentId).single();
   // const {data: postAuthor}= await supabase.from("posts").select("user_id").eq("id", postId).single();

    //const isAuthorPost= user && user.id=== postAuthor?.user_id;
    const isAuthorComment= user && user.id=== commentAuthor?.user_id;
/*
    if (!isAuthorPost && !isAuthorComment) {
        throw new Error ("you are not allowed to delete this post!")
    }*/

    const {error}=await supabase.from("comments").delete().eq("id", commentId)
    console.log("commentid"+commentId)
    if (error) {
        throw error
    }
    revalidatePath("/")
}

export default deleteComments;