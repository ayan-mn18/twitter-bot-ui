"use client"
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ui/mode-toggle';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { IconSettings } from '@tabler/icons-react';
import { testTweet } from '@/util/api';


type Props = {}

const Navbar = () => {
  const router = useRouter();
  const path = usePathname()
  const [email, setEmail] = useState<string>("");
  const [userData, setUserData] = useState<any | null>(JSON.parse(localStorage.getItem('userData')!));
  const [tweet, setTweet] = useState<string>("");
  const [tweetStatus, setTweetStatus] = useState<string>("");


  console.log("userData: ", userData)


  const handleConnectX = async () => {

    // Step 1: Build the authorization URL
    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_X_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_X_CALLBACK_URI!
    )}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state123&code_challenge=${process.env.NEXT_PUBLIC_AUTH_CODE_CHALLENGE}&code_challenge_method=plain`;

    // Step 2: Redirect the user to Twitter for authorization
    window.location.href = twitterAuthUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/")
  }

  const handleTweetSubmit = async () => {
    try {
      // Replace with your API call to send the tweet
      const response = await testTweet({ tweetText: tweet, userId: userData.user.userId });

      if (response.data.tweetText === tweet) {
        setTweetStatus("success");
      } else {
        setTweetStatus("error");
      }
    } catch (error) {
      setTweetStatus("error");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 fixed w-full max-w-[1300px]">
      {/* Logo */}
      <button className="flex items-center" onClick={() => {
        router.push("/")
      }}>
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          Logo
        </span>
      </button>

      {/* Buttons */}
      <div className="flex items-center space-x-4">
        {path !== '/dashboard' && (
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={handleConnectX} >
            Connect X
          </button>
        )}
        {/* <ModeToggle /> */}
        {path === '/dashboard' && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                Test Tweet
              </button>
            </DialogTrigger>
            <DialogContent className="p-6">
              <DialogHeader>
                <DialogTitle>Write a Test Tweet</DialogTitle>
                <DialogDescription className='space-y-32'>
                  <div className="flex space-x-32 py-4">
                    <LabelInputContainer>
                      <Input
                        type="text"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        placeholder="Write your tweet here..."
                      />
                    </LabelInputContainer>
                    <button
                      className={`px-2 text-sm font-medium text-white rounded-md ${tweetStatus === "success" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} w-[120px]`}
                      onClick={handleTweetSubmit}
                      style={{ marginLeft: '10px !important' }}
                    >
                      Send
                    </button>
                  </div>
                </DialogDescription>
                <DialogFooter>
                  <div className="flex justify-center w-full">
                    {tweetStatus === "success" && <p className="text-blue-600 mt-2">Tweet sent successfully!</p>}
                    {tweetStatus === "error" && <p className="text-red-600 mt-2">Failed to send tweet.</p>}
                  </div>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        {isUserSignedIn() && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IconSettings />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{userData?.twitterUsername}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} >Logout</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard")} >Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}


      </div>
    </nav>
  );
};

export default Navbar;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export const isUserSignedIn = (): boolean => {
  const userData = localStorage.getItem("userData");

  // If userData doesn't exist or is invalid, return false
  if (!userData) {
    return false;
  }

  try {
    // Parse the user data to an object (assuming JSON format)
    const parsedData = JSON.parse(userData);

    // Optionally, you can validate the structure of the parsed data
    if (parsedData && parsedData.twitterUsername) {
      // If the user has a valid userId, consider them signed in
      return true;
    }
  } catch (error) {
    // Handle parsing error (if data is malformed)
    console.error("Error parsing user data:", error);
  }

  // Return false if the structure is invalid
  return false;
};

