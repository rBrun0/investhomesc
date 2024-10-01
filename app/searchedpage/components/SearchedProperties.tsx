"use client"

import React from "react"
import { PropertyType } from "@/app/@Types/types"
import { PlaceCard } from "@/app/components/PlaceCard/PlaceCard"
import { db } from "@/app/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const SearchedProperties = ({propertyProfile}: {propertyProfile: string}) => {

    const [saleProperties, setSaleProperties] = useState<PropertyType[]>([])
    
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db,"imoveis"))
        querySnapshot.forEach((doc) => {
            setSaleProperties((prev: any) => {
                return [...prev, doc.data()]
            })
        }
    )
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        // @ts-ignore
        <>
        {
            saleProperties && saleProperties.map((property) => {

                {
                    // @ts-ignore
                    property.perfil.includes(propertyProfile) && <PlaceCard areaPrivativa={property.areaPrivativa} bairro={property.bairro}
                    cidade={property.cidade}codigo={property.codigoImovel} dataEntregaEmpreendimento={property.dataEntregaEmpreendimento}
                    descricao={property.descricao} id={property.id} imagemUrl={property.imagensUrl} numeroLocal={111} numeroRua={property.numeroRua}
                    preco={property.preco} quartos={property.quartos}
                    suites={JSON.stringify(property.suites)} vagas={property.vagas} />
                }
            })

            
        }

        </>
    )
}