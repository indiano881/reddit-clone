import Link from "next/link";

interface PostType {
    title: string;
    slug: string;
    id: string | number;
    users: { email?: string | null | undefined } | null;
  }

const HomePost = ({post}:{post:PostType}) => {

  
    return(
        <div className="flex flex-col bg-white w-[300px] sm:w-[500px] md:w-[600px] min-h-10 m-4 pl-4 md:pl-20 rounded-2xl border-slate-300 border-2 hover:border-black">
            <Link href={`/post/${post.slug}`}>
                <h1 className="text-2xl p-2">{post.title}</h1>
                {post.users?.email ? <h6 className="p-2">{post.users.email}</h6> : <h6>Anonymous user</h6>}
            </Link>
        </div>
    )
}

export default HomePost;