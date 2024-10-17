import { type QueryData } from "@supabase/supabase-js";
import { createClient } from "./client";

export const getHomePosts= async ()=>{
    const supabase= createClient();
    return supabase
    .from("posts")
    .select('id, title, slug, users("email")') //add content here or only after you click?
    .order("created_at", {ascending:true})
}

export type HomePostType= QueryData<ReturnType<typeof getHomePosts>>;//to take the data we return