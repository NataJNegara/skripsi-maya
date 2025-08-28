"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { addCommentAction } from "@/lib/actions/commentActions";
import { insertCommentSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type CommentFormProps = {
  userId: string;
  destinationId: string;
  onCommentSubmit: () => void;
};

const CommentForm = ({
  userId,
  destinationId,
  onCommentSubmit,
}: CommentFormProps) => {
  const form = useForm<z.infer<typeof insertCommentSchema>>({
    resolver: zodResolver(insertCommentSchema),
    defaultValues: {
      userId,
      destinationId,
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof insertCommentSchema>) => {
    const res = await addCommentAction(values);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    form.reset();
    onCommentSubmit();
    toast.success(res.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komentar</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-24"
                  placeholder="tulis komentar..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button className="cursor-pointer bg-brand! hover:bg-brand-secondary! transition-all duration-300">
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
