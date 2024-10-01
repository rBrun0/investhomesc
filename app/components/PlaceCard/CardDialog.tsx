"use client"

import { DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useState } from "react"



export const CardDialog = ({codigoDoImovel}: {codigoDoImovel: string}) => {

    const [telephone, setTelephone] = useState("")
    const [yourName, setYourName] = useState("")
    const [message, setMessage] = useState("")

    function sendMessageToWhatsapp() {
        if(!telephone || !yourName || !message) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        // window.open(`https://api.whatsapp.com/send?phone=${telephone}&text=Olá, me chamo ${yourName}! ${message}`, "_blank")
    }

    return (
        <DialogContent className="flex flex-col items-center bg-zinc-100">
            <DialogHeader className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Fale com o anunciante!</h1>
            <p className="font-medium text-lg">(99) 99999999</p>
            </DialogHeader>

            <textarea name="" id="" className="shadow-lg w-full h-40 outline-none p-2 text-zinc-800" placeholder={`ola, gostei do imovel: cod ${codigoDoImovel}`}
            value={message} onChange={(e) => setMessage(e.target.value)}>
            </textarea>
            <input type="text" name="" id="" className="shadow-lg w-full outline-none p-2 text-zinc-800" placeholder="Seu Nome"
             value={yourName} onChange={(e) => setYourName(e.target.value)}/>

            <input type="text" name="" id="" className="shadow-lg w-full outline-none p-2 text-zinc-800" placeholder="55 99 999999999"
             value={telephone} onChange={(e) => setTelephone(e.target.value.trim())}/>

            <button className="shadow-lg w-32 h-12 rounded-md hover:bg-black hover:text-white transition-colors" onClick={sendMessageToWhatsapp}>ENVIAR</button>
        </DialogContent>
    )
}