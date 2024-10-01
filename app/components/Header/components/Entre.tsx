'use client'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth"
import { auth } from "@/app/firebaseConfig"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { clearUser, setUser } from "@/app/features/user/userSlices"
import { RootState } from "@/app/store"
import { clearUser, setUser } from "@/app/features/user/userSlices"
import Link from "next/link"

export const Entre = () => {
    const dispatch = useDispatch()

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

    const logout = async () => {
        try {
          await signOut(auth);
          console.log('Usuário deslogado com sucesso!');
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
        }
    };

const user = useSelector((state: RootState) => state.userSlice);  // Obtém o estado do usuário


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

    return (<>
    {
        actualUser && (
            <div className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md bg-customPrimary text-white font-medium border-[2px]
            border-white border-solid hover:bg-white hover:border-customPrimary hover:text-customPrimary transition-colors
            cursor-pointer" onClick={logout}>
               Sair
            </div> 
        )
    
        }

        {
            !actualUser && (
                <Link href="/signup" className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md bg-customPrimary text-white font-medium border-[2px]
            border-white border-solid hover:bg-white hover:border-customPrimary hover:text-customPrimary transition-colors
            cursor-pointer"
            >
               Junte-se
            </Link> 
            )
        }
    
    </>
            
            
        
        
    )
}