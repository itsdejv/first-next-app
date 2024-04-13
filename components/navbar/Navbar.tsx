import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <Links session={session} />
    </div>
  );
};

export default Navbar;
