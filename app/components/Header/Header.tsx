"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { ComprarModal } from "./components/ComprarModal";
import { ConstrutorasModal } from "./components/ConstrutorasModal";
import Link from "next/link";
import { HamburguerContent } from "./components/HamburguerContent";
import Image from "next/image";
import { Entre } from "./components/Entre";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { cn, Roles } from "@/lib/utils";

export const Header = () => {
  const [siteImage, setSiteImage] = useState<string | null>(null);
  const [telephone, setTelephone] = useState<string | null>(null);
  const [headerOverScrolled, setHeaderOverScrolled] = useState(false);

  const selector = useSelector;

  const userProfile = selector((state: RootState) => state.userSlice);

  async function loadSettingsData() {
    const docRef = doc(db, "settings", "site");
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      setSiteImage(data?.logo);
      setTelephone(data?.telOne);
    }
  }

  useEffect(() => {
    loadSettingsData();
  }, []);

  const [isHamburgerOpened, setIsHamburgerOpened] = useState(false);

  function openMenuHamburger() {
    setIsHamburgerOpened(!isHamburgerOpened);
  }

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 75) {
      setHeaderOverScrolled(true);
    } else {
      setHeaderOverScrolled(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "w-full min-h-24 px-8 md:px-20 shadow-md flex justify-between items-center bg-white z-50 transition-all fixed top-0 overflow-x-hidden",
          headerOverScrolled && "min-h-20"
        )}
      >
        {siteImage ? (
          <Link
            href={"/"}
            className={cn(
              "relative object-cover bg-center w-40 h-20 transition-all duration-500",
              headerOverScrolled && "w-32 h-14"
            )}
          >
            <Image src={siteImage} fill objectFit="cover" alt="logo-website" />
          </Link>
        ) : (
          <div />
        )}

        <nav className="hidden lg:flex justify-center items-center space-x-4">
          <div className="relative hidden md:block">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-md text-customPrimary font-medium  space-x-1 relative md:px-2 md:py-1 lg:px-4 lg:py-1
                            transition-colors md:flex items-center justify-center border border-white hover:border-gray-300"
                >
                  <span>Comprar</span>
                  <IoIosArrowDown />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="!p-0" align="start">
                {/* <DropdownMenuItem className='!p-0' asChild> */}
                {/* <div> */}
                <ComprarModal />
                {/* </div> */}
                {/* </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-md text-customPrimary font-medium  space-x-1 relative md:px-2 md:py-1 lg:px-4 lg:py-1
                  transition-colors md:flex items-center justify-center border border-white hover:border-gray-300"
                >
                  <span>Construtoras</span>
                  <IoIosArrowDown />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="!p-0" align="start">
                <ConstrutorasModal />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href={`http://wa.me/${String(telephone)?.split(" ")?.join("")?.replace("-", "")?.slice(4)}`}
            target="blank"
          >
            <div
              className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md  text-customPrimary font-medium 
                    transition-colors border border-white hover:border-gray-300"
            >
              Contato
            </div>
          </Link>

          <Entre />

          {(userProfile.role == Roles.ADMIN || userProfile.role == Roles.CORRETOR) && (
            <Link
              href="/paineladministrativo"
              className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md
                         text-customPrimary font-medium transition-colors border border-white hover:border-gray-300"
            >
              Painel
            </Link>
          )}

          {userProfile.role == Roles.ADMIN && (
            <Link
              href="/superadminarea"
              className="md:px-2 md:py-1 lg:px-4 lg:py-1 rounded-md
                         text-customPrimary font-medium transition-colors border border-white hover:border-gray-300"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* hamburguer */}

        <div className="block lg:hidden" onClick={openMenuHamburger}>
          <GiHamburgerMenu className="w-12 h-12 text-customPrimary cursor-pointer" />
        </div>
      </header>

      <div className="lg:hidden z-[999]">
        {
          <HamburguerContent
            isHamburguerOpened={isHamburgerOpened}
            setIsHamburgerOpened={setIsHamburgerOpened}
          />
        }
      </div>
    </>
  );
};
