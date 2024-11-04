"use client"

import { toast } from "sonner";
import createComment from "../../../../actions/create-comment";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../../../actions/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCommentForm = (data: z.infer<typeof commentSchema>) => {
    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success("Your comment was added")
    });

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
    });

    const onSubmit = (values: z.infer<typeof commentSchema>) => {
        const formData = new FormData();
        formData.append("content", values.content);
        mutate(formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 m-20 bg-orange-800 border-2 border-black">
                <label htmlFor="content">Content</label>
                <input type="text" id="content" {...register("content")} />
                {errors.content && <p>{errors.content.message}</p>}
                <button type="submit" className="bg-purple-400">
                    {isPending ? "Adding..." : "Add comment"}
                </button>
            </form>
        </div>
    );
};

export default CreateCommentForm;
