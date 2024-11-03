
import DeleteButton from "@/app/components/DeleteButton";
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";


const  SinglePost = async ({params}:{params: {slug: string}})=> {
    
    const supabase= createClient();
    const {data}= await supabase
    .from("posts")
    .select('id,title, content, user_id, users("email")')
    .eq('slug',params.slug)
    

    if (!data) notFound()

        const {data: {user}} = await supabase.auth.getUser();

        const isAuthor= user && user.id===data[0].user_id
    return (
        <div className="m-20 bg-yellow-200">
        <h2>Page single article</h2>
        {data ? (
            <div>
                <h4>{data[0].title}</h4>
                <h4>{data[0].content}</h4>
                <h4>{data[0].users?.email}</h4>
                {isAuthor && <Link href={`/post/${params.slug}/edit`}>Edit post</Link>}
                {isAuthor && <DeleteButton postId={data[0].id} />}
            </div>
        ): (<h5>post no visible </h5>)}
        
        </div>
    )
}

export default SinglePost;