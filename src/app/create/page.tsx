"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema} from "../../../actions/schema";
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

    const {register, handleSubmit, formState: {errors}}= useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema)
    })

    return (
    <>
      
      <form onSubmit={handleSubmit((values)=>mutate(values))} className="bg-orange-600 flex flex-col m-20 p-8 border-4 border-black items-center">
        <h1 className="font-bold text-xl">Create Page </h1>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" {...register("title")} className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]" />
        {errors.title && <p> {errors.title.message}</p>}
        <label htmlFor="content">Content</label>
        {errors.content && <p> {errors.content.message}</p>}
        <input type="text" id="content"{...register("content")} className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]"/>
        <button type="submit" className="border-2 border-black rounded-xl bg-green-500 hover:bg-green-200 w-[98%] sm:w-[75%] md:w-[20%]">{isPending? "Uploading Post" : "Create Post"}</button>
      </form>
    </>
    
    
  )
}

export default CreatePage;