import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <>
    <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
    <div> Navbar </div>
    <div> Heading</div>
    <div> Desc </div>
    <div> Infinite Movin cards for platforms like github, leetcode, bitbucket </div>
    </>
  );
}
