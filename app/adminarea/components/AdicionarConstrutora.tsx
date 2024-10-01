"use client"

import { auth, db } from "@/app/firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"

export const AdicionarConstrutora = () => {

    const [name, setName] = useState("")
    const curUser = auth.currentUser

    async function adicionarConstrutora() {
        try{
            addDoc(collection(db, "construtoras"), {
                nome: name,
                nomeVal: name.toLocaleLowerCase(),
                createdBy: curUser?.uid
            })
            setName("");    
        } catch(e) {
            console.log(e)
        } finally {
            console.log("feitooo")
        }
    }

    return (
        <div className="w-full mt-12 flex flex-col justify-center items-center outline-none">
                <h1 className="text-xl font-semibold">adicionar construtora</h1>

                <input type="text" placeholder="nome da construtora" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                value={name} onChange={(e) => setName(e.target.value)}/>

                <button onClick={adicionarConstrutora} className="bg-customPrimary text-white w-40 h-10 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-8">adicionar construtora</button>
        </div>
    )
}