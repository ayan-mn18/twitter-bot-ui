"use server"
import { toast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Type } from 'lucide-react';
import { GetServerSideProps } from 'next';


type SignInUserRequest = {
  accessToken: string;
  refreshToken: string;
};

type TestTweetRequestBody = {
  tweetText: string;
  userId: string;
}

type TestTweetResponseBody = {
  data: {
    tweetText: string;
  }
}

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

export async function testTweet(input: TestTweetRequestBody): Promise<TestTweetResponseBody> {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/twitter/test-tweet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Test tweet failed');
    }

    const responseData: TestTweetResponseBody = await response.json();

    // save the user data in cookies
    console.log("Test tweet failed response: ", responseData)
    return responseData;
  } catch (error) {
    console.error('Error testing tweet:', error);
    throw error;
  }
}

export type validGithubUserRequest = {
  userId: string;
  githubUsername: string;
}

export type validGithubUserResponse = {
  message: string;
  statusCode: number;
  status: boolean;
  data: {
    valid: boolean;
  }
}

export async function checkValidGithubUsername(input: validGithubUserRequest): Promise<validGithubUserResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/platforms/check-valid-gh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("errorData: ", errorData)
      console.log("errorData.message: ", "Failed to check valid github username")
      return errorData;
    }

    const responseData: validGithubUserResponse = await response.json();

    // save the user data in cookies
    console.log("Valid Github username response: ", responseData)
    return responseData;
  } catch (error) {
    console.error('Error checking valid github username:', error);
    throw error;
  }
}

export type validLeetCodeUserRequest = {
  userId: string;
  leetcodeUsername: string;
}

export type validLeetCodeUserResponse = {
  message: string;
  statusCode: number;
  status: boolean;
  data: {
    valid: boolean;
  }
}

export async function checkValidLeetcodeUsername(input: validLeetCodeUserRequest): Promise<validLeetCodeUserResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/platforms/check-valid-lc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("errorData: ", errorData)
      console.log("errorData.message: ", "Failed to check valid leetcode username")
      return errorData;
    }

    const responseData: validGithubUserResponse = await response.json();

    // save the user data in cookies
    console.log("Valid Leetcode username response: ", responseData)
    return responseData;
  } catch (error) {
    console.error('Error checking valid leetcode username:', error);
    throw error;
  }
  
}
