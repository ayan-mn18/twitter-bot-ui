"use server"

import { signinUser } from "@/util/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {

  const searchParams = req.nextUrl.searchParams
  const code = searchParams.get('code')
  console.log('code: ', code)

  if (!code) return;

  const clientID = process.env.NEXT_PUBLIC_X_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_X_CLIENT_SECRET;
  const base64Encoded = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
  console.log(base64Encoded);

  // Exchange the authorization code for an access token
  const response = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Basic ${base64Encoded}` },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_X_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_X_CALLBACK_URI!,
      code: code,
      code_verifier: process.env.NEXT_PUBLIC_AUTH_CODE_CHALLENGE!
    }),
  });

  const data = await response.json();
  console.log('data: ', data)
  if (data.access_token) {
    const accessToken = data.access_token
    const refreshToken = data.refresh_token
    console.log('twitterAccessToken: ', accessToken)
    console.log('twitterRefreshToken: ', refreshToken)

    const signInResponse = await signinUser({ accessToken, refreshToken}).catch((error) => {
      // TODO: create a toast
      console.log("error in sign in")
      console.log(error)
    })

    console.log("signInResponse: ", signInResponse)
    // TODO: create a toast
  } else {
    console.error("Error exchanging token", data);
  }

  return NextResponse.redirect(new URL('/dashboard', req.url))
};