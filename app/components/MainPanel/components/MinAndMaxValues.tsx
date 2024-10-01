"use client"

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MinAndMaxValues = () => {

    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);

    const dispatch = useDispatch()
    const filteredData = useSelector((state:RootState) => state.filterValuesSlice)

    useEffect(() => {
            dispatch(setFilterValues({
                minValue: minValue,
                maxValue: maxValue,
            }))
    }, [minValue, maxValue])

    return (

        <>
        <input type="number" name="" id="" className="w-56 h-10 rounded-md cursor-pointer text-zinc-600
             text-right" placeholder="De" value={minValue !== null ? minValue : ''}
             onChange={(e) => setMinValue(+e.target.value)} 
             />

            <input type="number" name="" id="" className="w-56 h-10 rounded-md cursor-pointer text-zinc-600
             text-right" placeholder="Ate"
             value={maxValue !== null ? maxValue : ''} 
             onChange={(e) => setMaxValue(+e.target.value)}
        />
        </>
    )
}