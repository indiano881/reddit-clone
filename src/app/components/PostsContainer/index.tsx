import { getHomePosts } from "../../../../utils/supabase/queries";
import HomePost from "../PostHome";


const PostsContainer = async() => {

    const {data,error}= await getHomePosts()
  
    console.log({data, error})
    return(
        <>
        {error|| data.length===0 ? (
        <div>no posts availbale</div>
        ): (
        data.map((item, index)=> <div key={index}><HomePost post={item}/></div>)
        )}
        </>
    )
}

export default PostsContainer;