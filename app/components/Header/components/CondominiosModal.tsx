'use client'

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react"
import { useDispatch } from "react-redux";



export const CondominiosModal = ({isModalOpen, children}: {isModalOpen: boolean, children?: ReactNode}) => {

    const [condominios, setCondominios] = useState<any>([])

    const fetchData = async () => {
        //   const querySnapshot = await getDocs(collection(db,"predios"));
        //   const items = querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     ...doc.data()
        //   }));
        //   setSaleApartments(items);
        const querySnapshot = await getDocs(collection(db,"condominios"))
        querySnapshot.forEach((doc) => {
            setCondominios((prev: any) =>  [...prev,doc.data().nome])
        }
    )
};

const dispatch = useDispatch()

function addFilter(cond: any) {
    dispatch(setFilterValues({
        condominums: cond
    }))
}

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className={`absolute bg-customPrimary text-white w-80 h-96 ${isModalOpen ? ' z-50 opacity-100' : '-z-50 opacity-0'} transition-all
            top-11 -left-1 overflow-x-hidden overflow-y-auto rounded-md flex flex-col justify-start items-start p-2 font-thin py-2 text-xs gap-3`}>
                {
                    condominios && condominios.map((cond: string, index: number) => (
                        <Link href={"advancedsearch"} onClick={() => addFilter(cond)} key={index}>
                        <p>{cond}</p>
                        </Link>
                    ))
                }

                {/* {
                    condominios && JSON.stringify(condominios)
                } */}
        </div>


    )
}