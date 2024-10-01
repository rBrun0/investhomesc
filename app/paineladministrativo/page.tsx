'use client'

import React from "react"
import useSuperAdmin from "../Hooks/useSuperAdmin";
import useAdmin from "../Hooks/useAdmin";
import Link from "next/link";

function painelAdministrativo() {

    const {isSuperAdmin} = useSuperAdmin()
    const isAdmin = useAdmin()

    if(!isAdmin || !isSuperAdmin) {
        return <p>Acesso restrito aos corretores.</p>
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-6">
            <h1 className="text-3xl text-center">NAVEGAR</h1>

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
                isSuperAdmin && (
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

                <Link href={'/superadminarea/apartamentosregistrados'} className=" px-4 py-1 rounded-md
                bg-customPrimary text-white font-medium border-[2px]
                border-white border-solid hover:bg-white hover:border-customPrimary
                hover:text-customPrimary transition-colors">
                   Construcoes Registradas
                </Link>

                <Link href={'/superadminarea/apartamentosregistrados'} className=" px-4 py-1 rounded-md
                bg-customPrimary text-white font-medium border-[2px]
                border-white border-solid hover:bg-white hover:border-customPrimary
                hover:text-customPrimary transition-colors">
                   Construtoras Registradas
                </Link>
            </div>
            </>
                )
            }

           

        </div>
    )

}

export default painelAdministrativo;