import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";
import { Date } from "mongoose";

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
  const posts: PostData[] = await getPosts();
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
