"use client"

import { useMutation } from "@tanstack/react-query";
import deletePost from "../../../../actions/delete-post";
import { toast } from "sonner";

const DeleteButton = ({postId} :{postId:string}) => {

    const {mutate}= useMutation({
        mutationFn:()=>deletePost(postId), 
        onError: (error)=> toast(error.message),
        onSuccess: ()=> toast("Your post was deleted"),

    })

    return (
        <>
            <button onClick={()=>mutate()} className="bg-red-700 border-2 border-black hover:bg-red-400">delete</button>
        </>
    )
}

export default DeleteButton;