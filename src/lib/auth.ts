import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db("studio-space");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt",
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
