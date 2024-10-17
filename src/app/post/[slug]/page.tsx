import { createClient } from "../../../../utils/supabase/client";


const  SinglePost = async ({params}:{params: {slug: string}})=> {
    
    const supabase= createClient();
    const {data}= await supabase
    .from("posts")
    .select('*')
    .eq('slug',params.slug)
    console.log(data)
    return (
        <>
        <h2>Page single article</h2>
        <h4></h4>
        </>
    )
}

export default SinglePost;