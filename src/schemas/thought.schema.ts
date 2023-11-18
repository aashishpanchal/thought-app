import * as yup from "yup";

export type ThoughtSchema = yup.InferType<typeof ThoughtSchema>;

export const ThoughtSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});
