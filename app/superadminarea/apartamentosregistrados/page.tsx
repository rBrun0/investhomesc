'use client'

import { PropertyType } from "@/app/utils/types";
import { PlaceCard } from "@/app/components/PlaceCard/PlaceCard";
import { db } from "@/app/firebaseConfig";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Roles } from "@/lib/utils";
import Modal from "@/app/meusimoveis/mybuilding/Modal";
import { ExcludeDialog } from "./components/ExludeDialog";
import { toast, Toaster } from "sonner";

function ApartamentosRegistrados() {

    const selector = useSelector

    const userProfile = selector((state: RootState) => state.userSlice)

    const [apartamentos, setApartamentos] = useState<PropertyType[]>([])
    const [apartamentosFiltrados, setApartamentosFiltrados] = useState<PropertyType[]>([])
    const [search, setSearch] = useState<string>('')

    const fetchData = async () => {
        const result = []

        const querySnapshot = await getDocs(collection(db,"imoveis"))
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        }
    )
    setApartamentos(result)

}

const deleteImovelPorCampo = async (id: string) => {
    console.log("clicado", id)
    const imoveisRef = collection(db, "imoveis");

    try {
        
        const q = query(imoveisRef, where("uid", "==", id));
        
        const querySnapshot = await getDocs(q);
        
        for (const doc of querySnapshot.docs) {
            await deleteDoc(doc.ref);
            console.log(`Imóvel ${doc.id} deletado com sucesso!`);
            toast.success("Imóvel deletado com sucesso")
            fetchData()
        }
    } catch(e) {
        console.error(e)
        toast.error("Falha ao executar imóvel")
    }

    fetchData()
  }

  const removerAcentos = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const procurarConstrucao = async () => {
    if (search.trim() === "") {
      setApartamentosFiltrados([]);
      return;
    }
  
    const imoveisRef = collection(db, "imoveis");
    const querySnapshot = await getDocs(imoveisRef);
  
    // Pegando todos os imóveis e filtrando no front-end
    const tempItems = []
    querySnapshot.forEach((item) => {
        tempItems.push(item.data())
    })

    const filteredItems = tempItems.filter((f) => {
        return removerAcentos(String(f.codigoImovel).toLowerCase()).includes(removerAcentos(String(search).toLowerCase()));
    })
  
    setApartamentosFiltrados(filteredItems);
  };

useEffect(() => {
    fetchData()
}, [])

useEffect(() => {
    procurarConstrucao()
}, [search])

    if (userProfile.role !== Roles.ADMIN) {
        return (
            <div className="text-center text-2xl text-red-600">Você não possui permissão para ver esta página.</div>
        )
    }

    return (
        <>



        <main className="w-full flex flex-col justify-center pb-8">
        <h1 className="text-center text-4xl mt-12 text-zinc-800">Apartamentos registrados</h1>    

        <div className="flex justify-center items-center space-y-4 space-x-2 mt-16">
            <input type="text" placeholder="Pesquisar por código" className="w-96 outline-none h-14 px-2 border rounded-md"
            value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className="text-2xl cursor-pointer font-semibold"><CiSearch /></div>
        </div>  

        <div className="w-full flex flex-col justify-center items-center space-y-6 mt-8">

            {
                search.length > 0 && apartamentosFiltrados.map((construcao, index) => (
                    <div key={index} className="flex flex-col gap-4 pt-12 relative" > 
                        <div className="absolute right-0 top-7">
                   <ExcludeDialog deleteFunction={() => deleteImovelPorCampo(construcao.uid)}/>
                        </div>

                    <div className="absolute top-7 right-1">
                    <Modal codigoImovel={construcao.codigoImovel} fetchImoveis={fetchData} customKey={index}/>
                    </div>

                    <PlaceCard areaPrivativa={construcao.areaPrivativa} bairro={construcao.bairro} cidade={construcao.cidade} codigo={construcao.codigoImovel}
                    dataEntregaEmpreendimento={construcao.receiveTime} descricao={construcao.descricao} direcionamento='/apartmentgallery' id={String(construcao.uid)}
                    imagemUrl={construcao.imagensUrl} numeroLocal={construcao.numeroLocal} numeroRua={JSON.stringify(construcao.numeroLocal)} preco={construcao.preco} quartos={construcao.dormitorios}
                    suites={construcao.suites} vagas={construcao.vagas} key={index} numeroAnunciante={construcao.numeroAnunciante}/>
                    </div>
                ))
            }

            {
                apartamentos && search.length <= 0 && apartamentos.map((construcao, index) => (
                    <>


                    <div key={index} className="flex flex-col gap-4 pt-12 relative">
                        <div className="absolute right-0 top-7">
                   <ExcludeDialog deleteFunction={() => deleteImovelPorCampo(construcao.uid)}/>
                        </div>

                    <div className="absolute top-7 right-1">
                    <Modal codigoImovel={construcao.codigoImovel} fetchImoveis={fetchData} customKey={index}/>
                    </div>


                    <PlaceCard areaPrivativa={construcao.areaPrivativa} bairro={construcao.bairro} cidade={construcao.cidade} codigo={construcao.codigoImovel}
                    dataEntregaEmpreendimento={construcao.receiveTime} descricao={construcao.descricao} direcionamento='apartmentgallery' id={construcao.uid}
                    imagemUrl={construcao.imagensUrl} numeroLocal={construcao.numeroLocal} numeroRua={JSON.stringify(construcao.numeroLocal)} preco={construcao.preco} quartos={construcao.dormitorios}
                    suites={construcao.suites} vagas={construcao.vagas} key={index} numeroAnunciante={construcao.numeroAnunciante}/>
                    </div>
                    </>
                ))
            }
        </div>
        </main>

        <Toaster/>
            </>
    )
}

export default ApartamentosRegistrados;