"use client"

import { useMutation } from "@tanstack/react-query";
import deletePost from "../../../../actions/delete-post";

const DeleteButton = ({postId} :{postId:string}) => {

    const {mutate}= useMutation({mutationFn:()=>deletePost(postId)})
    return (
        <>
            <button onClick={()=>mutate()} className="bg-red-700 border-2 border-black hover:bg-red-400">delete</button>
        </>
    )
}

export default DeleteButton;