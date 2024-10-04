'use client'

import { FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";


export const Footer = () => {

    const dispatch = useDispatch()

    function filtrar(cidade: string, perfil: string) {
        dispatch(setFilterValues({
            cities: cidade,
            propertyProfile: perfil
        }))
    }

    return (
        <footer className="bg-customPrimary w-full text-white flex justify-center items-start mt-12 flex-wrap py-3">
            <main className="w-11/12 min-h-[300px] flex justify-between items-start flex-wrap pt-6 px-12 md:px-32 space-y-8 bg-customPrimary">

            <section className="flex flex-col items-center justify-center md:translate-y-7">
                <div className="flex flex-col justify-center items-center border-2 border-solid border-white w-72 h-16 rounded-md">
                <h1 className="font-semibold">Comprar apartamentos em</h1>
                <h1 className="text-yellow-200 font-semibold">Itapema</h1>
                </div>

                <Link href={"/advancedsearch"} className="font-extralight mt-2" onClick={() => filtrar('Itapema', 'Frente Mar')}>Frente Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Itapema', 'Quadra Mar')} >Quadra Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Itapema', 'Mobiliados')}>Mobiliados</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Itapema', 'Showroom')}>Showroom</Link>
            </section>

            <section className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center border-2 border-solid border-white w-72 h-16 rounded-md">
                <h1 className="font-semibold">Comprar apartamentos em</h1>
                <h1 className="text-yellow-200 font-semibold">Porto belo</h1>
                </div>

                <Link href={"/advancedsearch"} className="font-extralight mt-2" onClick={() => filtrar('Porto Belo', 'Frente Mar')}>Frente Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Porto Belo', 'Quadra Mar')}>Quadra Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Porto Belo', 'Mobiliados')}>Mobiliados</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Porto Belo', 'Showroom')}>Showroom</Link>
                
            </section>

            <section className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center border-2 border-solid border-white w-72 h-16 rounded-md">
                <h1 className="font-semibold">Comprar apartamentos em</h1>
                <h1 className="text-yellow-200 font-semibold">Balneario Camboriu</h1>
                </div>

                <Link href={"/advancedsearch"} className="font-extralight mt-2" onClick={() => filtrar('Balneario Camboriu', 'Frente Mar')}>Frente Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Balneario Camboriu', 'Quadra Mar')}>Quadra Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Balneario Camboriu', 'Mobiliados')}>Mobiliados</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Balneario Camboriu', 'Showroom')}>Showroom</Link>
                
            </section>

            {/* <section className="w-72 flex flex-col items-center justify-center pt-8 border-t-2 border-zinc-200 border-solid">
                <Link href={"/advancedsearch"} className="font-thin">A Imobiliaria</Link>
                <Link href={"https://wa.me/999999999"} className="font-thin">Contato</Link>
            </section>

            <section className="w-80 flex flex-col justify-center pt-8 border-t-2 border-zinc-200 border-solid">
                <h1 className="text-sm">CUB - SETEMBRO DE 2024</h1>
                <p className="text-xs">Confira o valor do CUB</p>

                <div className="w-full flex flex-wrap justify-center items-center gap-1 mx-auto pt-2">
                    <span className="bg-zinc-100 text-primary w-[104px] h-8 flex justify-center items-center"> R$ / M2</span>
                    <span className="bg-zinc-100 text-primary w-[104px] h-8 flex justify-center items-center">% MES</span>
                    <span className="bg-zinc-100 text-primary w-[104px] h-8 flex justify-center items-center">% ANO</span>
                    <span className="bg-zinc-100 text-primary w-[104px] h-8 flex justify-center items-center">R$ 2481,00</span>
                    <span className="bg-zinc-100 text-primary w-[104px] h-8 flex justify-center items-center">1,05%</span>
                    <span className="bg-zinc-100 text-primary w-[104px] h-8 flex justify-center items-center">3,24%  </span>
                </div>

                <h1 className="text-sm pt-2">Calcule sua parcela</h1>
                <p className="text-xs">Informe a quantidade de CUB's</p>
                <div className="m-auto flex">
                <input type="number" placeholder="CUB's" className="text-zinc-700 flex w-60 outline-none h-10 p-2 rounded-md"/>
                <button className="bg-yellow-200 hover:bg-yellow-300 transition-colors font-semibold w-20 rounded-md">Calcular</button>
                </div>

            </section> */}

            <section className="pt-4 border-t-[1px] border-t-white w-72 space-y-2">
                <div className="w-72 h-12 border-white border-[1px] rounded-md flex justify-center items-center">
                    Anunciar Imoveis
                </div>

                <div className="w-72 border-white border-[1px] rounded-md flex flex-col justify-center items-center py-2">
                    <h3>siga-nos</h3>

                    <div className="flex justify-center items-center space-x-2 text-white font-semibold text-2xl">
                        <FaYoutube/>
                        <IoLogoWhatsapp/>
                        <FaFacebook/>
                        <AiFillInstagram/>
                    </div>
                </div>
            </section>


            </main>
        
        </footer>
    )
}