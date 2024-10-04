'use client'

import React from "react"
import { ConstructorsType } from "@/app/@Types/types"
import { useState } from "react"

type ConstructionsProps = {
    construtoras: any
}

export const OurConstructionsCompanies = ({construtoras}: ConstructionsProps) => {

    const [seeAllConstructors, setSeeAllConstructors] = useState(false)

    return (
        <>
        <ul className="w-full marker:text-amber-900 list-disc flex  flex-wrap  justify-start items-start gap-12 text-sm font-medium">

            {
                !seeAllConstructors && construtoras?.slice(0,9).map((c: ConstructorsType, index: number) => (
                    <li key={index} className="cursor-pointer">{c.nome}</li>
                ))
            }
            {
               seeAllConstructors && construtoras?.map((c: ConstructorsType, index: number) => (
                <li key={index} className="cursor-pointer">{c.nome}</li>
            )) 
            }
        </ul>

        <div onClick={() => setSeeAllConstructors(!seeAllConstructors)} className="bg-customPrimary text-white rounded-md px-2 py-1 mt-8 cursor-pointer"
            >{seeAllConstructors ? "ver menos construtoras" : "ver mais construtoras"}
        </div>

        </>
    )
}