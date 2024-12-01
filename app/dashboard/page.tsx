"use client" // This is needed to indicate that this is a client-side component

import Navbar from "@/components/navbar";
import { PlatformForm } from "@/components/platform-from";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Get the query parameters from the URL
  const searchParams = useSearchParams();
  let userData = searchParams.get('userData');

  console.log("userData: ", userData)

  if (userData) {
    try {
      localStorage.setItem("userData", userData);
      router.push("/dashboard")
    } catch (error) {
      console.error("Error storing userData in localStorage:", error);
    }
  }

  userData = localStorage.getItem("userData")

  if (!userData) router.push("/")

  return (
    <>
      <Navbar />
      <div className="h-24 w-full" />
      <PlatformForm />
    </>
  );
}
