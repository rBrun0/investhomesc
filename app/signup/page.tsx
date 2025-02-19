'use client'

import { createUserWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { auth, db } from "../firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header/Header";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { toast, Toaster } from "sonner"
import { Roles } from "@/lib/utils";



function Signup() {

    const router = useRouter()

    const [existingUsers, setExistingUsers] = useState<User[]>();
    // const [usuario, setUsuario] = useState<User>()
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const user = auth.currentUser

    // const provider = new GoogleAuthProvider();

    async function listUsers() {
        const q = query(collection(db, 'users'))
        const querySnapshot = await getDocs(q)
        const tempUsers = []

        querySnapshot.forEach((u) => {
            tempUsers.push(u.data())
        } )

        setExistingUsers(tempUsers)
        console.log(existingUsers)
    }
    
    console.log(existingUsers)

    // function handleSignIn() {
    //     signInWithPopup(auth, provider).then((result) => {
    //         console.log("User signed in successfully!", result);
    //         console.log(result.user)
    //         setUsuario(result.user)
    //     }).catch(() => {
    //         console.log("Error signing in with popup");
    //     })
    // }

    async function handleCreateUser() {

        if(!email || !password || !displayName) {
            toast.error('Todos os campos são obrigatórios!')
            return
        }

        if(password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres!')
            return
        }

        if(existingUsers.some(u => u.email === email)) {
            toast('Já existe um usuário com este email!', {
                description: "Usuário já encontrado!",
            })
            return
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredentials.user.uid

            await setDoc(doc(db,"users", uid), {
                uid: userCredentials.user.uid,
                displayName: displayName,
                email: email,
                password: password,
                role: Roles.COMUM,
                createdAt: String(new Date())
            })

            toast.success("Usuário criado com sucesso!")
        } catch(e) {
            console.log("error ", e)
            toast.error("Erro ao criar usuário!")
        }
    }

    useEffect(() => {
        listUsers()
        if(user) {
            router.push('/')
        }
    }, [])

    onAuthStateChanged(auth, () => {
        const user = auth.currentUser
        if(user) {
            router.push('/')
        }
    })

    return (

        <>
        <Header/>

        <main className="w-full min-h-screen">
        <h1 className="text-center font-semibold text-2xl md:text-3xl mt-7 text-zinc-600">
            Olá , você é um corretor e deseja poder divulgar imóveis? Registre-se!
        </h1>
    
        <div className="min-w-[25rem] w-3/5 h-96 border shadow-sm rounded-md mx-auto mt-8 flex flex-col gap-3">
            <div className="flex flex-col justify-center gap-4 mt-20 mx-auto">

                <input type="email" placeholder="Nome de usuário" className="w-96 border px-3 py-2 rounded-md outline-none"
                value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>

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
                hover:bg-white hover:text-customPrimary transition-colors"
                onClick={handleCreateUser}>
                    Criar
                </button>

                <Link href="/signin" className="text-zinc-400 hover:text-black transition-colors cursor-pointer">
                    Já tem conta? Entre!
                </Link>
                </div>
            </div>

        <Toaster />
        </div>
        </main>
    </>
    )
}

export default Signup