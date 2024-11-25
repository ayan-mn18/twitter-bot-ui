"use client"
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ui/mode-toggle';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';
import { cn } from '@/lib/utils';


type Props = {}

const Navbar = () => {
  const router = useRouter();
  const path = usePathname()
  const [email, setEmail] = useState<string>("");

  const handleConnectX = async () => {

    // Step 1: Build the authorization URL
    const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_X_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_X_CALLBACK_URI!
    )}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state123&code_challenge=${process.env.NEXT_PUBLIC_AUTH_CODE_CHALLENGE}&code_challenge_method=plain`;

    // Step 2: Redirect the user to Twitter for authorization
    window.location.href = twitterAuthUrl;
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
      {/* <Dialog>
        <DialogTrigger>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Connect X
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your email</DialogTitle>
            <form onSubmitCapture={(e) => {
              e.preventDefault()
              router.push("/dashboard")
            }} >
              <div className="flex flex-col md:flex-row md:space-x-2 mb-4 mt-4" >
                <LabelInputContainer className="mb-4">
                  <Input 
                    id="email" 
                    placeholder="projectmayhem@fc.com" 
                    type="email" 
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                  />
                </LabelInputContainer>
                <button
                    type="submit"
                    className="w-[100px] h-10 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={handleConnectX}
                  >
                    Sign In
                  </button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
      { path !== '/dashboard' && (
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={handleConnectX} >
        Connect X
      </button>
      ) }
      <ModeToggle />

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
