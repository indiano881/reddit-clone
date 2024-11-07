"use client";

import { TextField } from "@mui/material";
import { getPostByQuery } from "../../../../utils/supabase/queries";
import { useState, useEffect } from "react";

const SearchBar = ({ setSearch, search }: { setSearch: (value: string) => void, search: string }) => {
    const [inputValue, setInputValue] = useState(search);

    // Debounce logic: Update the `setSearch` only after user stops typing for 300ms
    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue.trim() !== "") {
                setSearch(inputValue);
                fetchPosts(inputValue);
            } else {
                setSearch(""); // Reset if input is empty
            }
        }, 300); // 300ms delay

        return () => {
            clearTimeout(handler); 
        };
    }, [inputValue]);

    
    const fetchPosts = async (query: string) => {
        try {
            const { data } = await getPostByQuery(query);
            console.log(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="m-20">
            <TextField
                fullWidth
                id="outlined-controlled"
                label="Search"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;

