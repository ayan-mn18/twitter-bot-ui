import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectTimezone() {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-23">
         Timezone <span className="text-destructive">*</span>
      </Label>
      <Select defaultValue="s4" required>
        <SelectTrigger id="select-23">
          <SelectValue placeholder="Select timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="s1">IST</SelectItem>
          <SelectItem value="s2">GMT</SelectItem>
          <SelectItem value="s3">UTC</SelectItem>
          <SelectItem value="s4">PST</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
