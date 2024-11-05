

import { notFound } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";

import EditPostForm from "./form";

const EditPostPage = async({params}: {params: {slug: string}})=> {
    const supabase= createClient();

    const {data: post, error} = await supabase.from("posts").select("id, user_id, title, content").eq("slug", params.slug ).single()

    const {data: {user}}= await supabase.auth.getUser();

    const isAuthor= user && user.id===post?.user_id;
    
    if (error || !post || !isAuthor) notFound();

    return (
        <div>
            <EditPostForm defaultValues={{ title: post.title, content: post.content }} postId={post.id} />
        </div>
    )
}

export default EditPostPage;