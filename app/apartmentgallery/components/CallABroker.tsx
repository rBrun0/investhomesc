'use client'

import { useState } from "react"

export const CallABroker = ({announcingNumber}: {announcingNumber: string}) => {

    const [yourName, setYourName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")

    function sendMessage() {
        if(!yourName || !phoneNumber || !message) {
            alert("Todos os campos devem ser preenchidos!")
            return
        }

        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá, me chamo ${yourName}! ${message}`, "_blank")
    }

    return (
        <div className="md:w-72 md:h-80 flex flex-col justify-center items-center shadow-sm border rounded-md bg-zinc-100 py-2 gap-1">
                    <h1 className="text-customPrimary font-semibold">CHAMAR UM CORRETOR</h1>
                    <p className="text-zinc-700 font-medium">
                        {`${String(announcingNumber).slice(0, 2)} ${String(announcingNumber).slice(2, 4)} ${String(announcingNumber)
                        .slice(4, 9)}-${String(announcingNumber).slice(9, 13)}`}
                    </p>

                    <textarea name="" id="" className="w-10/12 h-20 outline-none border rounded-md px-2"
                    value={message} onChange={(e) => setMessage(e.target.value)}>
                    </textarea>

                    <input type="text" placeholder="Nome" className="w-10/12 outline-none pl-2 rounded-md border
                     mt-3 h-10 md:h-6"
                    value={yourName} onChange={(e) => setYourName(e.target.value)}/>

                    <input type="tel" name="" id="" placeholder="5545999999999"  className="w-10/12 outline-none pl-2 
                    rounded-md border h-10 md:h-6
                     mt-3"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.trim())}/>

                    <button className="w-10/12 outline-none pl-2 rounded-md border-[1px]
                    border-customPrimary bg-customPrimary text-white mt-3" onClick={sendMessage}>
                        ENVIAR
                    </button>
                </div>
    )
}