import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectProps } from "@radix-ui/react-select";

interface ISelect extends SelectProps {
  data: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  defaultValue?: string;
}

export const SelectInput = ({
  data,
  placeholder,
  triggerClassName,
  value,
  onValueChange,
  ...props
}: ISelect) => {
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className={cn("text-black", triggerClassName)}>
        <SelectValue
          className="!text-black"
          placeholder={placeholder ? placeholder : "Selecione um valor..."}
        />
      </SelectTrigger>
      <SelectContent className="text-black" side="bottom" sideOffset={4} avoidCollisions>
        <SelectGroup className="text-black">
          {data.map((vl) => (
            <SelectItem value={vl.value || "all"} key={vl.value} className="!text-black">
              {vl.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
