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
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ThoughtSchema } from "@/schemas/thought.schema";
import { updateThought } from "@/app/actions/thought.action";
import type { Thought } from "@prisma/client";

type Props = {
  thought: Thought;
};

export function UpdateThought({ thought }: Props) {
  const [open, setOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThoughtSchema>({
    resolver: yupResolver(ThoughtSchema),
    defaultValues: {
      title: thought.title,
      content: thought.content,
    },
  });

  const processForm: SubmitHandler<ThoughtSchema> = async (data) => {
    await toast.promise(updateThought(thought.id, data), {
      loading: "Adding thought...",
      success: (props) => props.message,
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
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thought Update</DialogTitle>
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
            <Button size="sm">Update Now</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
