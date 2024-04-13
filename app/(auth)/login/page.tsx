import { signIn } from "@/lib/auth";
import React from "react";

const page = () => {
  const handleGithubLogin = async (e: FormData) => {
    "use server";
    await signIn("github");
  };
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  );
};

export default page;
