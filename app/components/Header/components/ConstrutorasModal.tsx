'use client'

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export const ConstrutorasModal = ({isModalOpen, children}: {isModalOpen: boolean, children?: ReactNode}) => {

    const [construtora, setConstrutora] = useState<any>([])
    const dispatch = useDispatch()

    const fetchData = async () => {
        //   const querySnapshot = await getDocs(collection(db,"predios"));
        //   const items = querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     ...doc.data()
        //   }));
        //   setSaleApartments(items);
        const querySnapshot = await getDocs(collection(db,"construtoras"))
        querySnapshot.forEach((doc) => {
            setConstrutora((prev: any) =>  [...prev,doc.data().nome])
        }
    )
};

    function searchProperty(c: string) {
        dispatch(setFilterValues({
            constructionCompany: c
        }))
    }
 
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className={`absolute bg-customPrimary text-white w-80 h-96 ${isModalOpen ? ' z-50  opacity-100' : '-z-50 opacity-0'} transition-all
        top-11 -left-1 overflow-x-hidden overflow-y-auto rounded-md flex flex-col    justify-start items-start p-2 font-thin py-2 text-xs gap-3`}>
            {
                construtora && construtora.map((c: any, index: number) => (
                    <div className="flex" key={index}>
                    <Link href="/advancedsearch" className="" onClick={() => searchProperty(c)}>
                        {c}
                    </Link>
                    </div>
                ))
            }
        </div>
    )
}