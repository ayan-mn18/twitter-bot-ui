"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { IconBrandBitbucket, IconBrandGithub, IconBrandLeetcode, IconBrandNotion, IconBrandOnlyfans } from "@tabler/icons-react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-24 text-center text-white md:px-12 h-[100vh] w-full">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl max-w-3xl">
        Use Twitter Bot for Free,
      </h1>
      <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl max-w-3xl">
        You Will Like It!
      </h1>

      {/* Description */}
      <p className="mt-10 text-lg text-gray-400 sm:text-xl md:max-w-2xl">
        Automate your Twitter posts with AI. Schedule tweets, grow your
        audience, and save time by letting the bot handle your daily
        interactions.
      </p>

      {/* CTA Form */}
      <form
        className="flex flex-col items-center w-full mt-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:w-auto"
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission logic here
          alert("Thank you for subscribing!");
        }}
      >
        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 text-gray-900 bg-white rounded-md outline-none dark:bg-gray-800 dark:text-white md:w-72 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Subscribe Button */}
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Subscribe
        </button>
      </form>

      {/* Infinite oving banneerr */}
      <div className="mt-16 p-0 rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={platforms}
          direction="right"
          speed="slow"
          className=""
        />
      </div>
    </section>
  );
};

export default Hero;


const platforms = [
  {
    name: "Github",
    icon: <IconBrandGithub className="size-16" />
  },
  {
    name: "Leetcode",
    icon: <IconBrandLeetcode className="size-16" />
  },
  {
    name: "Bitbucket",
    icon: <IconBrandBitbucket className="size-16" />
  },
  {
    name: "Onlyfans",
    icon: <IconBrandOnlyfans className="size-16" />
  },
  {
    name: "Notion",
    icon: <IconBrandNotion className="size-16" />
  },

];