import { getHomePosts } from "../../utils/supabase/queries";
import PostsContainer from "./components/PostsContainer";

export default async function Home() {
  const {data}= await getHomePosts()
  
  return (
        <div className="mt-8">
          <PostsContainer initialPosts= {data}/>
        </div>
  );
}
