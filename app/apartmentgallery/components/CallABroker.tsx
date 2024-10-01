'use client'

import { useState } from "react"

export const CallABroker = () => {

    const [yourName, setYourName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")

    function sendMessage() {
        if(!yourName || !phoneNumber || !message) {
            alert("Todos os campos devem ser preenchidos!")
            return
        }

        // window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá, me chamo ${yourName}! ${message}`, "_blank")
    }

    return (
        <div className="md:w-56 md:h-64 flex flex-col justify-center items-center shadow-lg rounded-md bg-zinc-100 py-2">
                    <h1 className="text-customPrimary font-semibold">CHAMAR UM CORRETOR</h1>
                    <p className="text-zinc-700 font-medium">(47) 999212-9052</p>

                    <textarea name="" id="" className="w-10/12 h-20 outline-none border-[1px] border-black rounded-md"
                    value={message} onChange={(e) => setMessage(e.target.value)}>
                    </textarea>

                    <input type="text" placeholder="Nome" className="w-10/12 outline-none pl-2 rounded-md border-[1px]
                    border-black mt-3 h-10 md:h-6"
                    value={yourName} onChange={(e) => setYourName(e.target.value)}/>

                    <input type="tel" name="" id="" placeholder="55 99 999999999"  className="w-10/12 outline-none pl-2 
                    rounded-md border-[1px] h-10 md:h-6
                    border-black mt-3"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.trim())}/>

                    <button className="w-10/12 outline-none pl-2 rounded-md border-[1px]
                    border-customPrimary bg-customPrimary text-white mt-3" onClick={sendMessage}>
                        ENVIAR
                    </button>
                </div>
    )
}