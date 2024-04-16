"use client";

import { useFormState } from "react-dom";
import styles from "./adminUserForm.module.css";
import React from "react";
import { addUser } from "@/lib/actions";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new post</h1>
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="text" name="img" placeholder="img" />
      <select name="isAdmin">
        <option value="false">is Admin?</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <button>Add</button>
      {state && state.error}
    </form>
  );
};

export default AdminUserForm;
