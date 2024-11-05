"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../actions/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type Tables } from "../../../../../utils/supabase/database.types";
import { useMutation } from "@tanstack/react-query";
import { editPost } from "../../../../../actions/edit-post";
import { error } from "console";
import { toast } from "sonner";

const EditPostForm = ({defaultValues, postId}: {defaultValues: Pick<Tables<"posts">, "title" | "content">, postId: string})=> {

    const {mutate, isPending} = useMutation({
        mutationFn: editPost,
        onError: (error)=> toast.error(error.message),
        onSuccess:()=> toast.success("your post was uupdated!")
    }
    )
   
    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
        }
    })

    return (
        <div>
            
            <form onSubmit={handleSubmit((data)=> mutate({data, postId}))} className="bg-orange-600 flex flex-col m-20 p-8 border-4 border-black items-center">
                <h1 className="font-bold text-xl">Edit post</h1>
                <label htmlFor="title">title</label>
                <input type="text" id="title"  {...register("title")} className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]" />
                {errors.title && <p> {errors.title.message}</p>}
                <label htmlFor="content">content</label>
                <input type="text" id="content" {...register("content")} className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]" />
                {errors.content && <p> {errors.content.message}</p>}
                <button type="submit" className="border-2 border-black rounded-xl bg-green-500 hover:bg-green-200 w-[98%] sm:w-[75%] md:w-[20%]">{isPending ? "Editing post" : "Edit post"}</button>
            </form>
        </div>
    )
}

export default EditPostForm;