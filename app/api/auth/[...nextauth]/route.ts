import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.X_CLIENT_ID as string,
      clientSecret: process.env.X_CLIENT_SECRET as string,
      version: "2.0", // OAuth 2.0
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile } : {  token: any;
      account?: any;
      profile?: any; }) {
      // Store the accessToken in the JWT if available
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Optional
      }
      return token;
    },
    async session({ session, token }: {
      session: any;
      token: any;
    }) {
      // Pass accessToken to the session object
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken; // Optional
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
