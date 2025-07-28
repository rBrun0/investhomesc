'use client'

import React from "react"
import { ConstructorsType } from "@/app/utils/types"
import { useState } from "react"

type ConstructionsProps = {
    construtoras: ConstructorsType[]
}

export const OurConstructionsCompanies = ({construtoras}: ConstructionsProps) => {

    const [seeAllConstructors, setSeeAllConstructors] = useState(false)

    return (
        <>
        <ul className="w-full marker:text-amber-900 list-disc flex  flex-wrap  justify-start items-start gap-12 text-sm font-medium">

            {
                !seeAllConstructors && construtoras?.slice(0,9).map((c: ConstructorsType, index: number) => (
                    <li key={index} className="cursor-pointer">{c.name}</li>
                ))
            }
            {
               seeAllConstructors && construtoras?.map((c: ConstructorsType, index: number) => (
                <li key={index} className="cursor-pointer">{c.name}</li>
            )) 
            }
        </ul>

        <div onClick={() => setSeeAllConstructors(!seeAllConstructors)} className=" text-customPrimary rounded-md px-2 py-1 mt-8 cursor-pointer"
            >{seeAllConstructors ? "Ver menos construtoras" : "Ver mais construtoras"}
        </div>

        </>
    )
}