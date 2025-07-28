'use client'

import { RootState } from "@/app/store"
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import {  Building, Hammer, HousePlus, User } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"

export const SideBar = () => {

    
    const usuario = useSelector((state:RootState) => state.userSlice)
    const {displayName} = usuario

    return (
        <SidebarProvider>   
        <Sidebar className="">

            <SidebarHeader className="w-full shadow-sm bg-slate-20 min-h-20 bg-slate-100 px-2 py-2 mb-4
            flex flex-row items-center">
                <User />
                <h1>{displayName}</h1>
            </SidebarHeader>

            <Link href={'/adminarea'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
            hover:translate-x-2 transition-transform">
                <HousePlus />
                Adicionar imóveisaa
            </Link>
            <Link href={'/superadminarea/apartamentosregistrados'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
            hover:translate-x-2 transition-transform">
                <Building />
                Apartamentos Registrados
            </Link>
            <Link href={'/superadminarea/apartamentosregistrados'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
            hover:translate-x-2 transition-transform">
                <Hammer />
                Construtoras Registradas
            </Link>
        </Sidebar>
            {/* <SidebarTrigger /> */}
    </SidebarProvider>
    )
}