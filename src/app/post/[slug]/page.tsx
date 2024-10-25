
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";


const  SinglePost = async ({params}:{params: {slug: string}})=> {
    
    const supabase= createClient();
    const {data}= await supabase
    .from("posts")
    .select('title, content, users("email")')
    .eq('slug',params.slug)
    console.log(data)

    if (!data) notFound()
    return (
        <div className="m-20 bg-yellow-200">
        <h2>Page single article</h2>
        {data ? (
            <div><h4>{data[0].title}</h4>
            <h4>{data[0].content}</h4>
            <h4>{data[0].users?.email}</h4></div>
        ): (<h5>post no visible </h5>)}
        
        </div>
    )
}

export default SinglePost;