


import { getHomePosts } from "../../utils/supabase/queries";
import PostsContainer from "./components/PostsContainer";
import SearchBar from "./components/SearchBar";
import UserHeader from "./components/userHeader";


export default async function Home() {
  const {data,error}= await getHomePosts()
  

  return (
        <>
        <UserHeader />
          <SearchBar />
          <PostsContainer initialPosts= {data}/>
        </>
    
  );
}
