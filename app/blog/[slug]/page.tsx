import Image from "next/image";
import styles from "./singlePost.module.css";
import { PostData } from "../page";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import PostUser from "@/components/postUser/PostUser";

const getDataPost = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  return res.json();
};

interface generateMetadataProps {
  params: { slug: string };
}

export const generateMetadata = async (props: generateMetadataProps) => {
  const { params } = props;
  const { slug } = params;

  const post: PostData = await getDataPost(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};

interface SinglePostPageProps {
  params: { slug: string };
}

const SinglePostPage = async (props: SinglePostPageProps) => {
  const { params } = props;
  const { slug } = params;

  const post: PostData = await getPost(slug);

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
