"use client"

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type OurCities = {
    nome: string,
    bairros: string[]
}

export const ActingCities = () => {

    const [ourCities, setOurCities] = useState<OurCities[]>([])

    const fetchData = async () => {

        const querySnapshot = await getDocs(collection(db,"cidades"))
        querySnapshot.forEach((doc) => {
            setOurCities((prev: any) => {
                return [...prev, doc.data()]
            })
        }
    )

    
};

const dispatch = useDispatch()

function selectNeighbors(neighborhood: string) {
    dispatch(setFilterValues({
        cities: neighborhood.toUpperCase()
    }))
}

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        {
            ourCities?.map((city, index) => (
                <div key={index}>
                <h1 className="text-2xl font-semibold text-customPrimary">{city.nome}</h1>
                <ul className="list-disc marker:bg-customPrimary flex flex-wrap justify-start space-x-12 text-xs">
                    {city.bairros.map((bairro, index) => (
                        
                        bairro && <li key={index} onClick={() => selectNeighbors(bairro)}>{bairro}</li>
                        
                        
                    ))}
                </ul>
                </div>
            ))
        }
        </>
    )
}