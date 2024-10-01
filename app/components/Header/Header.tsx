'use client'

import React, { useEffect } from 'react'
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { ComprarModal } from "./components/ComprarModal";
import { ConstrutorasModal } from "./components/ConstrutorasModal";
import siteLogo from "@/app/assets/investeLogo.png"
import Link from "next/link";
import { HamburguerContent } from "./components/HamburguerContent";
import Image from "next/image";
import { Entre } from "./components/Entre";
import useSuperAdmin from '@/app/Hooks/useSuperAdmin';
import useAdmin from '@/app/Hooks/useAdmin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Header = () => {

    const {isSuperAdmin} = useSuperAdmin()
    const isAdmin = useAdmin()

    const [comprarModal, setComprarModal] = useState(false)
    const [construtorasModal, setConstrutorasModal] = useState(false)
    const [isHamburgerOpened, setIsHamburgerOpened] = useState(false)

    function openComprarModal() {
        setConstrutorasModal(false)
        
        setComprarModal(!comprarModal)
    }

    function openConstrutorasModal() {
        setComprarModal(false)
        
        setConstrutorasModal(!construtorasModal)
    }

    function openMenuHamburger() {
        setIsHamburgerOpened(!isHamburgerOpened)
    }

    // const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {

  }, []);
    
    

    return (
        <>
        <header className="w-full min-h-24 space px-8 md:px-36 shadow-md flex justify-between items-center bg-white z-30">

            <Link href={"/"} className="relative object-cover bg-center w-40 h-20">
                <Image src={siteLogo} fill objectFit="cover" alt="logo-website"/>
            </Link>

            <nav className="hidden lg:flex justify-center items-center space-x-4">

                <div className="relative hidden md:block">
                <button className="rounded-md bg-customPrimary text-white font-medium border-[2px] space-x-1 relative md:px-2 md:py-1 lg:px-4 lg:py-1
                 border-white border-solid hover:bg-white hover:border-customPrimary hover:text-customPrimary transition-colors md:flex items-center justify-center"
                 onClick={openComprarModal}>
                    <span>Comprar</span> <IoIosArrowDown/> 
                </button>

                
                <ComprarModal isModalOpen={comprarModal}/>
                </div>



                 <div className="relative">
                 <button className=" rounded-md bg-customPrimary text-white font-medium border-[2px] space-x-1 md:px-2 md:py-1 lg:px-4 lg:py-1
                 border-white border-solid hover:bg-white hover:border-customPrimary hover:text-customPrimary transition-colors flex items-center justify-center"
                 onClick={openConstrutorasModal}>
                     <span>Construtoras</span> <IoIosArrowDown/> 
                 </button>
                 
                 <ConstrutorasModal isModalOpen={construtorasModal}/>
                 </div>

                 


                 <Link href={'http://wa.me/999999999'} target="blank">
                 <div className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md bg-customPrimary text-white font-medium border-[2px]
                 border-white border-solid hover:bg-white hover:border-customPrimary hover:text-customPrimary transition-colors">
                    Contato
                 </div>

                 </Link>

                 <Entre/>

                 {
                    isAdmin && (
                        <Link href="/paineladministrativo" className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md
                         bg-customPrimary text-white font-medium border-[2px]
                        border-white border-solid hover:bg-white hover:border-customPrimary
                        hover:text-customPrimary transition-colors">
                                Painel
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