import React from 'react'
import { ModeToggle } from './ui/mode-toggle';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

type Props = {}

const Navbar = () => {
  const router = useRouter();
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
      <Dialog>
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
                  <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <button
                    type="submit"
                    className="w-[100px] h-10 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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