"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconBrandBitbucket,
  IconBrandLeetcode,
  IconBrandX
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Switch } from "./ui/switch";
import TimeInput from "./ui/time-input";
import { SelectJobFrequency, SelectTimezone } from "./ui/select-input";
import { Spinner } from "./ui/spinner";
import { useApi } from "@/hooks/use-api";
import { TimeValue } from "react-aria-components";

export type Timezone = "IST" | "GMT" | "UTC" | "PST"
export type JobFrequency = "24hrs" | "12hrs" | "6hrs"

export type JobDetails = {
  timezone: Timezone 
  jobStartTime: TimeValue,
  jobFrequency: JobFrequency
}

export function PlatformForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const [ghUsername, setGhUsername] = useState("");
  const [jobDetails, setJobDetails] = useState<JobDetails>();

  const { response, error, loading: ghLoader, fetchData } = useApi({
    url: "http://localhost:4004/api/platforms/checkvalidghusername",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { username: ghUsername },
    successToastTitle: "Github Connected" 
  });

  console.log("response: ", response)
  console.log("error: ", error)
  console.log("loader: ", ghLoader)
  console.log("username: ", ghUsername)
  console.log("jobDetails: ", jobDetails)
  console.log("jobDetails: ", jobDetails?.jobStartTime.toString())

  return (
    <div className="w-full max-w-[1000px] mx-auto rounded-none md:rounded-2xl p-4 pt-24 md:p-8 shadow-input bg-white dark:bg-black">
      <h1 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 text-center">
        Welcome to Twitter Bot
      </h1>
      <h1 className="text-neutral-600 max-w-sm m-auto mt-5 text-sm dark:text-neutral-200 text-center">
      Connect different platforms to start posting updates on yout contributions on twitter
      </h1>

      <Seperator />

      <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Connect platforms
      </h3>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Input id="lastname" placeholder="github_username" type="text" onChange={(e) => setGhUsername(e.target.value)} />
          </LabelInputContainer>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-[120px] text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={fetchData}
          >
            { ghLoader && (
                <div className="m-auto" >
                  <Spinner size='small' />
                </div>
              ) }
            {
              !ghLoader && (
                <>
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm" >
                    Connect
                  </span>
                </>
              )
            }
            <BottomGradient />
          </button>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Input id="lastname" placeholder="bitbucket_username" type="text" disabled />
          </LabelInputContainer>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-[120px] text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] opacity-65"
            type="submit"
            disabled
          >
            <IconBrandBitbucket className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Connect
            </span>
            {/* <BottomGradient /> */}
          </button>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Input id="lastname" placeholder="leetcode_username" type="text" disabled />
          </LabelInputContainer>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-[120px] text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] opacity-65"
            type="submit"
            disabled
          >
            <IconBrandLeetcode className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Connect
            </span>
            {/* <BottomGradient /> */}
          </button>
        </div>

        <Seperator />

        <div className="flex justify-between" >

          <h3 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-12">
            Job Details
          </h3>

          <Dialog>
            <DialogTrigger>
              <Switch id="activate" />
              <Label htmlFor="activate" className="ml-4 text-center h-4 text-xl">Activate</Label>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This is will start posting updates of contribution in every 24 hrs startimg from 00:00 IST
                  <div className= "mt-8 w-full flex justify-between" >
                    <button
                        type="submit"
                        className="w-[100px] h-10 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      >
                        Yes
                      </button>
                      <button
                        type="submit"
                        className="w-[100px] h-10 text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                      >
                        Cancel
                      </button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mb-4">
            <SelectTimezone jobDetails={jobDetails as JobDetails}  setJobDetails={setJobDetails as React.Dispatch<React.SetStateAction<JobDetails>>} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <SelectJobFrequency jobDetails={jobDetails as JobDetails}  setJobDetails={setJobDetails as React.Dispatch<React.SetStateAction<JobDetails>>} />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row  md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className="mb-4">
            <TimeInput jobDetails={jobDetails as JobDetails}  setJobDetails={setJobDetails as React.Dispatch<React.SetStateAction<JobDetails>>} />
          </LabelInputContainer>
        </div>
        <div>
        </div>

        <Seperator />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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

const Seperator = () => {
  return(
    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
  )
}