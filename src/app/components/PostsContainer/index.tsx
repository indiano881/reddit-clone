"use client"
import { useQuery } from "@tanstack/react-query";
import HomePost from "../PostHome";
import { getHomePosts } from "../../../../utils/supabase/queries";


const PostsContainer = ({initialData}:{initialData:any}) => {

   const {data}=useQuery({
    queryKey: ['home-posts'],
    queryFn: async () => {
        const {data,error}= await getHomePosts()

        if (error) throw error
        return data
    }
   })
  
   
    return(
        <>
        {initialData.length===0 ? (
        <div>no posts availbale</div>
        ): (
            initialData.map((item:any, index:any)=> <div key={index}><HomePost post={item}/></div>)
        )}
        </>
    )
}

export default PostsContainer;