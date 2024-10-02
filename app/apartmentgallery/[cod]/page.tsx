'use client'

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { TbZoomInArea } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { PlaceCard } from "@/app/components/PlaceCard/PlaceCard";
import { MainGallery } from "../components/MainGallery";
import { CompleteGallery } from "../components/CompleteGallery";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { PropertyType } from "@/app/@Types/types";
import { formatToBrl } from "@/app/@Types/utils/formatToBrl";
import { CallABroker } from "../components/CallABroker";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import {FacebookShareButton, WhatsappShareButton} from "react-share"
import { usePathname } from "next/navigation";
import Link from "next/link";

type ApartmentGalleryProps = {
    params: {
        cod: string
    }
}

export default function apartmentgallery({params}: ApartmentGalleryProps) {

    const path = usePathname()

    const {cod} = params

    const [searchedApartments, setSearchedApartments] = useState<PropertyType[] | null>([])
    const searchedApartment = searchedApartments?.filter(ap => ap.codigoImovel = cod)[0] ; 

    const fetchData = async () => {
    
        const querySnapshot = await getDocs(collection(db,"imoveis"))
        querySnapshot.forEach((doc) => {
            setSearchedApartments((prev: any) => {
                console.log(doc.data())
                return [...prev, doc.data()]
            })
        }
    )
}

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD_sE_BNwqZAcxhGyhqtSzRTx0EsxEYvAU"
      })

    useEffect(() => {
        fetchData();
          }, []);

    return (
        <div className="w-full flex flex-col items-center">


            {/* first gallery */}
            
            
            {
                searchedApartment && <MainGallery imagesList={searchedApartment.imagensUrl}/>
            }

            <h1 className="w-9/12 text-zinc-500 text-center md:text-start text-2xl font-semibold mt-12"
            >APARTAMENTO EM {searchedApartment && searchedApartment.bairro.toUpperCase()} de {searchedApartment && searchedApartment.cidade.toUpperCase()} | {searchedApartment?.suites} SUÍTES | 257M²
            </h1>

            <div className="w-9/12 flex flex-col md:flex-row justify-between mt-4">

            <p className="text-center md:text-start text-2xl text-customPrimary font-semibold">Cód: {cod}</p>

            <div className="flex justify-center flex-wrap space-x-2 w-full md:w-auto gap-6 md:gap-0 mt-8 md:mt-0">

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">venda</span> <span className="font-semibold text-zinc-600">
                        <span>{searchedApartment && formatToBrl(searchedApartment.preco)}</span>
                        </span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">Área Privativa</span> <span className="font-semibold flex justify-center items-center space-x-1">
                        <TbZoomInArea/>
                    <span className=" text-zinc-600">{searchedApartment && searchedApartment.areaPrivativa} m²</span></span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">Dormitórios</span> <span className="font-semibold  text-zinc-600 flex justify-center items-center space-x-1">
                        <FaBed/>
                        <span>{searchedApartment && searchedApartment.quartos}</span></span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">Suítes</span> <span className="font-semibold text-zinc-600 flex justify-center items-center space-x-1">
                        <FaBed/>
                        <span>{searchedApartment && searchedApartment.suites}</span></span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">vagas</span> <span className="font-semibold text-zinc-600 flex justify-center items-center space-x-1">
                    <FaCarAlt/> <span>{searchedApartment && searchedApartment.vagas}</span>
                    </span>
                </div>

                <div className="flex flex-col justify-center items-center pr-3">
                    <span className="text-xs">Data de Entrega do Empreendimento</span>
                    <span className="font-semibold flex justify-center items-center space-x-1 text-zinc-600">
                        <FaCalendarAlt/> <p>{searchedApartment && searchedApartment.dataEntregaEmpreendimento}</p>
                        </span>
                </div>

            </div>


            </div>

            <nav className="w-full min-h-24 bg-zinc-100 flex flex-col md:flex-row justify-between items-center md:px-48 mt-8 space-y-10 md:space-y-0 py-2">
                <div className="flex  justify-center items-center space-x-14 md:space-x-8 text-customPrimary font-semibold px-2">
                    <Link href={'#description'}>
                    <span className="cursor-pointer">DESCRICAO</span>
                    </Link>
                    <Link href={'#mapa-local'}>
                    <span className="cursor-pointer">MAPA DO LOCAL</span>
                    </Link>

                    <Link href={"#secao-fotos"}>
                    <span className="cursor-pointer flex justify-center items-center space-x-1"><span>FOTOS</span> <FaCameraRetro/></span>
                    </Link>
                </div>

                <div className="flex space-x-2">
                    {/* <FaFacebook className="text-blue-400 w-8 h-8 md:w-16 md:h-16"/> */}
                    <FacebookShareButton url={path} hashtag="olha esse imovel!! #INVESTE&HOME">
                        <FaFacebook className="text-blue-400 w-8 h-8 md:w-16 md:h-16"/>
                    </FacebookShareButton>
                    <WhatsappShareButton url={path}>
                    <FaWhatsapp className="text-green-600 w-8 h-8 md:w-16 md:h-16"/>
                    </WhatsappShareButton>
                </div>
            </nav>

            <section className="w-9/12 flex flex-col md:flex-row mt-8 justify-between space-y-8 md:space-y-0">

                {/* descricao */}

                <div className="w-4/6" id="description">
                    <h1 className="text-xl text-zinc-600 font-bold">Apartamento com {searchedApartment?.suites} suítes à venda em {searchedApartment?.bairro}</h1>

                    <div className="flex flex-col items-start mt-2">
                        <h1 className="text-xl font-semibold text-zinc-600">Descrição do Imóvel</h1>
                        <p>
                        {
                            searchedApartment && searchedApartment.descricao
                        }
                        </p>
                    </div>

                    <div  className="flex flex-col items-start mt-4">
                        <h1 className="text-xl font-semibold text-zinc-600">EMPREENDIMENTO</h1>

                        {
                            searchedApartment && searchedApartment.informacoesEmpreendimento.map((info) => (
                                <p className="pt-1">- {info}</p>
                            ))
                        }

                        
                        
                    </div>

                    <div  className="flex flex-col items-start mt-4">
                        <h1 className="text-xl font-semibold text-zinc-600">IMOVEL</h1>

                        {
                            searchedApartment && searchedApartment.informacoesImovel.map((info) => (
                                <p className="pt-1">- {info}</p>
                            ))
                        }
                    </div>

                    <div className="flex flex-col items-start mt-4">
                        <h1 className="text-xl font-semibold text-zinc-600">AREA DE LAZER</h1>

                        {
                            searchedApartment && searchedApartment.informacoesLazer.map((info) => (
                                <p className="pt-1">- {info}</p>
                            ))
                        }

                    </div>

                </div>

                {/* chame um corretor */}

                <CallABroker/>


            </section>

            <section className="w-9/12 mt-8">
                <h1 className="text-2xl font-semibold text-zinc-600" id="secao-fotos">FOTOS DO IMOVEL</h1>

                {/* complete Gallery */}

                <CompleteGallery imagesReceived={searchedApartment?.imagensUrl}/>

                {/* <PropertyArquiteture imagesReceived={searchedApartment?.imagensPlanta}/> */}

                <div className="flex flex-col justify-center items-start mt-8">
                    <h1 className="text-zinc-600 text-xl">Video</h1>

                    <div className="flex space-x-3">

                        {
                            searchedApartment && searchedApartment.video && <iframe src={searchedApartment.video}></iframe> 
                        }

                    </div>
                </div>

                <div className="flex flex-col justify-center items-start mt-16">
                    <h1 className="text-2xl font-medium text-zinc-600" id="mapa-local">MAPA</h1>

                    {
                        isLoaded && searchedApartment ? (
                            <GoogleMap
                              mapContainerStyle={{justifyContent: 'center', width: '100%', height: '30rem'}}
                              center={{
                                lat: searchedApartment.localizacao.latitude,
                                lng: searchedApartment.localizacao.longitude,
                              }}
                              zoom={10}
                            >
                              <Marker position={{lat: searchedApartment.localizacao.latitude, lng: searchedApartment.localizacao.longitude}} />
                              <></>
                            </GoogleMap>)
                            :
                            <></>
                    } 
                </div>

            </section>

            <section className=" w-12/12 flex flex-col justify-center items-center mt-16">
 .               <h1 className="text-2xl text-zinc-600 text-start font-semibold w-full pl-32">SUGERIDOS</h1>

                <div className="flex flex-col justify-center items-center space-y-8 mt-3">
                    {
                        searchedApartments && searchedApartments.slice(0,3).map((ap) => (
                            <PlaceCard areaPrivativa={ap.areaPrivativa} bairro={ap.bairro} cidade={ap.cidade} codigo={ap.codigoImovel} dataEntregaEmpreendimento={ap.dataEntregaEmpreendimento}
                            descricao={ap.descricao} id={ap.id} imagemUrl={ap.imagensUrl} numeroLocal={ap.numeroLocal} numeroRua={ap.numeroRua} preco={ap.preco}
                            quartos={ap.quartos} suites={JSON.stringify(ap.suites)} vagas={ap.vagas} key={ap.id} direcionamento="apartmentgallery"/>
                        ))
                    }
                </div>
            </section>

        </div>
    )
}