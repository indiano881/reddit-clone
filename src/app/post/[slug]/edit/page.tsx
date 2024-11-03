

import { notFound } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";

import EditPostForm from "./form";

const EditPostPage = async({params}: {params: {slug: string}})=> {
    const supabase= createClient();

    const {data: post, error} = await supabase.from("posts").select("user_id, title, content").eq("slug", params.slug ).single()

    const {data: {user}}= await supabase.auth.getUser();

    const isAuthor= user && user.id===post?.user_id;
    
    if (error || !post || !isAuthor) notFound();

    return (
        <div>
            <h1 className="bg-orange-500">Edit page</h1>
            <EditPostForm defaultValues={{title: post.title, content: post.content}} />
        </div>
    )
}

export default EditPostPage;