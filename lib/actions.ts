"use server";

import { revalidatePath } from "next/cache";
import { PostModel } from "./models";
import connectToDb from "./utils";

export const addPost = async (formData: FormData) => {
  const { title, description, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new PostModel({ title, desc: description, slug, userId });

    await newPost.save();
    console.log("saved to Db");
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await PostModel.findByIdAndDelete(id);
    console.log("deleted from Db");
    revalidatePath("/blog");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
