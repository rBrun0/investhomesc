import { ReactNode } from "react";

type OptionsList = {
    optionsList: {
        label: string,
        value: string,
    },
}

type SelectProps = {
    children: ReactNode,
}

export const Select = ({children}: SelectProps) => {
    return (
        <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2">
            {children}
        </select>
    )
}