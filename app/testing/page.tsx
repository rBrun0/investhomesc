'use client'

import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useEffect, useState } from "react"

const Testing = () => {

    const [resultData, setResultData] = useState([])

    async function fetchBuildings() {
        const querySnapshot = await getDocs(collection(db, 'imoveis'));
        const results: any[] = [];
    
        querySnapshot.forEach((doc) => {
            console.log('Document:', doc.id, doc.data());
            results.push(doc.data());
        });
    
        console.log('All results:', results);
    }

    useEffect(() => {
        console.log('useEffect triggered');

        fetchBuildings()
    }, [])


    return (
        <>
            {
                resultData?.map((res, index) => (
                    <h1 key={index}>aaaaaaaaaaaaaaaaaaaaaaa</h1>
                ))
            }
        </>
    )
}

export default Testing