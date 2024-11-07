"use client";

import { toast } from "sonner";
import createComment from "../../../../actions/create-comment";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../../../../actions/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateCommentForm = ({ postId }: { postId: string }) => {
    const { mutate, isPending } = useMutation({
        mutationFn: (data: z.infer<typeof commentSchema>) => createComment(data, postId),
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success("Your comment was added"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
    });

    return (
        <div className="mr-2">
            <form
                onSubmit={handleSubmit((values) => mutate(values))}
                className="flex w-full flex-col  border-2 bg-slate-300 border-black rounded-xl mb-8 mr-4"
            >
                <label htmlFor="content" className="text-xl p-2">Add comment:</label>
                <input type="text" id="content" {...register("content")} className="mx-8 rounded-xl border-2 border-black"/>
                {errors.content && <p>{errors.content.message}</p>}
                <button type="submit" className="bg-green-600 mx-8 my-4 border-2 border-black rounded-xl hover:bg-green-400 max-w-[145px]">
                    {isPending ? "Adding..." : "Add comment"}
                </button>
            </form>
        </div>
    );
};

export default CreateCommentForm;
