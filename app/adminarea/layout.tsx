'use client'

import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { Building, CornerDownLeft, Hammer, HousePlus, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Layout({children}: {children: ReactNode}) {

    const usuario = useSelector((state:RootState) => state.userSlice)
    const {displayName} = usuario

    return (
        <html>
            <body>
                
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
                    Adicionar imóveis
                </Link>
                <Link href={'/superadminarea/apartamentosregistrados'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
                hover:translate-x-2 transition-transform">
                    <Building />
                    Apartamentos registrados
                </Link>
                <Link href={'/superadminarea/apartamentosregistrados'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
                hover:translate-x-2 transition-transform">
                    <Hammer />
                    Construtoras registradas
                </Link>
                <Link href={'/'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
                hover:translate-x-2 transition-transform mt-6">
                    <CornerDownLeft />
                </Link>
            </Sidebar>
                {/* <SidebarTrigger /> */}
            {children}
        </SidebarProvider>
        </body>
        </html>
    )
}

export default Layout;