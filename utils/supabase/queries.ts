import { createClient } from "./client";

export const getHomePosts= async ()=>{
    const supabase= createClient();
    return supabase
    .from("posts")
    .select('id, title, slug, users("email")') //add content here or only after you click?
    .order("created_at", {ascending:true})
}