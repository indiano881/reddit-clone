"use client"
import { useQuery } from "@tanstack/react-query";
import HomePost from "../PostHome";
import { getHomePosts } from "../../../../utils/supabase/queries";
import { revalidatePath } from "next/cache";

export const revalidate= 60*15;

const PostsContainer = ({initialPosts}:{initialPosts:any}) => {
 
   
    return(
        <>
        {initialPosts.length===0 ? (
        <div>no posts availbale</div>
        ): (
            initialPosts.map((item:any, index:any)=> <div key={index}><HomePost post={item}/></div>)
        )}
        </>
    )
}

export default PostsContainer;