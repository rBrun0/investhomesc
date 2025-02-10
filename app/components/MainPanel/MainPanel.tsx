'use client'

import Image from "next/image"
import { RoomsList } from "./components/RoomsList/RoomsList"
import { SelectCamp } from "./components/SelectCamp/SelectCamp"
import praia from "@/app/assets/praia.jpg"
import { MinAndMaxValues } from "./components/MinAndMaxValues"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { resetFilterValues, setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import { RootState } from "@/app/store"
import { useEffect, useState } from "react"

export const MainPanel = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const filterValues = useSelector((state: RootState) => state.filterValuesSlice)

    const [codeSearchValue, setCodeSearchValue] = useState("")

        useEffect(() => {
            dispatch(setFilterValues({
                codeSearch: codeSearchValue
            }))
        }, [codeSearchValue])
    
    return (

    <main className="w-full relative h-[600px] md:h-[580px] flex justify-center items-center text-white">
        <Image src={praia} alt="imagem-praia" fill objectFit="cover" className="absolute -z-50"/>

        <section className="w-11/12 h-[34rem] md:h-[24rem] lg:h-96 rounded-md flex flex-col justify-start items-center space-y-6 relative">

            <div className="absolute left-0 top-0 bg-black w-full h-full -z-10 opacity-60"/>

            <h1 className="text-white text-center text-2xl md:text-3xl tracking-wider lg:text-4xl px-3 pt-6 font-semibold">
                Somente vendas! Não trabalhamos com aluguel
            </h1>



            <div className="flex flex-wrap justify-center w-[90%] gap-2 md:gap-4 lg:gap-8  ">

            <SelectCamp/>

             <MinAndMaxValues/>

             <RoomsList/>

             <input type="text" 
             className="border rounded-md outline-none h-10 px-2 text-zinc-800"
             placeholder="código imovel"
             value={codeSearchValue} onChange={(e) => setCodeSearchValue(e.target.value)}
             />

             <div onClick={() => {
                 router.push('/advancedsearch')
             }}>
                <button className="w-24 h-9 bg-customPrimary text-white rounded-md">BUSCAR</button>
             </div>
                <button className="w-24 h-9 bg-customPrimary text-white rounded-md"
                onClick={() => {
                    dispatch(resetFilterValues())
                    console.log({filterValues})
                }}>
                LIMPAR
                </button>

            </div>

        </section>

    </main>

    )
}