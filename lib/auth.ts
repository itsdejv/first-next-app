import NextAuth, { Account, Profile, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import connectToDb from "./utils";
import { UserModel } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "../auth.config";

export interface userDataType {
  username: string;
  email: string;
  password: string;
  img: string;
  isAdmin: boolean;
}

const login = async (credentials: any) => {
  try {
    connectToDb();
    const user: any = await UserModel.findOne({
      username: credentials.username,
    });

    if (!user) {
      throw new Error("User not found!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    return user;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("test");
        console.log(credentials);
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        connectToDb();
        try {
          const user = await UserModel.findOne({ email: profile?.email });

          if (!user) {
            const newUser = new UserModel({
              username: profile?.login,
              email: profile?.email,
              image: profile?.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
