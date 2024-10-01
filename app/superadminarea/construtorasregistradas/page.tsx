'use client'

import { ConstructorsType } from "@/app/@Types/types";
import { db } from "@/app/firebaseConfig";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import useSuperAdmin from "@/app/Hooks/useSuperAdmin";

function construtorasegistradas() {

    const {isSuperAdmin} = useSuperAdmin()

    const [construtoras, setConstrutoras] = useState<ConstructorsType[]>([])
    const [construtorasFiltradas, setConstrutorasFiltradas] = useState<ConstructorsType[]>([])
    const [search, setSearch] = useState('')

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db,"construtoras"))
        querySnapshot.forEach((doc) => {
            setConstrutoras((prev: any) => {
                return [...prev, doc.data()]
            })
        }
    )

}

const deleteConstrucaoPorCampo = async (nome: string) => {
    const imoveisRef = collection(db, "construtoras");

    // Criar uma query para encontrar o documento com base no campo nomeImovel
    const q = query(imoveisRef, where("nome", "==", nome));
    
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (doc) => {
      // Excluir o documento encontrado
      await deleteDoc(doc.ref);
      console.log(`Imóvel ${nome} deletado com sucesso!`);
    });
  }

  const procurarConstrucao = async () => {
    if (search.trim() === "") {
      setConstrutorasFiltradas([]);
      return; // Se o input estiver vazio, não faz a consulta
    }

    const imoveisRef = collection(db, "construtoras");

    // Consulta que busca imóveis cujo nome contém o valor do input
    const q = query(imoveisRef, where("nome", ">=", search), where("nome", "<=", search + "\uf8ff"));

    const querySnapshot = await getDocs(q);

    // Armazena os imóveis encontrados no estado
    const imoveisFiltrados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setConstrutorasFiltradas(imoveisFiltrados);
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

        <>
        <h1 className="text-center text-4xl mt-12 text-zinc-800">Construtoras Registradas</h1>    

        <div className="flex justify-center items-center space-y-4 space-x-2 mt-6">
            <input type="text" placeholder="Pesquisar pelo Nome" className="w-96 outline-none h-14 px-2 shadow-lg rounded-md"
            value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className="text-2xl cursor-pointer font-semibold"><CiSearch /></div>
        </div>


        <div className="w-full flex flex-wrap justify-center items-center mt-20 gap-12">

            {
                search.length > 0 && construtorasFiltradas.map((construcao, index) => (
                    <div className="shadow-md">
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(construcao.nome)} className='text-xl text-customPrimary
                    cursor-pointer '>remover construtora</FaRegTrashAlt>
                    <p>{construcao.nome}</p>
                    </div>
                ))
            }

            {
                construtoras && search.length <= 0 && construtoras.map((construcao, index) => (
                    <div className="flex flex-col justify-center items-center w-52 h-28 shadow-md">
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(construcao.nome)} className='text-xl text-customPrimary
                    cursor-pointer '>remover construtora</FaRegTrashAlt>
                    <p>{construcao.nome}</p>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default construtorasegistradas;