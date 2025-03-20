"use client"

import React from "react";
import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { useDispatch } from "react-redux";

interface ActingCitiesProps {
    locObj: Record<string, any>
}

 export const ActingCities = ({locObj}: ActingCitiesProps) => {

const dispatch = useDispatch()

function selectNeighbors(neighborhood: string) {
    dispatch(setFilterValues({
        neighborhood: neighborhood.toUpperCase()
    }))
}

    return (
        <>
            <div className="w-full">

                {
                    Object.entries(locObj)?.map(([city, neighborhoods]) => (
                        <>
                            <h1 className="text-2xl font-semibold text-customPrimary">{city}</h1>

                            <ul className="list-disc marker:bg-customPrimary flex flex-wrap justify-start gap-8 text-xs py-4"
                            >
                            {
                                neighborhoods?.map((neighborhood) => (

                                    <li onClick={() => selectNeighbors(neighborhood)}
                                    key={neighborhood}
                                    >
                                        {neighborhood}
                                    </li>
                                ))
                            }
                            </ul>
                        </>
                    ))
                }
                <ul className="list-disc marker:bg-customPrimary flex flex-wrap justify-start gap-8 text-xs py-4">
                   
                        
                    {/* <li onClick={() => selectNeighbors("Meia Praia")}>Meia Praia</li>
                    <li onClick={() => selectNeighbors("Morretes")}>Morretes</li>
                    <li onClick={() => selectNeighbors("Jardim Praia Mar")}>Jardim Praia Mar</li>
                    <li onClick={() => selectNeighbors("Casa Branca")}>Casa Branca</li>
                    <li onClick={() => selectNeighbors("Tabuleiro dos Oliveiras")}>Tabuleiro dos Oliveiras</li>
                    <li onClick={() => selectNeighbors("Várzea")}>Várzea</li>
                    <li onClick={() => selectNeighbors("Centro")}>Centro</li>
                    <li onClick={() => selectNeighbors("Canto da Praia")}>Canto da Praia</li> */}
                   
                </ul>
                </div>
        </>
    )
}