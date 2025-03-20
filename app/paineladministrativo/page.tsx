'use client'

import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Roles } from "@/lib/utils";
import { Settings } from "lucide-react";

function PainelAdministrativo() {

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    if(userProfile.role != Roles.CORRETOR && userProfile.role != Roles.ADMIN) {
        return <p>Acesso restrito aos corretores.</p>
    }

    return (
       <div className="relative w-full justify-center items-center h-screen flex">
        <Settings  className="text-customPrimary opacity-15 w-96 h-96"/>
       </div>
    )

}

export default PainelAdministrativo;