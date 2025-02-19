'use client'

import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice"
import { RootState } from "@/app/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



export const SelectCamp = () => {

    const filterValues = useSelector((state: RootState) => state.filterValuesSlice)



    
    const cityCampList = [
        {
            label: 'Todas as cidades',
            value: '',
        },
        {
            label: 'Itapema',
            value: 'Itapema',
        },
        {
            label: 'Balneário Camboriú',
            value: 'Balneário Camboriú',
        },
        {
            label: 'Camboriú',
            value: 'Camboriú',
        },
        {
            label: 'Porto Belo',
            value: 'Porto Belo',
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
        // {
        //     label: 'Casa Branca',
        //     value: 'casa branca',
        // },
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
            value: 'Barra Norte',
        },
        {
            label: 'Barra Sul',
            value: 'Barra Sul',
        },
        {
            label: 'Centro',
            value: 'Centro',
        },
        {
            label: 'Pioneiros',
            value:'Pioneiros',
        },
    ]

    const portoBeloNeighborhood = [
        {
            label: 'Todos os bairros',
            value: ''
        },
        {
            label: 'Centro',
            value: 'Centro',
        },
        {
            label: 'Perequê',
            value: 'Pereque',
        }
    ]

    const camboriuNeighborhood = [
        {
            label: 'Todos os bairros',
            value: ''
        },
        {
            label: 'Centro',
            value: 'Centro',
        }
    ]

    // city and neighborhood states

    const [cityCamp, setCityCamp] = useState("")
    const [selectedNeighorhood, setSelectedNeighborhood] = useState('')
    const [selectedPropertyType, setSelectedPropertyType] = useState('')
    const [selectedPropertyProfile, setSelectedPropertyProfile] = useState('')

    const dispatch = useDispatch()

    function chooseCity(e: any) {
        setCityCamp(e.target.value)
    }

    useEffect(() => {
        filterValues.cities && setCityCamp(filterValues.cities)
        filterValues.neighborhood && setSelectedNeighborhood(filterValues.neighborhood)
        filterValues.propertyType && setCityCamp(filterValues.propertyType)
        filterValues.propertyProfile && setCityCamp(filterValues.propertyProfile)
    }, [])

    
    useEffect(() => {
        console.log({filterValues})
        dispatch(setFilterValues({
            cities: cityCamp ,
            neighborhood: selectedNeighorhood,
            propertyType: selectedPropertyType,
            propertyProfile: selectedPropertyProfile,
        }))
    }, [cityCamp, selectedNeighorhood, selectedNeighorhood, selectedPropertyProfile])

    return (
        <>
            <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" value={cityCamp} onChange={(e) => chooseCity(e)}>

                {
                    cityCampList.map((vl) => (
                            <option value={vl.value} key={vl.value}>{vl.label}</option>
                    ))
                }

            </select>


            {

            cityCamp === "" &&  <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" value={selectedNeighorhood} onChange={(e) => setSelectedNeighborhood(e.target.value)}>
                                    <option>Todos Bairros...</option>
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



            <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" value={selectedPropertyType} onClick={(e: any) => setSelectedPropertyType(e.target.value)}>
                <option value="">Todos os tipos</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="sala comercial">Sala Comercial</option>
            </select>

            <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" value={selectedPropertyProfile} onClick={(e: any) => setSelectedPropertyProfile(e.target.value)}>
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