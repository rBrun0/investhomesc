'use client'

import { ConstructorsType } from "@/app/@Types/types";
import { db } from "@/app/firebaseConfig";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Roles } from "@/lib/utils";
import { toast, Toaster } from "sonner";

function Construtorasegistradas() {

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    const [construtoras, setConstrutoras] = useState<ConstructorsType[]>([])
    const [construtorasFiltradas, setConstrutorasFiltradas] = useState<ConstructorsType[]>([])
    const [search, setSearch] = useState('')

    console.log(search.length)
    console.log({construtoras})

    const fetchData = async () => {
        const temp = []
        const querySnapshot = await getDocs(collection(db,"construtoras"))
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        }
    )
    setConstrutoras(temp)

}

const deleteConstrucaoPorCampo = async (nome: string) => {

    try {
        const imoveisRef = collection(db, "construtoras");

        const q = query(imoveisRef, where("nome", "==", nome));
        
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log(`Imóvel ${nome} deletado com sucesso!`);
        });
        fetchData()
        toast.success("Construtora deletada com sucesso!")

    } catch(e) {
        console.error(e)

        toast.error("Erro ao deletar construtora")
    }
  }

    const procurarConstrutora = async () => {
    //   if (search.trim() === "") {
    //     setConstrutoras([]);
    //     return;
    //   }
    
      const imoveisRef = collection(db, "construtoras");
      const querySnapshot = await getDocs(imoveisRef);
    
      // Pegando todos os imóveis e filtrando no front-end
      const tempItems = []
      querySnapshot.forEach((item) => {
          tempItems.push(item.data())
      })
  
      const filteredItems = tempItems.filter((f) => {
          return removerAcentos(String(f.nome).toLowerCase()).includes(removerAcentos(String(search).toLowerCase()));
      })
    
      setConstrutorasFiltradas(filteredItems);
    };

    const removerAcentos = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

useEffect(() => {
    fetchData()
}, [])

useEffect(() => {
    procurarConstrutora()
}, [search])

    if (!(userProfile.role == Roles.ADMIN)) {
        return (
            <div className="text-center text-2xl text-red-600">Você não possui permissão para ver esta página.</div>
        )
    }

    return (

        <main className="w-full flex flex-col justify-center gap-4 pb-8">
        <h1 className="text-center text-4xl mt-12 text-zinc-800">Construtoras registradas</h1>    

        <div className="flex justify-center items-center space-x-2 mt-6">
            <input type="text" placeholder="Pesquisar pelo nome" className="w-96 outline-none h-14 px-2 shadow-sm border rounded-md"
            value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className="text-2xl cursor-pointer font-semibold"><CiSearch /></div>
        </div>

        <div className="w-full flex flex-wrap justify-center items-center mt-20 gap-12">

            {
                search.length > 0 && construtorasFiltradas.map((construcao) => (
                    <div className="flex flex-col justify-center items-center w-28 h-28 shadow-sm border rounded-full" key={construcao.nome}>
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(construcao.nome)}
                    className="text-xl text-customPrimary
                    cursor-pointer">
                        remover construtora</FaRegTrashAlt>
                    <p>{construcao.nome}</p>
                    </div>
                ))
            }

            {
                construtoras && search.length <= 0 && construtoras.map((construcao) => (
                    <div className="flex flex-col justify-center items-center w-28 h-28 shadow-sm border rounded-full" key={construcao.nome}>
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(construcao.nome)} className='text-xl text-customPrimary
                    cursor-pointer '>remover construtora</FaRegTrashAlt>
                    <p>{construcao.nome}</p>
                    </div>
                ))
            }
        </div>
        <Toaster/>
        </main>
    )
}

export default Construtorasegistradas;