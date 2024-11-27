import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobDetails, JobFrequency, Timezone } from "../platform-from";

type SelectProps = {
  jobDetails: JobDetails 
  setJobDetails: React.Dispatch<React.SetStateAction<JobDetails>>
}

export function SelectTimezone({ jobDetails, setJobDetails }: SelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-23">
         Timezone <span className="text-destructive">*</span>
      </Label>
      <Select defaultValue="IST" required
      onValueChange={(val) => setJobDetails((prev) => ({
        ...prev, 
        timezone: val as Timezone
      }))}
      >
        <SelectTrigger id="select-23">
          <SelectValue placeholder="Select timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="IST">IST</SelectItem>
          <SelectItem value="GMT">GMT</SelectItem>
          <SelectItem value="UTC">UTC</SelectItem>
          <SelectItem value="PST">PST</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectJobFrequency({ jobDetails, setJobDetails }: SelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-23">
         Job frequency <span className="text-destructive">*</span>
      </Label>
      <Select defaultValue="24hrs" required
       onValueChange={(val) => setJobDetails((prev) => ({
        ...prev, 
        jobFrequency: val as JobFrequency
      }))}
      >
        <SelectTrigger id="select-23">
          <SelectValue placeholder="Select timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24hrs">24hrs</SelectItem>
          <SelectItem value="12hrs">12hrs</SelectItem>
          <SelectItem value="6hrs">6hrs</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}