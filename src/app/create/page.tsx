"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { createPostschema} from "../../../actions/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createPost from "../../../actions/create-post";

 const CreatePage=()=> {
    const {register, handleSubmit}= useForm<z.infer<typeof createPostschema>>({
        resolver: zodResolver(createPostschema)
    })

    return (
    <>
      <h1 className="bg-zinc-500">Create Page </h1>
      <form onSubmit={handleSubmit((values)=>createPost(values))} className="flex w-full flex-col gap-4 m-20 bg-orange-800 border-2 border-black">
        <label htmlFor="title">title</label>
        <input type="text" id="title" {...register("title")}/>
        <label htmlFor="content">content</label>
        <input type="text" id="content"{...register("content")} />
        <button type="submit" className="bg-purple-400">Create Post</button>
      </form>
    </>
    
    
  )
}

export default CreatePage;