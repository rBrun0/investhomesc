"use client"

import { AdicionarImoveis } from "./components/AdicionarImoveis";
import { AdicionarConstrucao } from "./components/AdicionarConstrucao";
import { AdicionarConstrutora } from "./components/AdicionarConstrutora";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import useAdmin from "../Hooks/useAdmin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useEffect } from "react";

function adminarea () {

    const user = auth.currentUser

    onAuthStateChanged(auth, () => {
        if (auth.currentUser) {
           console.log(auth.currentUser)
        }
    })

    const usuario = useSelector((state:RootState) => state.userSlice)
    const {displayName} = usuario

    const isAdmin = useAdmin();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
          user.getIdTokenResult()
            .then((idTokenResult) => {
              console.log('usuario logado!')
            })
            .catch((error) => {
              console.error("Erro ao obter custom claims:");
            });
        } 

      }, []);


    if (!isAdmin || !user) {    
        return <p className="text-center text-4xl mt-12 ">Você não tem permissão para adicionar imóveis.</p>;
    }

    return (
        <div className="w-full min-h-screen">
            <h1 className="text-center text-4xl mt-12">AREA DO ADMIN</h1>
            {
                displayName && <h2 className="text-center text-3xl">Ola <span className="text-customPrimary font-medium">{displayName}</span>!</h2>
            }

            <AdicionarConstrutora/>
            <AdicionarImoveis/>
            <AdicionarConstrucao/>

        </div>
    )
};

export default adminarea;