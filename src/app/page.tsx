import { createClient } from "../../utils/supabase/client";
import { getHomePosts } from "../../utils/supabase/queries";
import HomePost from "./components/PostHome";


export default async function Home() {
  const {data,error}= await getHomePosts()
  console.log({data, error})
  return (
    <h1 className="text-5xl">
      
      connected
      
      {error|| data.length===0 ? (
        <div>no posts availbale</div>
        ): (
        data.map((item, index)=> <HomePost post={...item} key={index}/>)
        )}
      </h1>
  );
}
