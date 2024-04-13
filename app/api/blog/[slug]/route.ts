import { PostModel } from "@/lib/models";
import connectToDb from "@/lib/utils";
import { NextResponse } from "next/server";

interface GETProps {
  params: { slug: string };
}

export const GET = async (_: any, props: GETProps) => {
  const { params } = props;
  const { slug } = params;

  try {
    connectToDb();

    const post = await PostModel.findOne({ slug });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (_: any, props: GETProps) => {
  const { params } = props;
  const { slug } = params;

  try {
    connectToDb();

    await PostModel.deleteOne({ slug });
    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};
