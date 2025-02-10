"use client"

import { AdicionarImoveis } from "./components/AdicionarImoveis";
import { AdicionarConstrutora } from "./components/AdicionarConstrutora";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Roles } from "@/lib/utils";
import { Toaster } from "sonner";

function Adminarea () {

    // const user = auth.currentUser

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    onAuthStateChanged(auth, () => {
        if (auth.currentUser) {
           console.log(auth.currentUser)
        }
    })

    const usuario = useSelector((state:RootState) => state.userSlice)
    const {displayName} = usuario


    if (userProfile.role != Roles.ADMIN  && userProfile.role != Roles.CORRETOR) {    
        return <p className="text-center text-4xl mt-12 ">Você não tem permissão para adicionar imóveis.</p>;
    }

    return (
        <div className="w-full min-h-screen">
            <h1 className="text-center text-4xl mt-12 font-medium">Área do corretor</h1>
            {
                displayName && 
                              <h2 className="text-center text-2xl">
                                Olá <span className="text-customPrimary font-medium">
                                    {displayName}
                                    </span>
                                !
                              </h2>
            }

            <div className="w-full flex gap-4 items-center justify-center mt-40">
            <AdicionarConstrutora/>

            <AdicionarImoveis/>
            </div>

            <Toaster/>

        </div>
    )
};

export default Adminarea;