"use client"

import { deleteChunks } from "@supabase/ssr";
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
            <button onClick={()=>mutate()} className="bg-red-700 border-2 border-black hover:bg-red-400">delete</button>
        </>
    )
}

export default DeleteCommentButton;