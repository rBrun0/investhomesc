'use client'

import Image from "next/image"
import { PlaceCard } from "../components/PlaceCard/PlaceCard"
import { FaWaze } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import React from "react";
import office from "@/app/assets/office.avif"
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ConstructorsType, PropertyType } from "../utils/types";
import Link from "next/link";

import { OurConstructionsCompanies } from "./components/OurConstructionsCompanies";
import { ActingCities } from "./components/ActingCities";
import { MainPanel } from "../components/MainPanel/MainPanel";
import { Footer } from "../components/Footer/Footer";
import { resetFilterValues, setFilterValues } from "../features/filterValues/filterValuesSlice";
import { useDispatch } from "react-redux";

function InicialPage () {   

    const dispatch = useDispatch()

    const [saleApartments, setSaleApartments] = useState<PropertyType[] | null>([])
    const [construtoras, setConstrutoras] = useState<ConstructorsType[]>([])

    const furnishedApartment = saleApartments?.filter((ap) => ap.buildingProfile?.includes("Mobiliado"))[0]
    const quadraMarApartment = saleApartments?.filter((ap) => ap.buildingProfile?.includes("Quadra Mar"))[0]
    const frenteMarApartment = saleApartments?.filter((ap) => ap.buildingProfile?.includes("Frente Mar"))[0]

    const fetchData = async () => {
    
        const querySnapshot = await getDocs(collection(db,"imoveis"))
        const tempSaleApartments = []
        querySnapshot.forEach((doc) => {
            tempSaleApartments.push(doc.data())
        }
    )

    setSaleApartments(tempSaleApartments)

    const tempCondominius = []

    const fireBaseCondominiums = await getDocs(collection(db,"condominios"))
    fireBaseCondominiums.forEach((doc) => {
        tempCondominius.push(doc.data())
    }
)

    const tempConstructors = []

    const fireBaseConstrutors = await getDocs(collection(db,"construtoras"))
        fireBaseConstrutors.forEach((doc) => {
            tempConstructors.push(doc.data())
        }
)
    setConstrutoras(tempConstructors)
};

const [siteData, setSiteData] = useState(null);

useEffect(() => {
  const fetchSiteData = async () => {
    const docRef = doc(db, "settings", "site");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setSiteData(snap.data());
    }
  };
  fetchSiteData();
  dispatch(resetFilterValues())
}, []);

console.log({siteData})
console.log("apartamentos", {saleApartments})


    useEffect(() => {
    fetchData();
      }, []);

    return (
        <>
        {/* <InitialMainPanel/> */}

        <MainPanel/>

        <main className="w-full min-h-screen mt-20 space-y-10 mb-10 flex flex-col justify-center items-center">

            <div className="flex flex-col items-start justify-center space-y-6">

            {
                furnishedApartment && (
                    <>
                    <Link href={"/advancedsearch"} className="w-40 h-12 rounded-3xl bg-customPrimary text-white font-semibold cursor-pointer ml-16 md:ml-10
            border-2 border-customPrimary hover:bg-white hover:text-customPrimary transition-colors flex justify-center items-center"
            onClick={() =>  dispatch(setFilterValues({propertyProfile: "Mobiliado"}))}
            >
                MOBILIADOS
            </Link>
                    <PlaceCard areaPrivativa={furnishedApartment.areaPrivativa} bairro={furnishedApartment.bairro} cidade={furnishedApartment.cidade} codigo={furnishedApartment.codigoImovel} dataEntregaEmpreendimento={furnishedApartment.receiveTime}
                    descricao={furnishedApartment.descricao} id={String(furnishedApartment.uid)} imagemUrl={furnishedApartment.imagensUrl} numeroLocal={furnishedApartment.numeroLocal} numeroRua={furnishedApartment.numeroRua} preco={furnishedApartment.preco} quartos={furnishedApartment.dormitorios}
                    suites={furnishedApartment.suites} vagas={furnishedApartment.vagas} direcionamento="apartmentgallery" numeroAnunciante={furnishedApartment.numeroAnunciante}/>
                    </>
                )

                
            }

            {
                quadraMarApartment && (
                    <>
                     <Link href={"/advancedsearch"} className="w-40 h-12 rounded-3xl bg-customPrimary text-white font-semibold cursor-pointer ml-16 md:ml-10  mt-6 md:mb-0 
                    border-2 border-customPrimary hover:bg-white hover:text-customPrimary transition-colors flex justify-center items-center"
                    onClick={() => dispatch(setFilterValues({propertyProfile: "Frente Mar"}))}
                    >
                        FRENTE MAR
                    </Link>
                    <PlaceCard areaPrivativa={quadraMarApartment.areaPrivativa} bairro={quadraMarApartment.bairro} cidade={quadraMarApartment.cidade} codigo={quadraMarApartment.codigoImovel} dataEntregaEmpreendimento={quadraMarApartment.receiveTime}
                    descricao={quadraMarApartment.descricao} id={String(quadraMarApartment.uid)} imagemUrl={quadraMarApartment.imagensUrl} numeroLocal={quadraMarApartment.numeroLocal} numeroRua={quadraMarApartment.numeroRua} preco={quadraMarApartment.preco} quartos={quadraMarApartment.dormitorios}
                    suites={quadraMarApartment.suites} vagas={quadraMarApartment.vagas} direcionamento="apartmentgallery" numeroAnunciante={quadraMarApartment.numeroAnunciante}/>
                    </>
                )
            }

            {
                frenteMarApartment && (
                    <>
                    <Link href={"/advancedsearch"} className="w-40 h-12 rounded-3xl bg-customPrimary text-white font-semibold cursor-pointer ml-16 md:ml-10 mt-6 md:mb-0
                        border-2 border-customPrimary hover:bg-white hover:text-customPrimary transition-colors flex justify-center items-center"
                        // onClick={() => dispatch(setFilterValues({propertyProfile: "Quadra Mar"}))}
                        >
                            QUADRA MAR
                    </Link>

                    <PlaceCard areaPrivativa={frenteMarApartment.areaPrivativa} bairro={frenteMarApartment.bairro} cidade={frenteMarApartment.cidade} codigo={frenteMarApartment.codigoImovel} dataEntregaEmpreendimento={frenteMarApartment.receiveTime}
                    descricao={frenteMarApartment.descricao} id={String(frenteMarApartment.uid)} imagemUrl={frenteMarApartment.imagensUrl} numeroLocal={frenteMarApartment.numeroLocal} numeroRua={frenteMarApartment.numeroRua} preco={frenteMarApartment.preco} quartos={frenteMarApartment.dormitorios}
                    suites={frenteMarApartment.suites} vagas={frenteMarApartment.vagas}direcionamento="apartmentgallery" numeroAnunciante={frenteMarApartment.numeroAnunciante}/>
                    </>
                )
            }

            </div>
        


            <section className="w-full md:w-11/12 lg:w-10/12 pt-14 px-20 md:px-20 lg:px-28 bg-zinc-100 overflow-x-hidden">
                <h3 className="text-xl md:text-2xl">CONHEÇA A MELHOR IMOBILIARIA DE</h3>
                <h1 className="text-primary text-5xl lg:text-6xl font-extrabold tracking-wide">Itapema/SC</h1>

                <div className="w-44 h-[2px] bg-black mt-3"/>

                <div className="relative object-cover w-full h-80 mt-12">
                <Image src={office} fill alt="imagem-estabelecimento"/>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:justify-around mt-7">

                    <div>
                        {
                            siteData?.telOne && siteData?.telTwo && (
                                <h1 className="text-xl md:text-3xl font-semibold">
                                    {siteData.telOne}{' '}
                                     - {' '}
                                    {siteData.telTwo}
                                </h1>
                            )
                        }

                        {
                            siteData?.locationExplain && (
                        <p className="text-start tracking-wider font-light text-lg">
                            {siteData.locationExplain}
                        </p>
                            )
                        }

                    </div>
                        {
                            siteData?.linkWaze || siteData?.linkGoolemaps && (
                                <>
                                <h1 className="text-blue-400 text-sm md:text-base">Tenha acesso a <br /> localização <br /> clicando nos ícones</h1>

                    <div className="w-[1px] h-28 bg-black hidden lg:block"></div>

                    <div className="flex space-x-24 justify-center items-center py-6">


                        {
                            siteData.linkWaze && 
                             <Link href={siteData.linkWaze}>
                                <FaWaze className="w-12 h-12 md:w-20 md:h-20"/>
                             </Link>
                            }
                        {
                            siteData.linkGoolemaps && 
                            <Link href={siteData.linkGoolemaps}>
                             <CiLocationOn className="w-12 h-12 md:w-20 md:h-20 text-yellow-400"/>
                             </Link>
                        }


                        
                    </div>
                    </>
                    )
                }

                </div>

            </section>


            


             {/* CONDOMINIOS */}

            <section className="bg-zinc-100 w-[80%] flex flex-col justify-start items-center px-12 py-8 space-y-2">
                

                {/* CONSTRUTORAS */}

                <div className="bg-zinc-400 h-[1px] w-full"/>

                <h1 className="w-full text-start text-xl text-customPrimary font-bold ">CONSTRUTORAS</h1>

                <OurConstructionsCompanies construtoras={construtoras}/>

            </section>


            <section className="bg-zinc-100 pt-8 w-[80%]">
                <div className="mx-auto px-6 py-6 space-y-4">

                    <ActingCities />

                </div>

            </section>

        </main>

        <Footer/>
        </>
    )
}

export default InicialPage