import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent } from "react"

type CustomCheckBox = {
  description: string,
  checkBoxStateValue: any,
  handleCheckBox: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function CustomcheckBox({description,checkBoxStateValue, handleCheckBox}: CustomCheckBox) {
  return (
    <div className="flex items-center space-x-2 w-48">
      <input type="checkbox" name="" id="terms" checked={checkBoxStateValue.includes(description)} value={description} className="" onChange={(e) => handleCheckBox(e)}/>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-customPrimary"
      >
        {description}
      </label>
    </div>
  )
}
