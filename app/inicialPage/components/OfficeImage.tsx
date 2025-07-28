'use client'

import Image from "next/image"
import office from "@/app/assets/office.avif"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"
import { useEffect, useState } from "react"



export const OfficeImage = () => {

    const [officeImage, setOfcImage] = useState('');

        async function loadSettingsData() {
            const docRef = doc(db, "settings", "site");
            const snap = await getDoc(docRef);
    
            if (snap.exists()) {
                const data = snap.data();
                setOfcImage(data?.officeImage)
              }
        }
        
        useEffect(() => {
            loadSettingsData();
        }, [])
        
    if(!officeImage) return null

    return (
        <div className="relative object-cover w-full h-96 mt-12">
            <Image src={office} fill alt="imagem-estabelecimento"/>
        </div>
    )
}