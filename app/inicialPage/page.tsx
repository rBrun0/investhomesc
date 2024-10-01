'use client'

import Image from "next/image"
import { PlaceCard } from "../components/PlaceCard/PlaceCard"
import { FaWaze } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import React from "react";
import office from "@/app/assets/office.avif"
import { MyAccordion } from "./components/MyAccordion";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CondominumsType, ConstructorsType, PropertyType } from "../@Types/types";
import Link from "next/link";
import { OurCondominums } from "./components/OurCondominums";
import { OurConstructionsCompanies } from "./components/OurConstructionsCompanies";
import { ActingCities } from "./components/ActingCities";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValues } from "../features/filterValues/filterValuesSlice";
import { FastSearch } from "./components/FastSearch";
import { MainPanel } from "../components/MainPanel/MainPanel";
import { RootState } from "../store";



function InicialPage () {   
    
    const dispatch = useDispatch()

    const filterValues = useSelector((state: RootState) => state.filterValuesSlice)

    const [saleApartments, setSaleApartments] = useState<PropertyType[] | null>([])
    const [condominios, setCondominios] = useState<CondominumsType[]>([])
    const [construtoras, setConstrutoras] = useState<ConstructorsType[]>([])

    const furnishedApartment = saleApartments?.filter((ap) => ap.perfil.includes("mobiliado"))[0]
    const quadraMarApartment = saleApartments?.filter((ap) => ap.perfil.includes("frente mar"))[0]
    const frenteMarApartment = saleApartments?.filter((ap) => ap.perfil.includes("frente mar"))[0]

    const fetchData = async () => {
    
        const querySnapshot = await getDocs(collection(db,"imoveis"))
        querySnapshot.forEach((doc) => {
            setSaleApartments((prev: any) => {
                return [...prev, doc.data()]
            })
        }
    )

    const fireBaseCondominiums = await getDocs(collection(db,"condominios"))
    fireBaseCondominiums.forEach((doc) => {
        setCondominios((prev: any) => {
            return [...prev, doc.data()]
        })
    }
)

    const fireBaseConstrutors = await getDocs(collection(db,"construtoras"))
        fireBaseConstrutors.forEach((doc) => {
            setConstrutoras((prev: any) => {
                return [...prev, doc.data()]
            })
        }
)
};



    useEffect(() => {
    fetchData();
      }, []);

    return (
        <>
        <MainPanel/>

        <main className="w-full min-h-screen mt-20 space-y-10 mb-10 flex flex-col justify-center items-center">

            <div className="flex flex-col items-start justify-center space-y-6">
            <Link href={"/advancedsearch"} className="w-40 h-12 rounded-3xl bg-customPrimary text-white font-semibold cursor-pointer ml-16 md:ml-10
            border-2 border-customPrimary hover:bg-white hover:text-customPrimary transition-colors flex justify-center items-center"
            onClick={() =>  dispatch(setFilterValues({propertyProfile: "mobiliado"}), console.log(filterValues))}>
                MOBILIADOS
            </Link>

            {
                furnishedApartment && (
                    <PlaceCard areaPrivativa={furnishedApartment.areaPrivativa} bairro={furnishedApartment.bairro} cidade={furnishedApartment.cidade} codigo={furnishedApartment.codigoImovel} dataEntregaEmpreendimento={furnishedApartment.dataEntregaEmpreendimento}
                    descricao={furnishedApartment.descricao} id={furnishedApartment.id} imagemUrl={furnishedApartment.imagensUrl} numeroLocal={furnishedApartment.numeroLocal} numeroRua={furnishedApartment.numeroRua} preco={furnishedApartment.preco} quartos={furnishedApartment.quartos}
                    suites={JSON.stringify(furnishedApartment.suites)} vagas={furnishedApartment.vagas} direcionamento="apartmentgallery"/>
                )

                
            }

            <Link href={"/advancedsearch"} className="w-40 h-12 rounded-3xl bg-customPrimary text-white font-semibold cursor-pointer ml-16 md:ml-10  mt-6 md:mb-0 
            border-2 border-customPrimary hover:bg-white hover:text-customPrimary transition-colors flex justify-center items-center"
            onClick={() => dispatch(setFilterValues({propertyProfile: "frente mar"}))}>
                FRENTE MAR
            </Link>

            {
                quadraMarApartment && (
                    <PlaceCard areaPrivativa={quadraMarApartment.areaPrivativa} bairro={quadraMarApartment.bairro} cidade={quadraMarApartment.cidade} codigo={quadraMarApartment.codigoImovel} dataEntregaEmpreendimento={quadraMarApartment.dataEntregaEmpreendimento}
                    descricao={quadraMarApartment.descricao} id={quadraMarApartment.id} imagemUrl={quadraMarApartment.imagensUrl} numeroLocal={quadraMarApartment.numeroLocal} numeroRua={quadraMarApartment.numeroRua} preco={quadraMarApartment.preco} quartos={quadraMarApartment.quartos}
                    suites={JSON.stringify(quadraMarApartment.suites)} vagas={quadraMarApartment.vagas} direcionamento="apartmentgallery"/>
                )
            }

            <Link href={"/advancedsearch"} className="w-40 h-12 rounded-3xl bg-customPrimary text-white font-semibold cursor-pointer ml-16 md:ml-10 mt-6 md:mb-0
            border-2 border-customPrimary hover:bg-white hover:text-customPrimary transition-colors flex justify-center items-center"
            onClick={() => dispatch(setFilterValues({propertyProfile: "quadra mar"}))}>
                QUADRA MAR
            </Link>

            {
                frenteMarApartment && (
                    <PlaceCard areaPrivativa={frenteMarApartment.areaPrivativa} bairro={frenteMarApartment.bairro} cidade={frenteMarApartment.cidade} codigo={frenteMarApartment.codigoImovel} dataEntregaEmpreendimento={frenteMarApartment.dataEntregaEmpreendimento}
                    descricao={frenteMarApartment.descricao} id={frenteMarApartment.id} imagemUrl={frenteMarApartment.imagensUrl} numeroLocal={frenteMarApartment.numeroLocal} numeroRua={frenteMarApartment.numeroRua} preco={frenteMarApartment.preco} quartos={frenteMarApartment.quartos}
                    suites={JSON.stringify(frenteMarApartment.suites)} vagas={frenteMarApartment.vagas}direcionamento="apartmentgallery" />
                )
            }

            </div>
            

            <FastSearch/>


            <section className="w-full md:w-11/12 lg:w-10/12 pt-14 px-20 md:px-20 lg:px-28 bg-zinc-100">
                <h3 className="text-xl md:text-2xl">CONHECA A MELHOR IMOBILIARIA DE</h3>
                <h1 className="text-primary text-5xl lg:text-6xl font-extrabold tracking-wide">Itapema/SC</h1>

                <div className="w-44 h-[2px] bg-black mt-3"/>

                <div className="relative object-cover w-full h-80 mt-12">
                <Image src={office} fill alt="imagem-estabelecimento"/>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:justify-around mt-7">

                    <div>
                        <h1 className="text-3xl font-semibold">(47) 3268-3996 - (47) 3268-6320</h1>
                        <p className="text-center tracking-wider font-light text-lg" >Segunda Avenida 292 - Sala 1, 2, 4 <br />
                        Esq Rua 278, Meia Praia - Itapema / SC
                        </p>

                    </div>

                    <div className="w-[1px] h-28 bg-black hidden lg:block"></div>

                    <div className="flex space-x-24 justify-center items-center">
                        <h1 className="text-blue-400">Tenha acesso a <br /> localização <br /> clicando nos ícones</h1>

                        <FaWaze className="w-20 h-20"/>
                        <CiLocationOn className="w-20 h-20 text-yellow-400"/>
                    </div>

                </div>

            </section>


            <section className="bg-zinc-50 w-[80%] flex flex-col justify-start items-center px-12 py-8 space-y-2">

            <h1 className="text-xl md:text-2xl font-bold text-center">Imóveis em Itapema, Meia Praia e Centro – Lazarotto Imóveis | Lazarotto Investimentos | Imobiliárias Lazarotto</h1>

            <h2 className="text-center text-lg md:text-xl font-semibold">Apartamentos, terrenos, casas, Imóveis em geral na melhor imobiliária de Itapema e Meia Praia.</h2>

            <p className="text-center text-xs md:text-sm tracking-wide">A Lazarotto Imóveis é especialista no mercado de luxo de Itapema/SC, vamos até você cliente, para levar conhecimento, experiência
             e segurança em sua compra, dispondo de um jurídico altamente profissional, propondo qualidade do atendimento.
            </p>

            <p className="text-center text-xs md:text-sm tracking-wide">
            Agende sua visita e venha conhecer nossas imobiliárias e o mercado de Itapema e Meia Praia. Não são apenas 
            as belas praias que fazem de Itapema um verdadeiro paraíso à beira mar. Sua localização
            privilegiada é um dos diferenciais dentre os principais destinos turísticos da América Latina.
            Cortada pela BR-101, ligação estratégica de todo eixo leste Catarinense.
            </p>

            <p className="text-center text-xs md:text-sm tracking-wide">
            Itapema está apenas 50 minutos de dois aeroportos 
            internacionais, o de Florianópolis e de Navegantes, 
            isso sem contar o Condomínio Aeronáutico Costa Esmeralda, o preferido das celebridades.
            </p>

            <p className="text-center text-xs md:text-sm">
            Com essas facilidades logísticas únicas, fica ainda mais fácil desfrutar da Via Gastronômica, 
            e tendo as praias e a mata Atlântica preservada como cenário.
            Isto torna Itapema o lugar certo para você investir com segurança e rentabilidade.
            </p>

            </section>


             {/* CONDOMINIOS */}

            <section className="bg-zinc-100 w-[80%] flex flex-col justify-start items-center px-12 py-8 space-y-2">

                <h1 className="w-full text-start text-xl text-orange-500 font-bold ">CONDOMINIOS</h1>


                <OurCondominums condominumsList={condominios}/>

                

                {/* CONSTRUTORAS */}

                <div className="bg-zinc-400 h-[1px] w-full"/>

                <h1 className="w-full text-start text-xl text-orange-500 font-bold ">CONSTRUTORAS</h1>

                <OurConstructionsCompanies construtoras={construtoras}/>

            </section>

            <section className="bg-zinc-50 pt-8 w-[80%] mx-auto flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Veja as principais dúvidas dos clientes da Imobiliária</h1>

            <MyAccordion/>

            <Link href={"/faq"}>
                <button className="bg-customPrimary text-white w-64 h-10 rounded-md cursor-pointer mt-10 md:mr-[79%]">
                    VEJA TODAS AS PERGUNTAS
                </button>
            </Link>


            </section>

            <section className="bg-zinc-100 pt-8 w-[80%]">
                <div className="mx-auto px-6 py-6 space-y-4">

                    <ActingCities />

                </div>

            </section>

        </main>
        </>
    )
}

export default InicialPage