'use client'

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import Link from "next/link"
import { ReactNode } from "react"
import { useDispatch } from "react-redux"



export const ComprarModal = ({isModalOpen, children}: {isModalOpen: boolean, children?: ReactNode}) => {

    const dispatch = useDispatch()

    function addFilter(perfil = "", tipo = "", bairro = "") {
        dispatch(setFilterValues({
            propertyProfile: perfil,
            cities: 'itapema',
            propertyType: tipo,
            neighborhood: bairro
        }))
    }

    return (
        <div className={`absolute bg-customPrimary text-white w-80 h-96 ${isModalOpen ? ' z-50 opacity-100' : '-z-50 opacity-0'} transition-all
        top-11 -left-1 overflow-x-hidden overflow-y-auto rounded-md flex flex-col justify-start items-start p-2 font-thin py-2 text-xs gap-3`}>
            <Link href={"advancedsearch"} onClick={() => addFilter()}>Apartamentos em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "meia praia")}>Apartamentos em Itapema - Meia Praia</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "quadra mar")}>Apartamentos em Itapema - Quadra Mar</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("frente mar")}>Apartamentos em Itapema - Frente Mar</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("mobiliados")}>Apartamentos em Itapema - Mobiliados</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("showroom")}>Apartamentos em Itapema - Showroom</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "centro")}>Apartamentos em Itapema - Centro</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "morretes")}>Apartamentos em Itapema - Morretes</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "sala comercial", "")}>Sala comercial em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("sala comercial", "", "")}>Sala comercial em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("casa", "", "")}>Casas em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("plaza iate club")}>Casas em Itapema - Plaza Iate Club</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("chacara flora", "", "")}>Casas em Itapema - Chacara Flora</Link>
            
        </div>
    )
}