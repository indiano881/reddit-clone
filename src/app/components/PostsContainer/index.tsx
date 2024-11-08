"use client"

import { useState, useEffect } from "react";
import HomePost from "../PostHome";
import SearchBar from "../SearchBar";

export const revalidate = 60 * 15;

const PostsContainer = ({ initialPosts }: { initialPosts: any }) => {
    const [searchInput, setSearchInput] = useState(""); 
    const [filteredPosts, setFilteredPosts] = useState(initialPosts); 
   
    useEffect(() => {
        if (searchInput.trim() === "") {
            setFilteredPosts(initialPosts);
        } else {
            setFilteredPosts(
                initialPosts.filter((post: any) =>
                    post.title.toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        }
    }, [searchInput, initialPosts]); 

    return (
        <div className="flex flex-col items-center">
            <SearchBar setSearch={setSearchInput} search={searchInput} />
            {filteredPosts.length === 0 ? (
                <div>No posts available</div>
            ) : (
                filteredPosts.map((item: any, index: any) => (
                    <div key={index}>
                        <HomePost post={item} />
                    </div>
                ))
            )}
        </div>
    );
};

export default PostsContainer;
