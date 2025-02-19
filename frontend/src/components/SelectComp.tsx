import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectComp({value, items}: {value: string, items: any[]}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            items.map((item, index) => (
              <SelectItem key={index} value={item}>{item}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
