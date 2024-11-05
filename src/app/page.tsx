


import { getHomePosts } from "../../utils/supabase/queries";
import PostsContainer from "./components/PostsContainer";
import SearchBar from "./components/SearchBar";



export default async function Home() {
  const {data,error}= await getHomePosts()
  
//MOVE CREATE POST IN HEADER
  return (
        <>
        
          <SearchBar />
          <PostsContainer initialPosts= {data}/>
        </>
    
  );
}
