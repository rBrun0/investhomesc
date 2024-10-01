"use client"

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import { db } from "@/app/firebaseConfig"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { collection, getDocs } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import EntreHamburguer from "./EntreHamburguer"
import useAdmin from "@/app/Hooks/useAdmin"
import useSuperAdmin from "@/app/Hooks/useSuperAdmin"
  

export const HamburguerContent = () => {

  const isAdmin = useAdmin()
  const {isSuperAdmin} = useSuperAdmin()


  const dispatch = useDispatch()

  function addFilter(perfil = "", tipo = "", bairro = "") {
      dispatch(setFilterValues({
          propertyProfile: perfil,
          cities: 'itapema',
          propertyType: tipo,
          neighborhood: bairro
      }))
  }



  const [condominios, setCondominios] = useState<any>([])
  const [construtora, setConstrutora] = useState<any>([])

  const fetchDataCondominums = async () => {
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

const fetchDataConstructors = async () => {
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
  fetchDataCondominums()
  fetchDataConstructors()
}, [])


    return (
        <div className="w-full min-h-60 px-6">
            <Accordion type="single" collapsible className="w-full">




      <AccordionItem value="item-1">
        <AccordionTrigger>Comprar</AccordionTrigger>

        <AccordionContent className="space-y-4 flex flex-col text-customPrimary">
            <Link href={"advancedsearch"} onClick={() => addFilter()}>Apartamentos em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "meia praia")}>Apartamentos em Itapema - Meia Praia</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "quadra mar")}>Apartamentos em Itapema - Quadra Mar</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("frente mar")}>Apartamentos em Itapema - Frente Mar</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("mobiliados")}>Apartamentos em Itapema - Mobiliados</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("showroom")}>Apartamentos em Itapema - Showroom</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "centro")}>Apartamentos em Itapema - Centro</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "", "morretes")}>Apartamentos em Itapema - Morretes</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("", "sala comercial", "")}>Sala comercial em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("sala comercial", "", "")}>Sala comercial em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("casa", "", "")}>Casas em Itapema</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("plaza iate club")}>Casas em Itapema - Plaza Iate Club</Link>
            <Link href={"advancedsearch"} onClick={() => addFilter("chacara flora", "", "")}>Casas em Itapema - Chacara Flora</Link>
        </AccordionContent>
      </AccordionItem>








      <AccordionItem value="item-2">
        <AccordionTrigger>Construtoras</AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-4 text-customPrimary">
        {
                construtora && construtora.map((c: any, index: number) => (
                    
                    <Link href="/advancedsearch" className="" onClick={() => searchProperty(c)} key={index}>
                        {c}
                    </Link>
                    
                ))
            }
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Condominios</AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-4  text-customPrimary">
        {
                    condominios && condominios.map((cond: string, index: number) => (
                        <Link href={"advancedsearch"} onClick={() => addFilter(cond)} key={index}>
                        <p>{cond}</p>
                        </Link>
                    ))
                }
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <div className="flex flex-col space-y-3 mt-3">
    <Link href="https://wa.me" className="border-b-[1px] border-b-zinc-200 pb-4">Contato</Link>
    <Link href="/advancedsearch" className="border-b-[1px] border-b-zinc-200 pb-4">Lancamentos</Link>
    <EntreHamburguer/>
    {
      isAdmin || isSuperAdmin && <Link href="/paineladministrativo" className="border-b-[1px] border-b-zinc-200 pb-4">
        painel
        </Link>
    }

    </div>
        </div>
    )
}