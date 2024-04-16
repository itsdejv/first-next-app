"use client";

import { useFormState } from "react-dom";
import styles from "./adminPostForm.module.css";
import React from "react";
import { addPost } from "@/lib/actions";

interface AdminPostFormProps {
  userId: string;
}

const AdminPostForm = (props: AdminPostFormProps) => {
  const { userId } = props;
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea name="description" placeholder="description" rows={10} />
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminPostForm;
