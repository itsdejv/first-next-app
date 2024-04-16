import AdminPosts from "@/components/adminPosts/AdminPosts";
import styles from "./admin.module.css";
import React, { Suspense } from "react";
import AdminPostForm from "@/components/adminPostForm/AdminPostForm";
import AdminUsers from "@/components/adminUsers/AdminUsers";
import AdminUserForm from "@/components/adminUserForm/AdminUserForm";
import { auth } from "@/lib/auth";

const AdminPage = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPostForm userId={session.user.id} />
          </Suspense>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUserForm userId={session.user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
