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
            
            <form onSubmit={handleSubmit((data)=> mutate({data, postId}))} className="flex w-full flex-col gap-4 m-20 bg-orange-800 border-2 border-black">
                <label htmlFor="title">title</label>
                <input type="text" id="title"  {...register("title")}/>
                {errors.title && <p> {errors.title.message}</p>}
                <label htmlFor="content">content</label>
                <input type="text" id="content" {...register("content")}/>
                {errors.content && <p> {errors.content.message}</p>}
                <button type="submit" className="bg-purple-400">{isPending ? "Editing post" : "Edit post"}</button>
            </form>
        </div>
    )
}

export default EditPostForm;