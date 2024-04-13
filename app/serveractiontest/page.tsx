import { addPost, deletePost } from "@/lib/actions";
import React from "react";

const ServerActionTestPage = () => {
  return (
    <>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="description" name="description" />
        <input type="text" placeholder="slug" name="slug" />
        <input type="text" placeholder="userId" name="userId" />
        <button>Create</button>
      </form>

      <form action={deletePost}>
        <input type="text" placeholder="postId" name="id" />
        <button>Delete</button>
      </form>
    </>
  );
};

export default ServerActionTestPage;
