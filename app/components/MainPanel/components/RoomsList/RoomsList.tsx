"use client"

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const RoomsList = () => {

    const dispatch = useDispatch()

    const [numberOfRooms, setNumberOfRooms] = useState(0);

    useEffect(() => {
        dispatch(setFilterValues({
            bedrooms: numberOfRooms
        }))
    }, [numberOfRooms])

    return (
        <div className="flex flex-col justify-center items-start -translate-y-4">
            <h1>Quartos</h1>

            <div className="flex space-x-1">

                <div className="bg-white text-customPrimary border-[2px] border-solid border-customPrimary w-[68px] h-9 rounded-3xl
                flex justify-center items-center hover:bg-customPrimary hover:text-white hover:border:white transition-colors
                cursor-pointer" onClick={() => setNumberOfRooms(1)}>
                    1
                </div>

                <div className="bg-white text-customPrimary border-[2px] border-solid border-customPrimary w-[68px] h-9 rounded-3xl
                flex justify-center items-center hover:bg-customPrimary hover:text-white hover:border:white transition-colors
                cursor-pointer"onClick={() => setNumberOfRooms(2)}>
                    2
                </div>

                <div className="bg-white text-customPrimary border-[2px] border-solid border-customPrimary w-[68px] h-9 rounded-3xl
                flex justify-center items-center hover:bg-customPrimary hover:text-white hover:border:white transition-colors
                cursor-pointer" onClick={() => setNumberOfRooms(3)}>
                    3
                </div>

                <div className="bg-white text-customPrimary border-[2px] border-solid border-customPrimary w-[68px] h-9 rounded-3xl
                flex justify-center items-center hover:bg-customPrimary hover:text-white hover:border:white transition-colors
                cursor-pointer" onClick={() => setNumberOfRooms(4)}>
                    4
                </div>

                <div className="bg-white text-customPrimary border-[2px] border-solid border-customPrimary w-[68px] h-9 rounded-3xl
                flex justify-center items-center hover:bg-customPrimary hover:text-white hover:border:white transition-colors
                cursor-pointer" onClick={() => setNumberOfRooms(5)}>
                    5+
                </div>

            </div>
        </div>
    )
}