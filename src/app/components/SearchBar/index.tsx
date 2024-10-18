"use client";


import { TextField } from "@mui/material";
import { getPostByQuery } from "../../../../utils/supabase/queries";
import { useState } from "react";

const SearchBar = () => {
  
    const [search, setSearch]= useState<string>("")
    

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value)

        try {
            const { data } = await getPostByQuery(value);
            console.log(data);
            
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div className="m-20">
            <TextField
        fullWidth
        id="outlined-controlled"
        label="Search"
        value={search}
        onChange={handleSearchChange}
    /></div>
        
    );
};

export default SearchBar;
