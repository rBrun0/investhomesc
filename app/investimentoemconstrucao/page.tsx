'use client'

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ConstructionsType } from "../@Types/types";
import { PlaceCard } from "../components/PlaceCard/PlaceCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { VscSettings } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { resetFilterValues } from "../features/filterValues/filterValuesSlice";
import { ConstructionFilterDialog } from "./components/ConstructionFilterDialog";
import { RootState } from "../store";

function investimentoEmConstrucao() {

    function comparaArrays(arr1: string[], arr2: string[]) {
        const maiorArray = arr1.length > arr2.length ? arr1 : arr2
        const menorArray = arr1.length < arr2.length ? arr1 : arr2
        let itemParecido = false
    
        for(let i = 0; i < maiorArray.length; i++) {
            for(let j = 0; j < maiorArray.length; j++) {
                if(maiorArray[i] === menorArray[j]) {
                    itemParecido = true
                }
            }
        }
    
        return itemParecido
    };


    const [filteredData, setFilteredData] = useState<ConstructionsType[] | null>()

    const filterValues = useSelector((state: RootState) => state.constructionFilterSlice)

    const dispatch = useDispatch()

    // const imagem1 = "https://firebasestorage.googleapis.com/v0/b/dfatto-a05ca.appspot.com/o/apartment1.avif?alt=media&token=498d5991-6294-4d75-a451-d8bff58a6078"

    const [constructions, setConstructions] = useState<ConstructionsType[]>([]);
    let filteredProperties: any = constructions;

    function dispatchFilter() {
        if(filterValues.constructionInformations.length > 0 || filterValues.condominumInformations.length > 0) {
            filteredProperties = filteredProperties?.filter((prp: ConstructionsType) => {
                return comparaArrays(filterValues.constructionInformations, prp.caracteristicasCondominio) || comparaArrays(filterValues.condominumInformations, prp.caracteristicasCondominio)
            })
        }

         setFilteredData(filteredProperties)
    }

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db,"construcao"))
        querySnapshot.forEach((doc) => {
            setConstructions((prev: any) => {
                return [...prev, doc.data()]
            })
        }
    )
    }


    useEffect(() => {
        dispatchFilter()
        setConstructions([])
        fetchData() 
        console.log(filterValues)
        console.log(filteredProperties)
    }, [filterValues])
    
    return (
        <>

        <h1 className="text-center text-4xl mt-14">INVESTIMENTO EM CONSTRUCAO</h1>

            <div className="flex space-x-2 pb-4 mt-8 ml-44 pl-3">

                <Dialog>
                    <DialogTrigger className="w-40 h-12 space-x-1 text-customPrimary border-2 border-customPrimary border-solid rounded-md  flex justify-center items-center"
                    ><VscSettings className="font-semibold"/> <span>Filtro Refinado</span>
                    </DialogTrigger>

                    <ConstructionFilterDialog/>

                </Dialog>


                <button className="w-40 h-12 space-x-1  text-customPrimary border-2 border-customPrimary border-solid rounded-md flex justify-center items-center"
                onClick={() => dispatch(resetFilterValues())}>
                <IoIosSearch width={40} height={40}/> <span>Limpar Pesquisa</span>
                </button>

            </div>

        <main className="w-full min-h-screen mt-20 space-y-10 mb-10 flex flex-col justify-center items-center">

            {
                filteredData && filteredData?.length == 0 && (
                    <div className="flex justify-center items-center">
                        <h2 className="text-customPrimary font-semibold text-2xl">Nenhum resultado encontrado.</h2>
                    </div>
                 )
            }


            {   
                filteredData && filteredData.length > 0 ? filteredData.map((con) => {
                    return (
                        <PlaceCard areaPrivativa={con.areaPrivativa} bairro={con.bairro} cidade={con.cidade} codigo={con.codigo} dataEntregaEmpreendimento={con.dataEntregaEmpreendimento}
                        descricao={con.descricao} id={con.id} imagemUrl={con.imagens} numeroLocal={con.numeroLocal} numeroRua={con.rua} preco={con.preco} quartos={con.suites}
                        suites={JSON.stringify(con.suites)} vagas={con.vagas} direcionamento="investimentoemconstrucao/galeriaconstrucao"/>
                    )
                }) 
                :

                constructions && constructions.map((con) => {
                    return (
                        <PlaceCard areaPrivativa={con.areaPrivativa} bairro={con.bairro} cidade={con.cidade} codigo={con.codigo} dataEntregaEmpreendimento={con.dataEntregaEmpreendimento}
                        descricao={con.descricao} id={con.id} imagemUrl={con.imagens} numeroLocal={con.numeroLocal} numeroRua={con.rua} preco={con.preco} quartos={con.suites}
                        suites={JSON.stringify(con.suites)} vagas={con.vagas} direcionamento="investimentoemconstrucao/galeriaconstrucao"/>
                    )
                })

                
            }

        {   
                !filteredData && constructions.map((con) => {
                    return (
                        <PlaceCard areaPrivativa={con.areaPrivativa} bairro={con.bairro} cidade={con.cidade} codigo={con.codigo} dataEntregaEmpreendimento={con.dataEntregaEmpreendimento}
                        descricao={con.descricao} id={con.id} imagemUrl={con.imagens} numeroLocal={con.numeroLocal} numeroRua={con.rua} preco={con.preco} quartos={con.suites}
                        suites={JSON.stringify(con.suites)} vagas={con.vagas} direcionamento="investimentoemconstrucao/galeriaconstrucao"/>
                    )
                })
            }
        </main>
        </>
    )
}

export default investimentoEmConstrucao;