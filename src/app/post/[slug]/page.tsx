import DeleteButton from "@/app/components/DeleteButton";
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CreateCommentForm from "./commentForm";
import DeleteCommentButton from "@/app/components/DeleteCommentsButton";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const supabase = createClient();

  // Fetch the post by slug
  const { data } = await supabase
    .from("posts")
    .select("id, title, content, user_id, users(email)")
    .eq("slug", params.slug);

  if (!data || data.length === 0) {
    notFound();
    return null;  // This prevents TypeScript from throwing the error
  }

  // Fetch authenticated user
  const { data: { user } = {} } = await supabase.auth.getUser();

  // Check if the user is the author
  const isAuthor = user && user.id === data[0].user_id;

  // Fetch comments
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", data[0].id);

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
          {comments && comments.length > 0 && (
            <div>
              <h4 className="bg-blue-500">Comments:</h4>
              {comments.map((comment, index) => (<>
                <p className="m-4 bg-slate-400" key={index}>{comment.content} by {comment.author_email}</p>
              <DeleteCommentButton commentId={comment.id} postId={data[0].id} />
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
