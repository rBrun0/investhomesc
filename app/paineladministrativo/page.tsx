'use client'

import React from "react"
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Roles } from "@/lib/utils";

function PainelAdministrativo() {

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    if(userProfile.role != Roles.CORRETOR && userProfile.role != Roles.ADMIN) {
        return <p>Acesso restrito aos corretores.</p>
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-6">
            <h1 className="text-3xl text-center">Navegar</h1>

            <div className="flex flex-wrap justify-center gap-4 my-4 mx-auto">

            <Link href={'/adminarea'} className="px-4 py-1 rounded-md
            bg-customPrimary text-white font-medium border-[2px]
            border-white border-solid hover:bg-white hover:border-customPrimary
            hover:text-customPrimary transition-colors">
                Adicionar Imoveis
            </Link>
            <Link href={'/meusimoveis'} className="px-4 py-1 rounded-md
            bg-customPrimary text-white font-medium border-[2px]
            border-white border-solid hover:bg-white hover:border-customPrimary
            hover:text-customPrimary transition-colors">
                Meus Imoveis
            </Link>

            </div>

            {
                userProfile.role == Roles.ADMIN && (
                    <>
            <h1 className="text-center text-3xl mt-12">Proprietario</h1>

            <div className="flex justify-center flex-wrap gap-4 mx-auto">

                <Link href={'/superadminarea'} className="px-4 py-1 rounded-md
                bg-customPrimary text-white font-medium border-[2px]
                border-white border-solid hover:bg-white hover:border-customPrimary
                hover:text-customPrimary transition-colors">
                    Adicionar Imoveis
                </Link>

                <Link href={'/superadminarea/apartamentosregistrados'} className="px-4 py-1 rounded-md
                bg-customPrimary text-white font-medium border-[2px]
                border-white border-solid hover:bg-white hover:border-customPrimary
                hover:text-customPrimary transition-colors">
                   Apartamentos Registrados
                </Link>

            </div>
            </>
                )
            }
        </div>
    )

}

export default PainelAdministrativo;