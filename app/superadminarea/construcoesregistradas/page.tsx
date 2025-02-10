'use client'

import { ConstructionsType } from "@/app/@Types/types";
import { PlaceCard } from "@/app/components/PlaceCard/PlaceCard";
import { db } from "@/app/firebaseConfig";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import useSuperAdmin from "@/app/Hooks/useSuperAdmin";

function construcoesRegistradas() {

    const {isSuperAdmin} = useSuperAdmin();

    const [constructions, setConstructions] = useState<ConstructionsType[]>([])
    const [construcoesFiltradas, setconstrucoesFiltradas] = useState<ConstructionsType[]>([])
    const [search, setSearch] = useState('')

    const fetchData = async () => {

        const result = [];

        const querySnapshot = await getDocs(collection(db,"construcao"))
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        }
    )
    setConstructions(result)

}

const deleteConstrucaoPorCampo = async (id: string) => {
    const imoveisRef = collection(db, "construcao");

    // Criar uma query para encontrar o documento com base no campo nomeImovel
    const q = query(imoveisRef, where("id", "==", id));
    
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (doc) => {
      // Excluir o documento encontrado
      await deleteDoc(doc.ref);
      console.log(`Imóvel ${id} deletado com sucesso!`);
    });
  }

  const procurarConstrucao = async () => {
    if (search.trim() === "") {
      setconstrucoesFiltradas([]);
      return; // Se o input estiver vazio, não faz a consulta
    }

    const imoveisRef = collection(db, "construcao");

    // Consulta que busca imóveis cujo nome contém o valor do input
    const q = query(imoveisRef, where("codigo", ">=", search), where("codigo", "<=", search + "\uf8ff"));

    const querySnapshot = await getDocs(q);

    // Armazena os imóveis encontrados no estado
    const imoveisFiltrados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // @ts-expect-error expected error
    setconstrucoesFiltradas(imoveisFiltrados);
  };




useEffect(() => {
    fetchData()
}, [])

useEffect(() => {
    procurarConstrucao()
}, [search])

        if (!isSuperAdmin) {
            return (
                <div className="text-center text-2xl text-red-600">Você não possui permissão para ver esta página.</div>
            )
        }

    return (
        <div className="w-full flex flex-col mt-12 gap-4 pb-8">
        <h1 className="text-center text-4xl mt-12 text-zinc-800">Construções registradas</h1>    

        <div className="flex justify-center items-center space-y-4 space-x-2 mt-6">
            <input type="text" placeholder="Pesquisar por Codigo" className="w-96 outline-none h-14 px-2 shadow-lg rounded-md"
            value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className="text-2xl cursor-pointer font-semibold"><CiSearch /></div>
        </div>


        <div className="w-full flex flex-col justify-center items-center space-y-6 mt-8">

            {
                search.length > 0 && construcoesFiltradas.map((construcao, index) => (
                    <>
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(construcao.id)} className='text-xl text-customPrimary
                    cursor-pointer '>remover construcao</FaRegTrashAlt>
                    <PlaceCard areaPrivativa={construcao.areaPrivativa} bairro={construcao.bairro} cidade={construcao.cidade} codigo={construcao.codigo}
                    dataEntregaEmpreendimento={construcao.dataEntregaEmpreendimento} descricao={construcao.descricao} direcionamento='/apartmentgallery' id={construcao.id}
                    imagemUrl={construcao.imagens} numeroLocal={construcao.numeroLocal} numeroRua={JSON.stringify(construcao.numeroLocal)} preco={construcao.preco} quartos={construcao.dormitorios}
                    suites={JSON.stringify(construcao.suites)} vagas={construcao.vagas} key={index}/>
                    </>
                ))
            }

            {
                constructions && search.length <= 0 && constructions.map((construcao, index) => (
                    <>
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(construcao.id)} className='text-xl text-customPrimary
                    cursor-pointer '>remover construcao</FaRegTrashAlt>
                    <PlaceCard areaPrivativa={construcao.areaPrivativa} bairro={construcao.bairro} cidade={construcao.cidade} codigo={construcao.codigo}
                    dataEntregaEmpreendimento={construcao.dataEntregaEmpreendimento} descricao={construcao.descricao} direcionamento='/apartmentgallery' id={construcao.id}
                    imagemUrl={construcao.imagens} numeroLocal={construcao.numeroLocal} numeroRua={JSON.stringify(construcao.numeroLocal)} preco={construcao.preco} quartos={construcao.dormitorios}
                    suites={JSON.stringify(construcao.suites)} vagas={construcao.vagas} key={index}/>
                    </>
                ))
            }
        </div>
        </div>
    )
}

export default construcoesRegistradas;