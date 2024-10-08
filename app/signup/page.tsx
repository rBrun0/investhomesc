'use client'

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { auth } from "../firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";


function signup() {

    const router = useRouter()

    const [usuario, setUsuario] = useState<User>()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const user = auth.currentUser

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

    function handleCreateUser() {
        if(!email || !password) {
            alert('Todos os campos são obrigatórios!')
            return
        }

        if(password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!')
            return
        }

        onAuthStateChanged(auth, () => {
            const user = auth.currentUser
            if(user) {
                router.push('/')
            }
        })

        createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        console.log("User created successfully", userCredential)
       }).catch((error: Error) => {
        alert(error.message)
       })
    }

    useEffect(() => {
        if(user) {
            router.push('/')
        }
    }, [])

    return (

        <main className="w-full min-h-screen">
        <h1 className="text-center font-semibold text-2xl md:text-3xl mt-7">Olá , você e um corretor e deseja poder divulgar imóveis? Registre-se!</h1>
    
        <div className="min-w-[25rem] w-3/5 h-96 shadow-lg mx-auto mt-8 flex flex-col gap-3">
            <div className="flex flex-col justify-center gap-4 mt-20 mx-auto">

                <input type="email" placeholder="corretor@gmail.com" className="w-96 border px-3 py-2 rounded-md outline-none"
                value={email} onChange={(e) => setEmail(e.target.value)}/>

                <div className="relative">
                <input type={`${showPassword ?'text' : 'password'}`} placeholder="senha" className="w-96 border px-3 py-2 rounded-md outline-none"
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                {
                    showPassword? <IoMdEyeOff className="absolute right-3 top-3" 
                    onClick={() => setShowPassword(!showPassword)}/> : <FaEye className="absolute right-3 top-3"
                     onClick={() => setShowPassword(!showPassword)}/>
                }   
                </div>

                <div className="w-full flex items-center justify-between px-2">
                <button className="w-24 h-8 bg-customPrimary text-white font-semibold tracking-wider rounded-md 
                px-12 flex justify-center items-center border-[2px] border-customPrimary
                hover:bg-white hover:text-customPrimary transition-colors" onClick={handleCreateUser}>Criar</button>

                <Link href="/signin" className="text-zinc-400 hover:text-black transition-colors cursor-pointer">
                    Já tem conta? Entre!
                </Link>
                </div>
            </div>


        </div>
        </main>
    )
}

export default signup