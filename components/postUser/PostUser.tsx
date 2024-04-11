import React from "react";
import styles from "./PostUser.module.css";
import { getUser } from "@/lib/data";
import Image from "next/image";

interface PostUserProps {
  userId: number;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  img: string;
  isAdmin: boolean;
}

const PostUser = async (props: PostUserProps) => {
  const { userId } = props;

  const user: UserData = await getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img || "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
