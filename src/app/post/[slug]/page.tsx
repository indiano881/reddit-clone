import DeleteButton from "@/app/components/DeleteButton";
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CreateCommentForm from "./commentForm";
import DeleteCommentButton from "@/app/components/DeleteCommentsButton";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const supabase = createClient();

 
  const { data } = await supabase
    .from("posts")
    .select("id, title, content, user_id, users(email)")
    .eq("slug", params.slug);

  if (!data || data.length === 0) {
    notFound();
    return null;  
  }

  
  const { data: { user } = {} } = await supabase.auth.getUser();

  
  const isAuthor = user && user.id === data[0].user_id;

 
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", data[0].id);

  return (
    <div className="flex flex-col bg-white m-4 pl-20 rounded-2xl  border-2 border-black">
      {data ? (
        <div >
          <h1 className="text-3xl py-8 font-semibold">{data[0].title}</h1>
          <h4 className="text-2xl py-4">{data[0].content}</h4>
          <h4 className="text-xl py-4">A post by: {data[0].users?.email}</h4>
          {isAuthor && <Link href={`/post/${params.slug}/edit`} className="bg-[#188331] ] my-4 mr-8 p-4 rounded-xl hover:bg-green-500 border-2 border-black">Edit post</Link>}
          {isAuthor && <DeleteButton postId={data[0].id} />}
          {comments && comments.length > 0 && (
            <div className="my-8">
              <h4 className="text-2xl">Comments:</h4>
              {comments.map((comment, index) => (<>
                <div className="my-4 mr-2 border-2 border-black rounded-xl px-4" key={index}>
                  <p className="text-lg">{comment.content}</p>
                  <p className="italic">by {comment.author_email}</p>
                  <DeleteCommentButton commentId={comment.id} postId={data[0].id} />
              </div>
              </>
                
              ))}
            </div>
          )}
        </div>
      ) : (
        <h5>Post not visible</h5>
      )}
      {user && <CreateCommentForm postId={data[0].id}/>}
    </div>
  );
};

export default SinglePost;
