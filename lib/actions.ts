"use server";

import { revalidatePath } from "next/cache";
import { PostModel } from "./models";
import connectToDb from "./utils";
import { signIn, signOut } from "./auth";

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

export const handleGithubLogin = async (e: FormData) => {
  "use server";
  await signIn("github");
};

export const handleLogout = async (e: FormData) => {
  "use server";
  await signOut();
};
