"use server";

import { revalidatePath } from "next/cache";
import { PostModel, UserModel } from "./models";
import connectToDb from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData: FormData) => {
  const { title, description, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new PostModel({ title, desc: description, slug, userId });

    await newPost.save();
    console.log("saved to Db");
    revalidatePath("/blog");
    revalidatePath("/admin");
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
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData: FormData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new UserModel({ username, email, password, img });

    await newUser.save();
    console.log("saved to Db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await PostModel.deleteMany({ userId: id });
    await UserModel.findByIdAndDelete(id);
    console.log("deleted from Db");
    revalidatePath("/admin");
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

export const register = async (prevState, formData: FormData) => {
  const { username, email, password, img, passwordRepeat } = Object.fromEntries(
    formData
  ) as {
    username: string;
    email: string;
    password: string;
    img: string;
    passwordRepeat: string;
  };

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();
    const user = await UserModel.findOne({ username });

    if (user) {
      return { error: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async (prevState, formData: FormData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid name or password" };
    }
    throw error;
  }
};
