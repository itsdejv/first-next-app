import LoginForm from "@/components/loginForm/LoginForm";
import { handleGithubLogin, login } from "@/lib/actions";
import React from "react";
import styles from "./login.module.css";

const LoginPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
