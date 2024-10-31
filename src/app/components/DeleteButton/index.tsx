"use client"

import deletePost from "../../../../actions/delete-post";

const DeleteButton = ({postId} :{postId:string}) => {
    return (
        <>
            <button onClick={()=>deletePost(postId)} className="bg-red-700 border-2 border-black hover:bg-red-400">delete</button>
        </>
    )
}

export default DeleteButton;