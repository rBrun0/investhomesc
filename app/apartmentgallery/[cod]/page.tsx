"use client";

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCarAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { TbZoomInArea } from "react-icons/tb";
import { FaCameraRetro } from "react-icons/fa";
import { PlaceCard } from "@/app/components/PlaceCard/PlaceCard";
import { MainGallery } from "../components/MainGallery";
import { CompleteGallery } from "../components/CompleteGallery";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { PropertyType } from "@/app/utils/types";
import { formatToBrl } from "@/app/utils/utilitaryCode/formatToBrl";
import { CallABroker } from "../components/CallABroker";
import { useJsApiLoader } from "@react-google-maps/api";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Header } from "@/app/components/Header/Header";
import MapComponent from "../components/MapComponent";
import { Footer } from "@/app/components/Footer/Footer";
import { AnimatedNumber } from "../components/AnimatedNumber";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { SocialMedias } from "../components/SocialMedias";

type ApartmentGalleryProps = {
  params: {
    cod: string;
  };
};

export default function Apartmentgallery({ params }: ApartmentGalleryProps) {
  const path = usePathname();

  const { cod } = params;

  const [searchedApartments, setSearchedApartments] = useState<PropertyType[] | null>([]);
  const searchedApartment = searchedApartments?.filter((ap) => String(ap.codigoImovel) == cod)[0];

  const sugestedApartments =
    searchedApartments && searchedApartments?.filter((ap) => String(ap.codigoImovel) != cod);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "imoveis"));
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setSearchedApartments(temp);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD_sE_BNwqZAcxhGyhqtSzRTx0EsxEYvAU",
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center mt-24">
        {/* first gallery */}

        {searchedApartment && searchedApartment?.imagensUrl?.length >= 1 && (
          <MainGallery imagesList={searchedApartment.imagensUrl} />
        )}

        <h1 className="w-9/12 text-zinc-500 text-center md:text-start text-2xl font-semibold mt-12">
          APARTAMENTO EM {searchedApartment && searchedApartment.bairro.toUpperCase()} de{" "}
          {searchedApartment && searchedApartment.cidade.toUpperCase()} |{" "}
          {searchedApartment?.suites} SUÍTES |{" "}
          <AnimatedNumber value={Number(searchedApartment?.areaPrivativa ?? 10)} />
          m²
        </h1>

        <div className="w-9/12 flex flex-col md:flex-row justify-between mt-4">
          <p className="text-center md:text-start text-2xl text-customPrimary font-semibold">
            Código: <span className="font-light">{cod}</span>
          </p>

          <div className="flex justify-center flex-wrap space-x-2 w-full md:w-auto gap-6 md:gap-0 mt-8 md:mt-0">
            <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
              <span className="text-xs">Venda</span>{" "}
              <span className="font-semibold text-zinc-600">
                <span>{searchedApartment && formatToBrl(Number(searchedApartment.preco))}</span>
              </span>
            </div>

            <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
              <span className="text-xs">Área Privativa</span>{" "}
              <span className="font-semibold flex justify-center items-center space-x-1">
                <TbZoomInArea />
                <span className=" text-zinc-600">
                  {searchedApartment && searchedApartment.areaPrivativa} m²
                </span>
              </span>
            </div>

            <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
              <span className="text-xs">Dormitórios</span>{" "}
              <span className="font-semibold  text-zinc-600 flex justify-center items-center space-x-1">
                <FaBed />
                <span>{(searchedApartment && searchedApartment.dormitorios) ?? 0}</span>
              </span>
            </div>

            <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
              <span className="text-xs">Suítes</span>{" "}
              <span className="font-semibold text-zinc-600 flex justify-center items-center space-x-1">
                <FaBed />
                <span>{(searchedApartment && searchedApartment.suites) ?? 0}</span>
              </span>
            </div>

            <div className="flex flex-col justify-center items-center md:border-r-[1px] md:border-zinc-600 pr-3">
              <span className="text-xs">vagas</span>{" "}
              <span className="font-semibold text-zinc-600 flex justify-center items-center space-x-1">
                <FaCarAlt /> <span>{(searchedApartment && searchedApartment.vagas) ?? 0}</span>
              </span>
            </div>

            {searchedApartment?.receiveTime && (
              <div className="flex flex-col justify-center items-center pr-3">
                <span className="text-xs">Data de Entrega do Empreendimento</span>
                <span className="font-semibold flex justify-center items-center space-x-1 text-zinc-600">
                  <FaCalendarAlt />{" "}
                  <p>{searchedApartment && searchedApartment.receiveTime} dia(s)</p>
                </span>
              </div>
            )}
          </div>
        </div>

        <nav className="w-full min-h-24 bg-zinc-100 flex flex-col md:flex-row justify-between items-center md:px-48 mt-8 space-y-10 md:space-y-0 py-2">
          <div className="flex  justify-center items-center space-x-14 md:space-x-8 text-customPrimary font-semibold px-2">
            <Link href={"#description"}>
              <span className="cursor-pointer hover:text-customPrimaryHover transition-colors">
                DESCRIÇÃO
              </span>
            </Link>
            <Link href={"#mapa-local"}>
              <span className="cursor-pointer hover:text-customPrimaryHover transition-colors">
                MAPA DO LOCAL
              </span>
            </Link>

            <Link href={"#secao-fotos"}>
              <span className="cursor-pointer flex justify-center items-center space-x-1 hover:text-customPrimaryHover transition-colors">
                <span>FOTOS</span>
                <FaCameraRetro />
              </span>
            </Link>
          </div>

          <SocialMedias path={path} />
        </nav>

        <section className="w-9/12 flex flex-col md:flex-row mt-8 justify-between space-y-8 md:space-y-0 py-4 md:py-8">
          {/* descricao */}

          <div className="w-4/6" id="description">
            <h1 className="text-xl text-zinc-600 font-bold">
              Apartamento com {searchedApartment?.suites} suítes à venda em{" "}
              {searchedApartment?.bairro}
            </h1>

            <div className="flex flex-col items-start mt-2">
              <h1 className="text-xl font-semibold text-zinc-600">Descrição do Imóvel</h1>
              <p>{searchedApartment && searchedApartment.descricao}</p>
            </div>

            <div className="flex flex-col items-start mt-4">
              <h1 className="text-xl font-semibold text-zinc-600">EMPREENDIMENTO</h1>

              {searchedApartment &&
                searchedApartment.informacoesEmpreendimento?.map((info) => (
                  <p className="pt-1" key={info}>
                    - {info}
                  </p>
                ))}
            </div>

            <div className="flex flex-col items-start mt-4">
              <h1 className="text-xl font-semibold text-zinc-600">IMÓVEL</h1>

              {searchedApartment &&
                searchedApartment.informacoesImovel?.map((info) => (
                  <p className="pt-1" key={info}>
                    - {info}
                  </p>
                ))}
            </div>

            <div className="flex flex-col items-start mt-4">
              <h1 className="text-xl font-semibold text-zinc-600">ÁREA DE LAZER</h1>

              {searchedApartment &&
                searchedApartment.informacoesLazer?.map((info, index) => (
                  <p className="pt-1" key={index}>
                    - {info}
                  </p>
                ))}
            </div>
          </div>

          {/* chame um corretor */}

          {searchedApartment && searchedApartment.numeroAnunciante && (
            <CallABroker announcingNumber={searchedApartment.numeroAnunciante} />
          )}
        </section>

        <section className="w-9/12 mt-8">
          {/* complete Gallery */}

          {searchedApartment?.imagensUrl && (
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <h1 className="text-2xl font-semibold text-zinc-600" id="secao-fotos">
                FOTOS DO IMÓVEL
              </h1>
              <CompleteGallery imagesReceived={searchedApartment?.imagensUrl} />
            </div>
          )}

          {isLoaded &&
          searchedApartment &&
          searchedApartment?.latitude &&
          searchedApartment?.longitude ? (
            <div className="flex flex-col justify-center items-start mt-16 z-10! gap-3">
              <h1 className="text-2xl font-semibold text-zinc-600" id="mapa-local">
                MAPA
              </h1>

              <MapComponent
                latitude={Number(searchedApartment.latitude)}
                longitude={Number(searchedApartment.longitude)}
              />
            </div>
          ) : (
            <></>
          )}
        </section>

        {!!sugestedApartments.length && (
          <section className=" w-12/12 flex flex-col justify-center items-center mt-16 py-6">
            <h1 className="text-2xl text-zinc-600 text-start font-semibold w-full pl-32">
              SUGERIDOS
            </h1>

            <div className="flex flex-col justify-center items-center space-y-8 mt-3">
              {sugestedApartments
                .slice(0, 3)
                ?.map((ap) => (
                  <PlaceCard
                    areaPrivativa={ap.areaPrivativa}
                    bairro={ap.bairro}
                    cidade={ap.cidade}
                    codigo={ap.codigoImovel}
                    dataEntregaEmpreendimento={ap.receiveTime}
                    descricao={ap.descricao}
                    id={String(ap.uid)}
                    imagemUrl={ap.imagensUrl}
                    numeroLocal={ap.numeroLocal}
                    numeroRua={ap.numeroRua}
                    preco={ap.preco}
                    quartos={ap.dormitorios}
                    suites={ap.suites}
                    vagas={ap.vagas}
                    direcionamento="apartmentgallery"
                    numeroAnunciante={ap.numeroAnunciante}
                    key={ap.uid}
                  />
                ))}
            </div>
          </section>
        )}
      </div>

      <ScrollToTop className="pt-6" />

      <Footer />
    </>
  );
}
