"use client"

import React from "react";
import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// type OurCities = {
//     nome: string,
//     bairros: string[]
// }

 export const ActingCities = () => {

//     const [ourCities, setOurCities] = useState<OurCities[]>([])

//     const fetchData = async () => {

//         const querySnapshot = await getDocs(collection(db,"cidades"))
//         querySnapshot.forEach((doc) => {
//             setOurCities((prev: any) => {
//                 return [...prev, doc.data()]
//             })
//         }
//     )

    
// };

const dispatch = useDispatch()

function selectNeighbors(neighborhood: string) {
    dispatch(setFilterValues({
        cities: neighborhood.toUpperCase()
    }))
}

//     useEffect(() => {
//         fetchData()
//     }, [])

    return (
        <>
            <div >
                <h1 className="text-2xl font-semibold text-customPrimary">Itapema</h1>
                <ul className="list-disc marker:bg-customPrimary flex flex-wrap justify-start gap-8 text-xs py-4">
                   
                        
                    <li onClick={() => selectNeighbors("Meia Praia")}>Meia Praia</li>
                    <li onClick={() => selectNeighbors("Morretes")}>Morretes</li>
                    <li onClick={() => selectNeighbors("Jardim Praia Mar")}>Jardim Praia Mar</li>
                    <li onClick={() => selectNeighbors("Casa Branca")}>Casa Branca</li>
                    <li onClick={() => selectNeighbors("Tabuleiro dos Oliveiras")}>Tabuleiro dos Oliveiras</li>
                    <li onClick={() => selectNeighbors("Várzea")}>Várzea</li>
                    <li onClick={() => selectNeighbors("Centro")}>Centro</li>
                    <li onClick={() => selectNeighbors("Canto da Praia")}>Canto da Praia</li>
                   
                </ul>
                </div>
        </>
    )
}