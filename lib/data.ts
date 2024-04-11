"use server";

import { PostModel, UserModel } from "./models";
import connectToDb from "./utils";

export const getPosts = async () => {
  try {
    await connectToDb();
    const posts = await PostModel.find();
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug: string) => {
  try {
    await connectToDb();
    const post = await PostModel.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id: number) => {
  try {
    await connectToDb();
    const user = await UserModel.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    await connectToDb();
    const users = await UserModel.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
