"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import type { Thought } from "@prisma/client";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteThought } from "@/app/actions/thought.action";
import { UpdateThought } from "./update-thought";

type Props = {
  data: Thought;
};

export default function ThoughtCard({ data }: Props) {
  const onDelete = async () =>
    await toast.promise(deleteThought(data.id), {
      loading: "Deleting thought...",
      success: "Thought deleted successfully",
      error: (props) => props.data.message,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.content}</p>
      </CardContent>
      <CardFooter className="flex gap-3 justify-end">
        <Button size="icon" onClick={onDelete}>
          <TrashIcon className="h-6 w-6" />
        </Button>
        <UpdateThought thought={data} />
      </CardFooter>
    </Card>
  );
}
