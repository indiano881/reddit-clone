"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../../../../actions/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type Tables } from "../../../../../utils/supabase/database.types";

const EditPostForm = ({defaultValues}: {defaultValues: Pick<Tables<"posts">, "title" | "content">})=> {
   
    const {register} = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
        }
    })

    return (
        <div>
            
            <form  className="flex w-full flex-col gap-4 m-20 bg-orange-800 border-2 border-black">
                <label htmlFor="title">title</label>
                <input type="text" id="title"  {...register("title")}/>
                <label htmlFor="content">content</label>
                <input type="text" id="content" {...register("content")}/>
                <button type="submit" className="bg-purple-400">Edit post</button>
            </form>
        </div>
    )
}

export default EditPostForm;