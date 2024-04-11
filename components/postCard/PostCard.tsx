import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";
import { PostData } from "@/app/blog/page";

interface PostCardProps {
  post: PostData;
}

const PostCard = (props: PostCardProps) => {
  const { post } = props;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
        <span className={styles.date}>
          {post.createdAt.toString().slice(4, 16)}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <Link href={`/blog/${post.slug}`} className={styles.link}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
