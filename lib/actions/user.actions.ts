'use server';

import { cookies } from "next/headers";
import { createSessionClient, createAdminClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { PassThrough } from "stream";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });

        return parseStringify(response);
    } catch (error) {
        console.error("Error: ", error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });

        return parseStringify(newUserAccount);
    } catch (error) {
        console.error("Error: ", error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      console.log("User: ", user);
      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }

export const signOut = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");

        const deleted = await account.deleteSession("current");
        if (deleted) {
            return true;
        }
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}
  