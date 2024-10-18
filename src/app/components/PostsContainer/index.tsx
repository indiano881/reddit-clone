"use client"
import { useQuery } from "@tanstack/react-query";
import HomePost from "../PostHome";
import { getHomePosts } from "../../../../utils/supabase/queries";


const PostsContainer = ({initialPosts}:{initialPosts:any}) => {

   const {data}=useQuery({
    queryKey: ['home-posts'],
    queryFn: async () => {
        const {data,error}= await getHomePosts()

        if (error) throw error
        return data
    },
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 1000*60*5,
    refetchOnWindowFocus: true //5 minuter
   })
 
   
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