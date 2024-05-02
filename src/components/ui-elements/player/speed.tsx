import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
export default function Speed({
  rate,
  setRate,
}: {
  rate: number;
  setRate: (rate: number) => void;
}) {
  return (
    <nav>
      <Select
        value={rate.toString()}
        onValueChange={v => {
          setRate(Number(v));
        }}>
        <SelectTrigger className="">
          <SelectValue placeholder="speed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5">x0.5</SelectItem>
          <SelectItem value="1">x1</SelectItem>
          <SelectItem value="1.2">x1.2</SelectItem>
          <SelectItem value="1.5">x1.5</SelectItem>
          <SelectItem value="2">x2</SelectItem>
        </SelectContent>
      </Select>
    </nav>
  );
}
