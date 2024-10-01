'use client'

import { FaCalendarAlt } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { TbZoomInArea } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { PlaceCard } from "@/app/components/PlaceCard/PlaceCard";
import { MainGallery } from "@/app/apartmentgallery/components/MainGallery";
import { CompleteGallery } from "@/app/apartmentgallery/components/CompleteGallery";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { ConstructionsType, PropertyType } from "@/app/@Types/types";
import { formatToBrl } from "@/app/@Types/utils/formatToBrl";
import { CallABroker } from "@/app/apartmentgallery/components/CallABroker";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import {FacebookShareButton, FacebookShareCount, WhatsappShareButton} from "react-share"
import { usePathname } from "next/navigation";
import Link from "next/link";

type ApartmentGalleryProps = {
    params: {
        codigo: string
    }
}

export default function galeriaConstrucao({params}: ApartmentGalleryProps) {

    const path = usePathname()

    const {codigo} = params

    const [constructions, setConstructions] = useState<ConstructionsType[] | null>([])
    const construction = constructions?.filter(con => con.codigo = codigo)[0] ; 

    const fetchData = async () => {
    
        const querySnapshot = await getDocs(collection(db,"construcao"))
        querySnapshot.forEach((doc) => {
            setConstructions((prev: any) => {
                console.log(doc.data())
                return [...prev, doc.data()]
            })
        }
    )
}

    // const images = Array.from({length: construction?.imagens || 0}).fill({src: constructions?.imagensUrl})

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
                construction && <MainGallery imagesList={construction.imagens}/>
            }

            <h1 className="w-9/12 text-zinc-500 text-center md:text-start text-2xl font-semibold mt-12"
            >RESIDENCIAL EM {construction && construction.bairro.toUpperCase()} de {construction && construction.cidade.toUpperCase()} | {construction?.suites} SUÍTES | {construction?.areaPrivativa}M²
            </h1>

            <div className="w-9/12 flex flex-col md:flex-row justify-between mt-4">

            <p className="text-center md:text-start text-2xl text-customPrimary font-semibold">Cód: {codigo}</p>

            <div className="flex flex-wrap space-x-2 w-full md:w-auto gap-3 md:gap-0 mt-8 md:mt-0">

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">venda</span> <span className="font-semibold text-zinc-600">
                        <span>{construction && formatToBrl(construction.preco)}</span>
                        </span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">Área Privativa</span> <span className="font-semibold flex justify-center items-center space-x-1">
                        <TbZoomInArea/>
                    <span className=" text-zinc-600">{construction && construction.areaPrivativa} m²</span></span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">Dormitórios</span> <span className="font-semibold  text-zinc-600 flex justify-center items-center space-x-1">
                        <FaBed/>
                        <span>{construction && construction.suites}</span></span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">Suítes</span> <span className="font-semibold text-zinc-600 flex justify-center items-center space-x-1">
                        <FaBed/>
                        <span>{construction && construction.suites}</span></span>
                </div>

                <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
                    <span className="text-xs">vagas</span> <span className="font-semibold text-zinc-600 flex justify-center items-center space-x-1">
                    <FaCarAlt/> <span>{construction && construction.vagas}</span>
                    </span>
                </div>

                <div className="flex flex-col justify-center items-center pr-3">
                    <span className="text-xs">Data de Entrega do Empreendimento</span>
                    <span className="font-semibold flex justify-center items-center space-x-1 text-zinc-600">
                        <FaCalendarAlt/> <p>{construction && construction.dataEntregaEmpreendimento}</p>
                        </span>
                </div>

            </div>


            </div>

            <nav className="w-full min-h-24 bg-zinc-100 flex flex-col md:flex-row justify-between items-center md:px-48 mt-8 space-y-5 md:space-y-0 py-2">
                <div className="flex  justify-center items-center space-x-14 md:space-x-8 text-customPrimary font-semibold ">
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
                    <FacebookShareButton url={path} hashtag="olha esse imovel!! #DFATTO">
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
                    <h1 className="text-xl text-zinc-600 font-bold">Apartamento com {construction?.suites} à venda em {construction?.bairro}</h1>

                    <div className="flex flex-col items-start mt-2">
                        <h1 className="text-xl font-semibold text-zinc-600">Descrição do Imóvel</h1>
                        <p>
                        {
                            construction && construction.descricao
                        }
                        </p>
                    </div>

                    <div  className="flex flex-col items-start mt-4">
                        <h1 className="text-xl font-semibold text-zinc-600">EMPREENDIMENTO</h1>

                        {
                            construction && construction.informacoesEmpreendimento.map((info) => (
                                <p className="pt-1">- {info}</p>
                            ))
                        }

                        
                        
                    </div>

                    <div  className="flex flex-col items-start mt-4">
                        <h1 className="text-xl font-semibold text-zinc-600">IMOVEL</h1>

                        {
                            construction && construction.informacoesImovel.map((info) => (
                                <p className="pt-1">- {info}</p>
                            ))
                        }
                    </div>

                    <div className="flex flex-col items-start mt-4">
                        <h1 className="text-xl font-semibold text-zinc-600">AREA DE LAZER</h1>

                        {
                            construction && construction.areaDeLazer.map((info) => (
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

                <CompleteGallery imagesReceived={construction?.imagens}/>

                {/* <PropertyArquiteture imagesReceived={searchedApartment?.imagensPlanta}/> */}

                <div className="flex flex-col justify-center items-start mt-8">
                    <h1 className="text-zinc-600 text-xl">Video</h1>

                    <div className="flex space-x-3">

                        {
                            construction && construction.video && <iframe src={construction.video}></iframe> 
                        }

                    </div>
                </div>

                <div className="flex flex-col justify-center items-start mt-16">
                    <h1 className="text-2xl font-medium text-zinc-600" id="mapa-local">MAPA</h1>

                    {
                        isLoaded && construction ? (
                            <GoogleMap
                              mapContainerStyle={{justifyContent: 'center', width: '100%', height: '30rem'}}
                              center={{
                                lat: construction.localizacao.latitude,
                                lng: construction.localizacao.longitude,
                              }}
                              zoom={10}
                            >
                              <Marker position={{lat: construction.localizacao.latitude, lng: construction.localizacao.longitude}} />
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
                        constructions && constructions.slice(0,3).map((ap) => (
                            <PlaceCard areaPrivativa={ap.areaPrivativa} bairro={ap.bairro} cidade={ap.cidade} codigo={ap.codigo} dataEntregaEmpreendimento={ap.dataEntregaEmpreendimento}
                            descricao={ap.descricao} id={ap.id} imagemUrl={ap.imagens} numeroLocal={ap.numeroLocal} numeroRua={ap.rua} preco={ap.preco}
                            quartos={ap.dormitorios} suites={JSON.stringify(ap.suites)} vagas={ap.vagas} key={ap.id} direcionamento="apartmentgallery"/>
                        ))
                    }
                </div>
            </section>

        </div>
    )
}