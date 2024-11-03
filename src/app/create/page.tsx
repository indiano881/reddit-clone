"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { createPostschema} from "../../../actions/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createPost from "../../../actions/create-post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

 const CreatePage=()=> {
    const {mutate, error, isPending}= useMutation({
        mutationFn: createPost,
        onError: (error)=>toast.error(error.message),
        onSuccess:()=> toast.success("Post created")
    }) 

    const {register, handleSubmit, formState: {errors}}= useForm<z.infer<typeof createPostschema>>({
        resolver: zodResolver(createPostschema)
    })

    return (
    <>
      <h1 className="bg-zinc-500">Create Page </h1>
      <form onSubmit={handleSubmit((values)=>mutate(values))} className="flex w-full flex-col gap-4 m-20 bg-orange-800 border-2 border-black">
        <label htmlFor="title">title</label>
        <input type="text" id="title" {...register("title")}  />
        {errors.title && <p> {errors.title.message}</p>}
        <label htmlFor="content">content</label>
        {errors.content && <p> {errors.content.message}</p>}
        <input type="text" id="content"{...register("content")} />
        <button type="submit" className="bg-purple-400">{isPending? "Uploading Post" : "Create Post"}</button>
      </form>
    </>
    
    
  )
}

export default CreatePage;