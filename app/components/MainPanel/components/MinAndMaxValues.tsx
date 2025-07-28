"use client"

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const MinAndMaxValues = () => {

    const [minValue, setMinValue] = useState<number | null>(null);
    const [maxValue, setMaxValue] = useState<number | null>(null);

    const dispatch = useDispatch()
    // const filteredData = useSelector((state:RootState) => state.filterValuesSlice)

    useEffect(() => {
            dispatch(setFilterValues({
                minValue: minValue,
                maxValue: maxValue,
            }))
    }, [minValue, maxValue])

    return (

        <>
            <Input 
            type="number" 
            className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 text-right" 
            placeholder="Valor mínimo (R$)" 
            value={minValue !== null ? minValue : ''}
            onChange={(e) => setMinValue(+e.target.value)} 
            />

            <Input type="number" 
            className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 text-right" 
            placeholder="Valor máximo (R$)"
            value={maxValue !== null ? maxValue : ''} 
            onChange={(e) => setMaxValue(+e.target.value)}
            />
        </>
    )
}