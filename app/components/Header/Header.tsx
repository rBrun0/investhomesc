'use client'

import React, { useEffect } from 'react'
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { ComprarModal } from "./components/ComprarModal";
import { ConstrutorasModal } from "./components/ConstrutorasModal";
// import siteLogo from "@/app/assets/investeLogo.png"
import Link from "next/link";
import { HamburguerContent } from "./components/HamburguerContent";
import Image from "next/image";
import { Entre } from "./components/Entre";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Roles } from '@/lib/utils';

export const Header = () => {

    const [siteImage, setSiteImage] = useState<string | null>(null);

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    console.log({userProfile})


    async function loadSettingsData() {
        const docRef = doc(db, "settings", "site");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            const data = snap.data();
            setSiteImage(data?.logo);
          }
    }

    useEffect(() => {
        loadSettingsData()
        console.log({userProfile})

    }, [])

    console.log({siteImage})

    // const isAdmin = useAdmin()

    const [isHamburgerOpened, setIsHamburgerOpened] = useState(false)



    function openMenuHamburger() {
        setIsHamburgerOpened(!isHamburgerOpened)
    }    

    return (
        <>
        <header className="w-full min-h-24 space px-8 md:px-36 shadow-md flex justify-between items-center bg-white z-30">


            {
                siteImage && 
            <Link href={"/"} className="relative object-cover bg-center w-40 h-20">
                <Image src={siteImage} fill objectFit="cover" alt="logo-website"/>
            </Link>
            }

            <nav className="hidden lg:flex justify-center items-center space-x-4">

                <div className="relative hidden md:block">
                {/* <button className="rounded-md bg-customPrimary text-white font-medium border-[2px] space-x-1 relative md:px-2 md:py-1 lg:px-4 lg:py-1
                 border-white border-solid hover:bg-white hover:border-customPrimary hover:text-customPrimary transition-colors md:flex items-center justify-center"
                 onClick={openComprarModal}>
                    <span>Comprar</span> <IoIosArrowDown/> 
                </button> */}

                
                {/* <ComprarModal/> */}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <button className="rounded-md text-customPrimary font-medium  space-x-1 relative md:px-2 md:py-1 lg:px-4 lg:py-1
                  transition-colors md:flex items-center justify-center border border-white hover:border-gray-300">
                    <span>Comprar</span> <IoIosArrowDown/> 
                </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel className='text-customPrimary'>COMPRAR</DropdownMenuLabel>
                        <ComprarModal/>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>



                 <div className="relative">

                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <button className="rounded-md text-customPrimary font-medium space-x-1 relative md:px-2 md:py-1 lg:px-4 lg:py-1
                    transition-colors md:flex items-center justify-center border border-white hover:border-gray-300">
                    <span>Construtoras</span> <IoIosArrowDown/> 
                </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel className='text-customPrimary'>CONSTRUTORAS</DropdownMenuLabel>
                    <ConstrutorasModal/>
                    </DropdownMenuContent>
                </DropdownMenu>
                 
                 </div>

                 


                 <Link href={'http://wa.me/999999999'} target="blank">
                 <div className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md  text-customPrimary font-medium 
                 transition-colors border border-white hover:border-gray-300">
                    Contato
                 </div>

                 </Link>

                 <Entre/>

                 {
                    (userProfile.role == Roles.ADMIN || 
                    userProfile.role == Roles.CORRETOR) && (
                        <Link href="/paineladministrativo" className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md
                         text-customPrimary font-medium transition-colors border border-white hover:border-gray-300">
                                Painel
                        </Link>
                    )
                 }

{
                    userProfile.role == Roles.ADMIN && (
                        <Link href="/superadminarea" className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md
                         text-customPrimary font-medium transition-colors border border-white hover:border-gray-300">
                                Admin
                        </Link>
                    )
                 }
            </nav>

            {/* hamburguer */}


            <div className="block lg:hidden" onClick={openMenuHamburger}>
                <GiHamburgerMenu className="w-12 h-12 text-customPrimary cursor-pointer"/>
            </div>

        </header>

        <div className="lg:hidden">
            {
                isHamburgerOpened && <HamburguerContent/>
            }
        </div>
        </>
    )
}