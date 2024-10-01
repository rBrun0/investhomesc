'use client'

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import { RootState } from "@/app/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



export const SelectCamp = () => {


    
    const cityCampList = [
        {
            label: 'Todas as cidades',
            value: '',
        },
        {
            label: 'Itapema',
            value: 'itapema',
        },
        {
            label: 'Balneário Camboriú',
            value: 'balneario camboriu',
        },
        {
            label: 'Camboriú',
            value: 'camboriu',
        },
        {
            label: 'Porto Belo',
            value: 'porto belo',
        },
    ]

    const itapemaNeighborhood = [
        {
            label: 'Todos os bairros',
            value: ''
        },
        {
            label: 'Alto São Bento',
            value: 'alto sao bento',
        },
        {
            label: 'Casa Branca',
            value: 'casa branca',
        },
        {
            label: 'Ilhota',
            value: 'ilhota',
        },
        {
            label: 'Meia Praia',
            value:'meia praia',
        },
        {
            label: 'Morretes',
            value:'morretes',
        },
        {
            label: 'Tabuleiro',
            value: 'tabuleiro',
        },
        {
            label: 'Centro',
            value: 'centro',
        }
    ]

    const balnearioCamboriuNeighborhood = [
        {
            label: 'Todos os bairros',
            value: ''
        },
        {
            label: 'Barra Norte',
            value: 'barra norte',
        },
        {
            label: 'Barra Sul',
            value: 'barra sul',
        },
        {
            label: 'Centro',
            value: 'centro',
        },
        {
            label: 'Pioneiros',
            value:'pioneiros',
        },
    ]

    const portoBeloNeighborhood = [
        {
            label: 'Todos os bairros',
            value: ''
        },
        {
            label: 'Centro',
            value: 'centro',
        },
        {
            label: 'Perequê',
            value: 'pereque',
        }
    ]

    const camboriuNeighborhood = [
        {
            label: 'Todos os bairros',
            value: ''
        },
        {
            label: 'Centro',
            value: 'centro',
        }
    ]

    // city and neighborhood states

    const [cityCamp, setCityCamp] = useState("")

    const [selectedNeighorhood, setSelectedNeighborhood] = useState('')

    const dispatch = useDispatch()
    const filters = useSelector((state: RootState) => state.filterValuesSlice)

    function chooseCity(e: any) {
        setCityCamp(e.target.value)
    }



    // property Type states 

    const [selectedPropertyType, setSelectedPropertyType] = useState('')

    // property profile states

    const [selectedPropertyProfile, setSelectedPropertyProfile] = useState('')

    
    useEffect(() => {
        dispatch(setFilterValues({
            cities: cityCamp,
            neighborhood: selectedNeighorhood,
            propertyType: selectedPropertyType,
            propertyProfile: selectedPropertyProfile,
        }))
    }, [cityCamp, selectedNeighorhood, selectedNeighorhood, selectedPropertyProfile])

    return (
        <>
            <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onChange={(e) => chooseCity(e)}>

                {
                    cityCampList.map((vl) => (
                            <option value={vl.value} key={vl.value}>{vl.label}</option>
                    ))
                }

            </select>

            {

            cityCamp === "" &&  <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onChange={(e) => setSelectedNeighborhood(e.target.value)}>
                                    <option value="">Todos Bairros...</option>
                                </select>

            }

            {
                cityCamp === "itapema" &&  <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onChange={(e) => setSelectedNeighborhood(e.target.value)}>
                                            {
                                                 itapemaNeighborhood.map((vl) => (
                                                     <option value={vl.value} key={vl.value}>{vl.label}</option>
                                                 ))
                                             }
                                            </select>
            }

            {
                cityCamp === "balneario camboriu" &&  <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onChange={(e) => setSelectedNeighborhood(e.target.value)}>
                                                            {
                                                                 balnearioCamboriuNeighborhood.map((vl) => (
                                                                     <option value={vl.value} key={vl.value}>{vl.label}</option>
                                                                 ))
                                                             }
                                                            </select>
            }

            {
                cityCamp === "camboriu" &&  <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onChange={(e) => setSelectedNeighborhood(e.target.value)}>
                                                                    {
                                                                         camboriuNeighborhood.map((vl) => (
                                                                             <option value={vl.value} key={vl.value}>{vl.label}</option>
                                                                         ))
                                                             }
                                                            </select>
            }

            {
                cityCamp === "porto belo" &&  <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onChange={(e) => setSelectedNeighborhood(e.target.value)}>
                                                                    {
                                                                         portoBeloNeighborhood.map((vl) => (
                                                                             <option value={vl.value} key={vl.value}>{vl.label}</option>
                                                                         ))
                                                             }
                                                            </select>
            }




            {/*  */}



            <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onClick={(e: any) => setSelectedPropertyType(e.target.value)}>
                <option value="">Todos os tipos</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="sala comercial">Sala Comercial</option>
            </select>

            <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" onClick={(e: any) => setSelectedPropertyProfile(e.target.value)}>
                <option value="">Todos os perfis</option>
                <option value="chacara flora">Chacara Flora</option>
                <option value="frente avenida">Frente Avenida</option>
                <option value="frente mar">Frente Mar</option>
                <option value="lancamentos">Lancamentos</option>
                <option value="mobiliados">Mobiliados</option>
                <option value="plaza iate club">Plaza Iate Club</option>
                <option value="quadra do mar">Quadra do Mar</option>
                <option value="sem mobilia">Sem Mobilia</option>
                <option value="showroom">Showroom</option>
            </select>        
        </>
    )

}