"use server"
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';


type SignInUserRequest = {
  accessToken: string;
  refreshToken: string;
};

export type SignInUserResponse = {
  message: string;
  statusCode: number
  status: boolean
  data: UserData
};

type User = {
  userId: string; // UUID
  email: string | null;
  github_username: string | null;
  leetcode_username: string | null;
  bitbucket_username: string | null;
  timezone: string; // e.g., "IST"
  jobFrequency: string; // e.g., "24hrs"
  jobStartTime: string; // e.g., "00:00"
  createdAt: string | null; // ISO string or null
  updatedAt: string | null; // ISO string or null
};

export type UserData = {
  user: User;
  twitterUsername: string; // e.g., "AyanMn18"
};

export async function signinUser(input: SignInUserRequest): Promise<SignInUserResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign in');
    }

    const responseData: SignInUserResponse = await response.json();

    // save the user data in cookies
    console.log("userData from server response: ", responseData.data)
    return responseData;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
}


