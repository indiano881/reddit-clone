"use client"

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import deleteComments from "../../../../actions/delete-comments";

const DeleteCommentButton = ({commentId, postId} :{commentId:number, postId:string}) => {

    const {mutate}= useMutation({
        mutationFn:()=>deleteComments(commentId, postId), 
        onError: (error)=> toast.error(error.message),
        onSuccess: ()=> toast.success("Your post was deleted"),
        onMutate: ()=>toast.loading("Deleting..."),
        onSettled: ()=>toast.dismiss(),
    })

    return (
        <>
            <button onClick={()=>mutate()} className="bg-red-600 border-2 border-black hover:bg-red-400 rounded-xl px-2 my-4">Delete comment</button>
        </>
    )
}

export default DeleteCommentButton;