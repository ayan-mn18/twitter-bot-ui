// Dependencies: pnpm install lucide-react react-aria-components

"use client";

import { Clock } from "lucide-react";
import { DateInput, DateSegment, Label, TimeField, TimeValue } from "react-aria-components";
import { JobDetails } from "../platform-from";
import { parseAbsoluteToLocal } from '@internationalized/date';


type SelectProps = {
  jobDetails: JobDetails 
  setJobDetails: React.Dispatch<React.SetStateAction<JobDetails>>
}

export default function TimeInput({ jobDetails, setJobDetails }: SelectProps) {
  // $35ea8db9cb2ccb90$export$680ea196effce5f
  const defaultTime: TimeValue = parseAbsoluteToLocal(new Date().toISOString());

  return (
    <TimeField className="space-y-2" onChange={(val) => setJobDetails((prev: JobDetails) => ({
      ...prev, 
      jobStartTime: val as TimeValue
    }))}  defaultValue={defaultTime} >
      <Label className="text-sm font-medium text-foreground">Job Start Time</Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3 text-muted-foreground/80">
          <Clock size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 ps-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
            />
          )}
        </DateInput>
      </div>
    </TimeField>
  );
}
