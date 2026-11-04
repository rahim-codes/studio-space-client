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
  plugins: [
    jwt({
      jwt: {
        // টোকেনের এক্সপায়ার টাইম
        expirationTime: "7d",
      },
    }),
  ],
  database: mongodbAdapter(db, {
    client,
  }),
});
