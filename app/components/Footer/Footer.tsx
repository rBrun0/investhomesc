'use client'

import { FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/firebaseConfig";


export const Footer = () => {

    const dispatch = useDispatch()

    const [linkInstagram, setLinkInstagram] = useState('')
    const [linkFacebook, setLinkFacebook] = useState('')
    const [linkWhatsapp, setLinkWhatsapp] = useState('')
    const [linkYoutube, setLinkYoutube] = useState('')

    function filtrar(cidade: string, perfil: string) {
        dispatch(setFilterValues({
            cities: cidade,
            propertyProfile: perfil
        }))
    }

    const fetchSiteData = async () => {
        const docRef = doc(db, "settings", "site");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            const data = snap.data();
            setLinkInstagram(data.linkInstagram)
            setLinkFacebook(data.linkFacebook)
            setLinkWhatsapp(data.linkWhatsapp)
            setLinkYoutube(data.linkYoutube)

      }
    };

    useEffect(() => {
        fetchSiteData()
    }, [])

    return (
        <footer className="bg-customPrimary w-full text-white flex justify-center items-start mt-12 flex-wrap py-3">
            <main className="w-11/12 min-h-[300px] flex justify-between items-start flex-wrap pt-6 pl-20 px-12 md: pl-0 md:px-32 space-y-8 bg-customPrimary">

            <section className="flex flex-col items-center justify-center md:translate-y-7">
                <div className="flex flex-col justify-center items-center border-2 border-solid border-white w-72 h-16 rounded-md">
                <h1 className="font-semibold">Comprar apartamentos em</h1>
                <h1 className="text-yellow-200 font-semibold">Itapema</h1>
                </div>

                <Link href={"/advancedsearch"} className="font-extralight mt-2" onClick={() => filtrar('Itapema', 'Frente Mar')}>Frente Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Itapema', 'Quadra Mar')} >Quadra Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Itapema', 'Mobiliado')}>Mobiliados</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Itapema', 'Showroom')}>Showroom</Link>
            </section>

            <section className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center border-2 border-solid border-white w-72 h-16 rounded-md">
                <h1 className="font-semibold">Comprar apartamentos em</h1>
                <h1 className="text-yellow-200 font-semibold">Porto belo</h1>
                </div>

                <Link href={"/advancedsearch"} className="font-extralight mt-2" onClick={() => filtrar('Porto Belo', 'Frente Mar')}>Frente Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Porto Belo', 'Quadra Mar')}>Quadra Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Porto Belo', 'Mobiliado')}>Mobiliados</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Porto Belo', 'Showroom')}>Showroom</Link>
                
            </section>

            <section className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center border-2 border-solid border-white w-72 h-16 rounded-md">
                <h1 className="font-semibold">Comprar apartamentos em</h1>
                <h1 className="text-yellow-200 font-semibold">Balneário Camboriú</h1>
                </div>

                <Link href={"/advancedsearch"} className="font-extralight mt-2" onClick={() => filtrar('Balneario Camboriu', 'Frente Mar')}>Frente Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Balneario Camboriu', 'Quadra Mar')}>Quadra Mar</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Balneario Camboriu', 'Mobiliado')}>Mobiliados</Link>
                <Link href={"/advancedsearch"} className="font-extralight" onClick={() => filtrar('Balneario Camboriu', 'Showroom')}>Showroom</Link>
                
            </section>

            <section className="pt-4 border-t-[1px] border-t-white w-72 space-y-2">
                <div className="w-72 h-12 border-white border-[1px] rounded-md flex justify-center items-center">
                    Anunciar Imoveis
                </div>

                <div className="w-72 border-white border-[1px] rounded-md flex flex-col justify-center items-center py-2">
                    <h3>siga-nos</h3>

                    <div className="flex justify-center items-center space-x-2 text-white font-semibold text-2xl">
                        {
                            linkInstagram && <Link href={linkInstagram} target="_blank" rel="noreferrer"><AiFillInstagram/></Link>
                        }

                        {
                            linkFacebook && <Link href={linkFacebook} target="_blank" rel="noreferrer"><FaFacebook/></Link>
                        }

                        {
                            linkWhatsapp && <Link href={linkWhatsapp} target="_blank" rel="noreferrer"><IoLogoWhatsapp/></Link>
                        }

                        {
                            linkYoutube && <Link href={linkYoutube} target="_blank" rel="noreferrer"><FaYoutube/></Link>
                        }
                    </div>
                </div>
            </section>


            </main>
        
        </footer>
    )
}