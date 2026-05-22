import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  baseURL: process.env.CLIENT_URL,
  socialProviders: {
    google: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
  },

  advanced: {
    // Use for the Production  Secure cookies
    useSecureCookies: true,

    // if use this dev and normal cookie + production  __Secure- cookie both working fine
    cookiePrefix: "better-auth",
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://think-share-amber.vercel.app/", // your domain
    "https://*.vercel.app", // if vercel
  ],

  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 60 * 24,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  plugins: [
        jwt()
    ]
});
