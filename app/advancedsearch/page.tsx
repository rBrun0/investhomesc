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

function AdvancedSearch() {

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

    const dispatch = useDispatch()

    const filterValues = useSelector((state: RootState) => state.filterValuesSlice)


    const [saleApartments, setSaleApartments] = useState<PropertyType[] | null>([]);
    const [filteredData, setFilteredData] = useState<PropertyType[] | null>()
    let filteredProperties: any = saleApartments;
    
    function dispatchFilters() {
        if(filterValues.cities && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.cidadeVal == filterValues.cities)
        }

        if(filterValues.neighborhood && saleApartments !== null){
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.bairroVal == filterValues.neighborhood)
        }

        if(filterValues.propertyType && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.tipoDoImovel == filterValues.propertyType)
        }

        if(filterValues.propertyProfile && saleApartments !== null){
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.perfil.includes(filterValues.propertyProfile))
        }

        if(filterValues.bedrooms == 5 && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.quartos >= filterValues.bedrooms)
        }
        if(filterValues.bedrooms > 0 && filterValues.bedrooms < 5 && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.quartos == filterValues.bedrooms)
        }

        if(filterValues.bathrooms > 0 && filterValues.bathrooms < 5 && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.bathrooms == filterValues.bathrooms)
        }

        if(filterValues.bathrooms == 5 && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.bathrooms >= filterValues.bathrooms)
        }

        if(filterValues.constructionCompany && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.construtora == filterValues.constructionCompany)
        }

        if(filterValues.constructorInformations.length > 0 || filterValues.condominumInformations.length > 0 && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => {
                return comparaArrays(filterValues.constructorInformations, prp.caracteristicasImovel) || comparaArrays(filterValues.condominumInformations, prp.caracteristicasCondominio)
            })
        }

        if(filterValues.minValue && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.preco >= filterValues.minValue)
        }

        if(filterValues.maxValue && saleApartments !== null) {
            filteredProperties = filteredProperties?.filter((prp: PropertyType) => prp.preco <= filterValues.maxValue)
        }

        setFilteredData(filteredProperties)
    }

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db,"imoveis"))
        querySnapshot.forEach((doc) => {
            setSaleApartments((prev: any) => {
                return [...prev, doc.data()]
            })
        }
    )

}



    useEffect(() => {
        dispatchFilters()
        setSaleApartments([])
        fetchData()
        console.log(filterValues)
    }, [filterValues])

    return (

        <>
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
                filteredData ? filteredData.map((apartment) => (
                    <PlaceCard areaPrivativa={apartment.areaPrivativa} bairro={apartment.bairro} cidade={apartment.cidade} codigo={apartment.codigoImovel} dataEntregaEmpreendimento={apartment.dataEntregaEmpreendimento}
                        descricao={apartment.descricao} id={apartment.id} imagemUrl={apartment.imagensUrl} numeroLocal={apartment.numeroLocal} numeroRua={apartment.numeroRua} preco={apartment.preco} quartos={apartment.quartos}
                        suites={JSON.stringify(apartment.suites)} vagas={apartment.vagas} direcionamento="apartmentgallery"/>
                ))
                :
               saleApartments && saleApartments.map(apartment => {
                return (
                    <PlaceCard areaPrivativa={apartment.areaPrivativa} bairro={apartment.bairro} cidade={apartment.cidade} codigo={apartment.codigoImovel} dataEntregaEmpreendimento={apartment.dataEntregaEmpreendimento}
                        descricao={apartment.descricao} id={apartment.id} imagemUrl={apartment.imagensUrl} numeroLocal={apartment.numeroLocal} numeroRua={apartment.numeroRua} preco={apartment.preco} quartos={apartment.quartos}
                        suites={JSON.stringify(apartment.suites)} vagas={apartment.vagas} direcionamento="apartmentgallery"/>
                )
               })
    
            }

            {
                saleApartments?.length === 0 && (
                    <div className="text-center text-2xl font-semibold">Carregando imóveis...</div>
                )
            }

            {
                filterValues.bathrooms === 0 && filterValues.bedrooms === 0 && filterValues.cities == "" && filterValues.condominumInformations.length === 0
                && filterValues.condominums == "" && filterValues.constructionCompany == "" && filterValues.constructorInformations.length == 0 && filterValues.garages === 0
                && filterValues.maxValue === 0 && filterValues.minValue === 0 && filterValues.neighborhood == "" && filterValues.propertyProfile.length === 0
                && filterValues.propertyType == "" && filterValues.garages === 0 && saleApartments && saleApartments.map((apartment) => (
                    <PlaceCard areaPrivativa={apartment.areaPrivativa} bairro={apartment.bairro} cidade={apartment.cidade} codigo={apartment.codigoImovel} dataEntregaEmpreendimento={apartment.dataEntregaEmpreendimento}
                        descricao={apartment.descricao} id={apartment.id} imagemUrl={apartment.imagensUrl} numeroLocal={apartment.numeroLocal} numeroRua={apartment.numeroRua} preco={apartment.preco} quartos={apartment.quartos}
                        suites={JSON.stringify(apartment.suites)} vagas={apartment.vagas} direcionamento="apartmentgallery"/>
                ))
            }


            </div>
        
        </>
    )
}

export default AdvancedSearch;