'use client'

import Link from 'next/link'
import { IoLogoWhatsapp } from "react-icons/io";

import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const FloatWhatsapp = () => {
    
    const [siteData, setSiteData] = useState(null);
    
    useEffect(() => {
      const fetchSiteData = async () => {
        const docRef = doc(db, "settings", "site");
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSiteData(snap.data());
        }
      };
      fetchSiteData();
    }, []);

    // ${siteData?.telOne}

  return (
    <>
    {
        siteData ? (
    <Link href={`https://wa.me/${String(siteData?.telOne)?.split(" ")?.join("")?.replace("-", "")?.slice(4)}`} passHref
    target='_blank'
    className='fixed bottom-5 right-5 '
    >
        <IoLogoWhatsapp className='text-green-500 w-16 h-16 animate-bounce duration-1000'/>
    </Link>
        ) : null
    }
    </>
  )
}

export default FloatWhatsapp