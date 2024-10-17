
import Link from "next/link";
import { getHomePosts } from "../../../../utils/supabase/queries";

const HomePost = ({post}:{post:any}) => {

  
    return(
        <div className="bg-blue-400 min-h-10 m-10 pl-20">
        <Link href={`/post/${post.slug}`}>
        <h1>{post.title}</h1>
        <h3>slug={post.slug}</h3>
        <h2>{post.id}</h2>
        {post.users.email ? <h6>{post.users.email}</h6> : <h6>Anonymous user</h6>}
        
        </Link>
        </div>
    )
}

export default HomePost;