"use client"

import { setUser } from "@/app/features/user/userSlices";
import { auth } from "@/app/firebaseConfig";
import { RootState } from "@/app/store";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const EntreHamburguer = () => {

    const dispatch = useDispatch();

    const [usuario, setUsuario] = useState<User>()
    const [actualUser, setActualUser] = useState<User | null>(null)
    const usuarioCorrente = auth.currentUser

    const provider = new GoogleAuthProvider();

    function handleSignIn() {
        signInWithPopup(auth, provider).then((result) => {
            console.log("User signed in successfully!", result);
            console.log(result.user)
            setUsuario(result.user)
        }).catch(() => {
            console.log("Error signing in with popup");
        })
    }

const user = useSelector((state: RootState) => state.userSlice);  // Obtém o estado do usuário

const logout = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
};


    useEffect(() => {
        if(usuario) {
         dispatch(setUser(usuario))
        }
     
        const unsubscribe = onAuthStateChanged(auth, (actUser) => {
         setActualUser(actUser);
       });
     
       console.log('unsubscribe', actualUser)
       console.log('usuario corrente', usuarioCorrente)
     
       return () => unsubscribe();
     
     }, [])

    return (
        <>
        {
            actualUser && <div className="border-b-[1px] border-b-zinc-200 pb-4 cursor-pointer" onClick={logout}>Sair</div>
        }

        {
            !actualUser && <Link href={"/signup"} className="border-b-[1px] border-b-zinc-200 pb-4">Junte-se</Link>
        }
        </>
    )
}

export default EntreHamburguer;