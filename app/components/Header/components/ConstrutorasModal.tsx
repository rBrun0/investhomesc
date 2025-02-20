'use client'

import { ConstructorsType } from "@/app/utils/types";
import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export const ConstrutorasModal = () => {

    const [construtora, setConstrutora] = useState<ConstructorsType[]>([])
    const dispatch = useDispatch()

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db,"construtoras"))
        const result = []
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        }
    )
    setConstrutora(result)
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
        <div className={`absolute bg-customPrimary text-white w-80 h-96 z-50 opacity-100 transition-all
        top-11 -left-1 overflow-x-hidden overflow-y-auto rounded-md flex flex-col    justify-start items-start p-2 font-thin py-2 text-xs gap-3`}>
            {
                construtora && construtora.map((c, index: number) => (
                    <div className="flex" key={index}>
                    <Link href="/advancedsearch" className="" onClick={() => searchProperty(c.name)}>
                        {c.name}
                    </Link>
                    </div>
                ))
            }
        </div>
    )
}