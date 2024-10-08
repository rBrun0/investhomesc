import Image from "next/image"
import beachImage from '../../assets/mainBeach.jpg'
import { RoomsList } from "./components/RoomsList/RoomsList"
import { SelectCamp } from "./components/SelectCamp/SelectCamp"
import Link from "next/link"
import praia from "@/app/assets/praia.jpg"
import { MinAndMaxValues } from "./components/MinAndMaxValues"

export const MainPanel = () => {


    
    return (

    <main className="w-full relative h-[600px] md:h-[460px] flex justify-center items-center text-white">
        <Image src={praia} alt="imagem-praia" fill objectFit="cover" className="absolute -z-50"/>

        <section className="w-11/12 h-[34rem] md:h-[24rem] lg:h-96 rounded-md flex flex-col justify-start items-center space-y-6 relative">

            <div className="absolute left-0 top-0 bg-black w-full h-full -z-10 opacity-60"/>

            <h1 className="text-white text-center text-2xl md:text-3xl tracking-wider lg:text-4xl px-3 pt-6 font-semibold">Somente Vendas! Não trabalhamos com aluguel</h1>



            <div className="flex flex-wrap justify-center w-[90%] gap-2 md:gap-4 lg:gap-8  ">

            <SelectCamp/>

             <MinAndMaxValues/>

             <RoomsList/>

             <Link href={"/advancedsearch"}>
                <button className="w-24 h-9 bg-customPrimary text-white rounded-md">BUSCAR</button>
             </Link>

            </div>

        </section>

    </main>

    )
}