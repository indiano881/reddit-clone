


import { getHomePosts } from "../../utils/supabase/queries";
import PostsContainer from "./components/PostsContainer";


export default async function Home() {
  const {data,error}= await getHomePosts()
  
  console.log({data, error})
  return (
        <>
          <h1 className="text-5xl">connected</h1>
          <PostsContainer initialPosts= {data}/>
        </>
    
  );
}
