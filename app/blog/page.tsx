import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { Date } from "mongoose";

const getDataPosts = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  return res.json();
};

export interface PostData {
  userId: number;
  id: number;
  title: string;
  desc: string;
  img: string;
  slug: string;
  createdAt: Date;
}

const AboutPage = async () => {
  const posts: PostData[] = await getDataPosts();

  // const posts: PostData[] = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
