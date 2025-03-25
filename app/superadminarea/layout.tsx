'use client'


import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"
import { Building, CornerDownLeft, Hammer, HousePlus, User } from "lucide-react"
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link"
import { ReactNode } from "react"
import { RootState } from "../store"
import { useSelector } from "react-redux"

const Layout = ({children}: {children: ReactNode}) => {

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    return (
        <html>
            <body className="w-full ">

        <SidebarProvider>   
        <Sidebar className="">

            <SidebarHeader className="w-full shadow-sm bg-slate-20 min-h-20 bg-slate-100 px-2 py-2 mb-4
            flex flex-row items-center">
                <User />
                <h1>{userProfile.displayName}</h1>
            </SidebarHeader>

            <SidebarContent>
                

            <Link href={'/adminarea'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2">
                <HousePlus />
                Adicionar imoveis
            </Link>
            <Link href={'/superadminarea/apartamentosregistrados'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2">
                <Building />
                Apartamentos Registrados
            </Link>
            <Link href={'/superadminarea/construtorasregistradas'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2">
                <Hammer />
                Construtoras Registradas
            </Link>
            <Link href={'/superadminarea/siteinfo'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2">
                <Hammer />
                Configurações do site
            </Link>

            <Link href={'/superadminarea'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2">
                <RiAdminFill />
                Admin
            </Link>

            <Link href={'/'} className="flex items-center px-4 py-2 text-customPrimary font-medium gap-2
                hover:translate-x-2 transition-transform mt-6">
                    <CornerDownLeft />
            </Link>
        </SidebarContent>
        </Sidebar>
            {/* <SidebarTrigger /> */}
            {children}
    </SidebarProvider>
            </body>
        </html>
    )
}

export default Layout