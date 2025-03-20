"use client"

import { DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"



export const CardDialog = ({codigoDoImovel, numeroAnunciante}: {codigoDoImovel: string, numeroAnunciante: string}) => {

    // const [telephone, setTelephone] = useState("")
    const [yourName, setYourName] = useState("")
    const [message, setMessage] = useState("")

    function sendMessageToWhatsapp() {
        if(!yourName || !message) {
            toast.error("Por favor, preencha todos os campos.")
            return
        }

        if(!numeroAnunciante) return;

        window.open(`https://api.whatsapp.com/send?phone=${numeroAnunciante?.split(" ")?.join("")?.replace("-", "")?.slice(4)}&text=Olá, me chamo ${yourName}! ${message}`, "_blank")
    }

    return (
        <DialogContent className="flex flex-col items-center bg-zinc-100">
            <DialogHeader className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Fale com o anunciante!</h1>
            <p className="font-medium text-lg">
                {
                `(${String(numeroAnunciante).slice(0,2)}) ${String(numeroAnunciante).slice(2,4)} ${String(numeroAnunciante).slice(4,9)}-${String(numeroAnunciante).slice(9,13)}`
                }
                </p>
            </DialogHeader>

            <textarea name="" id="" className="border rounded-md w-full h-40 outline-none p-2 text-zinc-800"
             placeholder={`Olá, gostei do imóvel: cód ${codigoDoImovel}`}
            value={message} onChange={(e) => setMessage(e.target.value)}>
            </textarea>
            <input type="text" name="" id="" className="border rounded-md w-full outline-none p-2 text-zinc-800" placeholder="Seu nome"
             value={yourName} onChange={(e) => setYourName(e.target.value)}/>

            {/* <input type="text" name="" id="" className="border rounded-md w-full outline-none p-2 text-zinc-800" placeholder="5545999999999"
             value={telephone} onChange={(e) => setTelephone(e.target.value.trim())}/> */}

            <button className="shadow-lg w-32 h-12 rounded-md hover:bg-black hover:text-white transition-colors" onClick={sendMessageToWhatsapp}>ENVIAR</button>
        </DialogContent>
    )
}