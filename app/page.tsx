'use client'
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { Switch } from "@/components/ui/switch";
// import { Spotlight } from "@/components/ui/spotlight";


export default function Home() {
  return (
    <>
    <Navbar />
    {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      /> */}
      <Switch />
    <Hero />
    </>
  );
}