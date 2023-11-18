"use server";
import prisma from "@/database/db.config";
import type { ThoughtSchema } from "@/schemas/thought.schema";
import { revalidatePath } from "next/cache";

export const addThought = async (data: ThoughtSchema) => {
  try {
    await prisma.thought.create({ data });
    revalidatePath("/");
    return {
      message: "Thought added successfully",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const updateThought = async (id: string, data: ThoughtSchema) => {
  try {
    await prisma.thought.update({ where: { id }, data });
    revalidatePath("/");
    return {
      message: "Thought update successfully",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const deleteThought = async (id: string) => {
  try {
    await prisma.thought.delete({ where: { id } });
    revalidatePath("/");
    return {
      message: "Thought deleted successfully",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};
