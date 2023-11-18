"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThoughtSchema } from "@/schemas/thought.schema";

type Props = {
  action: (data: ThoughtSchema) => Promise<{ message: string; status: number }>;
};

export function AddThought({ action }: Props) {
  const [open, setOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThoughtSchema>({
    resolver: yupResolver(ThoughtSchema),
  });

  const processForm: SubmitHandler<ThoughtSchema> = async (data) => {
    await toast.promise(action(data), {
      loading: "Adding thought...",
      success: "Thought added successfully",
      error: (props) => {
        return props.message;
      },
    });
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        !open && reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpen(true)}>
          Add Thought
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>What{"'"}s your today thought</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(processForm)}
          method="post"
          className="space-y-2"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              {...register("title")}
              id="title"
              placeholder="Title"
              error={errors.title?.message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thought">Thought</Label>
            <Textarea
              {...register("content")}
              placeholder="my thought"
              error={errors.content?.message}
            />
          </div>
          <div>
            <Button size="sm">Add Now</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
