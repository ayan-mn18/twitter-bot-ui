type SignInUserRequest = {
  accessToken: string;
  refreshToken: string;
};

type SignInUserResponse = {
  message: string;
  statusCode: number
  status: boolean
  data: any
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

    const data: SignInUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
}
