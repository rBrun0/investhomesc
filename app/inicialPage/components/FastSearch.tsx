"use client"

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import Link from "next/link"
import { useDispatch } from "react-redux"


export const FastSearch = () => {

    const dispatch = useDispatch()

    function searchProperty(cities: string) {
        dispatch(setFilterValues({cities}))
    }



    return (
        <section className="w-10/12 flex flex-col items-start justify-center mt-12 space-y-6" >
                 <h1 className="text-orange-300 font-bold text-xl">BUSCAS RAPIDAS</h1>

                 <ul className="flex space-x-16 list-disc">
                    <Link href={"/advancedsearch"} className="text-xs font-semibold text-zinc-600"
                    onClick={() => searchProperty("balneario camboriu")}>APARTAMENTOS EM BALNEARIO <br /> CAMBORIU</Link>

                    <Link href={"/advancedsearch"} className="text-xs font-semibold text-zinc-600"
                    onClick={() => searchProperty("itapema")}>APARTAMENTOS EM ITAPEMA</Link>
                 </ul>
            </section>
    )
}