import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string; // Optional
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string; // Optional
  }
}
