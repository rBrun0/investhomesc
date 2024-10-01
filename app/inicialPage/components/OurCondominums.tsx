"use client"

import { useState } from "react"

type OurCondominumsProps = {
    condominumsList: any
}

export const OurCondominums = ({condominumsList}: OurCondominumsProps) => {

    const [seeAllCondominums, setSeeAllCondominums] = useState(false)
    return (
        <>

        <ul className="w-full marker:text-orange-400 list-disc flex flex-wrap justify-start gap-4 px-8 space-x-14 text-sm font-medium">
            {
                !seeAllCondominums && condominumsList?.slice(0,10).map((c: any, index: number) => (
                    <li key={index} className="cursor-pointer">{c.nome}</li>
                ))
            }
            {
                seeAllCondominums && condominumsList?.map((c: any, index: number) => (
                    <li key={index} className="cursor-pointer">{c.nome}</li>
                ))
            }   
            
        </ul>

        <div onClick={() => setSeeAllCondominums(!seeAllCondominums)} className="bg-customPrimary text-white rounded-md px-2 py-1 mt-8 cursor-pointer"
            >{seeAllCondominums ? "ver menos condominios" : "ver mais condominios"}
            </div>


        </>
    )
}