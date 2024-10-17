
import Link from "next/link";
import { getHomePosts } from "../../../../utils/supabase/queries";

const HomePost = ({post}:{post:any}) => {

  
    return(
        <div className="bg-blue-400 min-h-10 m-10 pl-20">
        <Link href={""}>
        <h1>{post.title}</h1>
        <h3>slug=>{post.slug}</h3>
        <h2>{post.id}</h2>
        <h6>{post.users.email}</h6>
        </Link>
        </div>
    )
}

export default HomePost;