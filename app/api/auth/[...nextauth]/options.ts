import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectToMongo } from "@/utils/db";
import { callbackType } from "@/types";
import { SessionStrategy } from "next-auth";

const sessionStrategy: SessionStrategy = "jwt";


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    type: "text"
                },
                password: {
                    type: "password"
                }
            },
            async authorize(credentials) {
                await connectToMongo();
                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error("No user exist");
                }
                const verified = await bcrypt.compare(credentials!.password, user.password);
                if (!verified) {
                    throw new Error("wrong credentials");
                }

                return user;
            }
        })
    ],
    session: {
        strategy: sessionStrategy,
    },
    secrets: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    // debug: process.env.NODE_ENV === "development",
    callbacks: {
        async signIn({ user, account, profile, email, credentials }:any) {
            await connectToMongo();
            user.access_token = account.access_token;
            if (account.provider === 'google') {
                // Check if the user already exists in your database
                const existingUser = await User.findOne({ email: user.email });
                console.log(existingUser);
                

                if (!existingUser) {
                    // If the user doesn't exist, create a new user document in MongoDB
                    await User.create({
                        name: user.name,
                        email: user.email,
                        password: "no password",
                    });
                }
            }
            return user;
        }
    }
}