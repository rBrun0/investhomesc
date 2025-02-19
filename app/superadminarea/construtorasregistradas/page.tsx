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
import { Edit } from "lucide-react";
import Modal from "@/app/meusimoveis/myconstructor/ConstructorModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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

        const q = query(imoveisRef, where("name", "==", nome));
        
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
    fetchData()

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
                search.length > 0 && construtorasFiltradas.map((constructor) => (
                    <div className="flex flex-col justify-center items-center w-28 h-28 shadow-sm border rounded-md" key={constructor.name}>
                        <div className="flex justify-center items-center gap-2">

                        <AlertDialog>
                      <AlertDialogTrigger>
                    <FaRegTrashAlt className='w-14 h-6 py-1 bg-customPrimary text-white rounded-md my-2 absolute z-10 right-2
                    cursor-pointer'
                      />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza de que deseja excluir ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>


                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction className='bg-red-500 text-white px-4 py-2 rounded-md'
                          onClick={() => deleteConstrucaoPorCampo(constructor.name)}>
                            Excluir
                          </AlertDialogAction>


                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                        <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(constructor.name)}
                            className="text-xl text-customPrimary
                            cursor-pointer">
                            remover construtora
                        </FaRegTrashAlt>



                        <Edit onClick={() => deleteConstrucaoPorCampo(constructor.name)} className='text-xl text-customPrimary
                        cursor-pointer '>
                        remover construtora
                        </Edit>

                        </div>
                    <p>{constructor.name}</p>
                    </div>
                ))
            }

            {
                construtoras && search.length <= 0 && construtoras.map((constructor) => (
                    <div className="flex flex-col justify-center items-center w-48 h-28 shadow-sm border rounded-md relative" key={constructor.name}>
                        <div className="flex justify-center items-center gap-2">
                            <Modal construtora={constructor} fetchConstrutora={fetchData}/>

                            <div className="absolute bottom-8 right-3 -translate-y-[1px]">
                                
                        <AlertDialog>
                      <AlertDialogTrigger>
                    <FaRegTrashAlt className='w-14 h-6 py-1 bg-customPrimary text-white rounded-md my-2 absolute z-10 right-2
                    cursor-pointer'
                    />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza de que deseja excluir ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>


                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction className='bg-red-500 text-white px-4 py-2 rounded-md'
                          onClick={() => deleteConstrucaoPorCampo(constructor.name)}>
                            Excluir
                          </AlertDialogAction>


                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </div>



                        </div>
                    <p>{constructor.name}</p>
                    </div>
                ))
            }
        </div>
        <Toaster/>
        </main>
    )
}

export default Construtorasegistradas;