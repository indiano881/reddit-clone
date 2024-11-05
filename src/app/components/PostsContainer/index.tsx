"use client"

import HomePost from "../PostHome";

export const revalidate= 60*15;

const PostsContainer = ({initialPosts}:{initialPosts:any}) => {
 
    return(
        <div className="flex flex-col items-center">
        {initialPosts.length===0 ? (
        <div>no posts availbale</div>
        ): (
            initialPosts.map((item:any, index:any)=> <div key={index}><HomePost post={item}/></div>)
        )}
        </div>
    )
}

export default PostsContainer;