'use client'

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import Link from "next/link"
import { useDispatch } from "react-redux"



export const ComprarModal = () => {

    const dispatch = useDispatch()

    function addFilter(perfil = "", tipo = "", bairro = "") {
        dispatch(setFilterValues({
            propertyProfile: perfil,
            cities: 'Itapema',
            propertyType: tipo,
            neighborhood: bairro
        }))
    }

    return (
        <div className={`absolute bg-customPrimary text-white w-80 h-96 transition-all
        top-11 -left-1 overflow-x-hidden overflow-y-auto rounded-md flex flex-col justify-start items-start p-2 font-thin py-2 text-xs gap-3`}>
            <Link href={"advancedsearch"} onClick={() => addFilter()}>Apartamentos em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "Meia Praia")}>Apartamentos em Itapema - Meia Praia</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "Quadra Mar")}>Apartamentos em Itapema - Quadra Mar</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Frente Mar")}>Apartamentos em Itapema - Frente Mar</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Mobiliado")}>Apartamentos em Itapema - Mobiliados</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Showroom")}>Apartamentos em Itapema - Showroom</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "Centro")}>Apartamentos em Itapema - Centro</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "Morretes")}>Apartamentos em Itapema - Morretes</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "Sala comercial", "")}>Sala comercial em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Sala comercial", "", "")}>Sala comercial em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Casa", "", "")}>Casas em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Plaza Iate cClub")}>Casas em Itapema - Plaza Iate Club</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("Chácara flóra", "", "")}>Casas em Itapema - Chácara Flora</Link>
            
        </div>
    )
}