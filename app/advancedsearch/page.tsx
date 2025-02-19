'use client'

import React from 'react'
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { VscSettings } from "react-icons/vsc";
import { FilterDialog } from "../searchedpage/components/FilterDialog";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { PropertyType } from "../@Types/types";
import { db } from "../firebaseConfig";
import { PlaceCard } from "../components/PlaceCard/PlaceCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetFilterValues } from "../features/filterValues/filterValuesSlice";
import { MainPanel } from "../components/MainPanel/MainPanel";
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import {  isObjectFullyEmpty } from '@/lib/utils';
import { Toaster } from 'sonner';

function AdvancedSearch() {

    const dispatch = useDispatch()
    const filterValues = useSelector((state: RootState) => state.filterValuesSlice)

    function comparaArrays(arr1: string[], arr2: string[]) {
        const maiorArray = arr1.length > arr2.length ? arr1 : arr2
        const menorArray = arr1.length < arr2.length ? arr1 : arr2
        let itemParecido = false
    
        for(let i = 0; i < maiorArray.length; i++) {
            for(let j = 0; j < maiorArray.length; j++) {
                if(maiorArray[i] === menorArray[j]) {
                    itemParecido = true
                }
            }
        }
    
        return itemParecido
    };




    const [saleApartments, setSaleApartments] = useState<PropertyType[] | null>([]);
    const [filteredData, setFilteredData] = useState<PropertyType[] | null>()
    // let filteredProperties;

    console.log('filteredDataa',filteredData)
    console.log('filteredValueess',filterValues)
    
    function removerAcentos(text: string): string {
        return text
            ?.normalize("NFD") // Separa acentos
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .toLowerCase(); // Deixa tudo minúsculo
    }
    
    function dispatchFilters() {
        if (!saleApartments) return;
    
        let filteredProperties = [...saleApartments];
    
        if (filterValues.cities) {
            filteredProperties = filteredProperties.filter((prp) =>
                removerAcentos(prp.cidade) === removerAcentos(filterValues.cities)
            );
        }

        if(filterValues.codeSearch.length >= 1) {
            filteredProperties = filteredProperties.filter((prp) =>
                removerAcentos(prp.codigoImovel).includes(removerAcentos(filterValues.codeSearch))
            );
        }
    
        if (filterValues.neighborhood) {
            filteredProperties = filteredProperties.filter((prp) =>
                removerAcentos(prp.bairro) === removerAcentos(filterValues.neighborhood)
            );
        }
    
        if (filterValues.propertyType) {
            filteredProperties = filteredProperties.filter((prp) =>
                removerAcentos(prp.tipoDoImovel) === removerAcentos(filterValues.propertyType)
            );
        }
    
        if (filterValues.propertyProfile) {
            filteredProperties = filteredProperties.filter((prp) =>
                prp.buildingProfile.some((perfil) => removerAcentos(perfil).includes(removerAcentos(filterValues.propertyProfile)))
            );
        }
    
        if (filterValues.bedrooms) {
            filteredProperties = filteredProperties.filter((prp) =>
                filterValues.bedrooms === 5 ? prp.dormitorios >= 5 : prp.dormitorios === filterValues.bedrooms
            );
        }
    
        if (filterValues.bathrooms) {
            filteredProperties = filteredProperties.filter((prp) =>
                filterValues.bathrooms === 5 ? Number(prp.banheiros) >= 5 : prp.banheiros === filterValues.bathrooms
            );
        }
    
        if (filterValues.constructionCompany) {
            filteredProperties = filteredProperties.filter((prp) =>
                removerAcentos(prp.construtora) === removerAcentos(filterValues.constructionCompany)
            );
        }
    
        if (filterValues.constructorInformations.length > 0 || filterValues.condominumInformations.length > 0) {
            filteredProperties = filteredProperties.filter((prp) =>
                comparaArrays(filterValues.constructorInformations, prp.buildingInformations) ||
                comparaArrays(filterValues.condominumInformations, prp.condominumInformations)
            );
        }
    
        if (filterValues.minValue) {
            filteredProperties = filteredProperties.filter((prp) => Number(prp.preco) >= filterValues.minValue);
        }
    
        if (filterValues.maxValue) {
            filteredProperties = filteredProperties.filter((prp) => Number(prp.preco) <= filterValues.maxValue);
        }
    
        setFilteredData(filteredProperties);
    }
    

    const fetchData = async () => {
        try {
            const resultData: PropertyType[] = [];
            const querySnapshot = await getDocs(collection(db, "imoveis"));
        
            querySnapshot.forEach((doc) => {
              resultData.push(doc.data() as PropertyType);
            });
        
            setSaleApartments(resultData); 
          } catch (error) {
            console.error("Erro ao buscar dados:", error);
          }
}

useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    if (saleApartments.length > 0) {
      dispatchFilters();
    }
  }, [saleApartments, filterValues]);

    return (

        <>
            <Header/>
            <MainPanel/>
            <div className="flex flex-col w-10/12 items-start px-14 space-y-4 mt-14">

            <h1 className="text-3xl font-semibold">Busca Avançada</h1>

            <div className="flex space-x-2 pb-4">

            <Dialog>
            <DialogTrigger className="w-40 h-12 space-x-1 text-customPrimary border-2 border-customPrimary border-solid rounded-md  flex justify-center items-center"
            ><VscSettings className="font-semibold"/> <span>Filtro Refinado</span>
            </DialogTrigger>

            <FilterDialog/>

            </Dialog>


            <button className="w-40 h-12 space-x-1  text-customPrimary border-2 border-customPrimary border-solid rounded-md flex justify-center items-center"
            onClick={() => dispatch(resetFilterValues())}>
            <IoIosSearch width={40} height={40}/> <span>Limpar Pesquisa</span>
            </button>

            </div>
            </div>

            <div className="flex flex-col space-y-6 justify-center items-center">

                {
                    saleApartments && isObjectFullyEmpty(filterValues) && saleApartments.map(apartment => {
                        return (
                            <PlaceCard areaPrivativa={apartment.areaPrivativa} bairro={apartment.bairro} cidade={apartment.cidade} codigo={apartment.codigoImovel} dataEntregaEmpreendimento={apartment.receiveTime}
                                descricao={apartment.descricao} id={String(apartment.uid)} imagemUrl={apartment.imagensUrl} numeroLocal={apartment.numeroLocal} numeroRua={apartment.numeroRua} preco={apartment.preco} quartos={apartment.dormitorios}
                                suites={apartment.suites} vagas={apartment.vagas} direcionamento="apartmentgallery"
                                key={apartment.uid} numeroAnunciante={apartment.numeroAnunciante}
                                />
                        )
                       })
                }

                {
                    saleApartments && saleApartments.length <= 0 && isObjectFullyEmpty(filterValues) && (
                        <h1 className="text-4xl font-semibold">Nenhum imóvel foi encontrado.</h1>
                    )
                }

                {
                    isObjectFullyEmpty(filterValues) == false && filteredData?.length >= 1 && (
                            filteredData?.map((apartment) => (
                                <PlaceCard areaPrivativa={apartment.areaPrivativa} bairro={apartment.bairro} cidade={apartment.cidade} codigo={apartment.codigoImovel} dataEntregaEmpreendimento={apartment.receiveTime}
                                descricao={apartment.descricao} id={String(apartment.uid)} imagemUrl={apartment.imagensUrl} numeroLocal={apartment.numeroLocal} numeroRua={apartment.numeroRua} preco={apartment.preco} quartos={apartment.dormitorios}
                                suites={apartment.suites} vagas={apartment.vagas} direcionamento="apartmentgallery"
                                key={apartment.uid} numeroAnunciante={apartment.numeroAnunciante}/>
                            ))   
                    )
                }

                {
                    isObjectFullyEmpty(filterValues) == false && filteredData?.length <= 0 && (
                        <h1 className="text-4xl font-semibold">Nenhum imóvel encontrado com os filtros aplicados.</h1>
                    )
                }

            </div>

            <Toaster/>

            <Footer/>
        </>
    )
}

export default AdvancedSearch;