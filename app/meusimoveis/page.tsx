"use client"

import { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import useAdmin from "../Hooks/useAdmin";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { PlaceCard } from '../components/PlaceCard/PlaceCard';
import { ConstructionsType, Construtora, PropertyType } from '../@Types/types';
import { FaRegTrashAlt } from "react-icons/fa";


function meusimoveis() {
  
    const [minhaConstrutora, setMinhaConstrutora] = useState<Construtora[]>([])

    const user = auth.currentUser;

    useEffect(() => {
        const fetchImoveis = async () => {
          if (user) {
            const q = query(collection(db, 'imoveis'), where('createdBy', '==', user.uid));  // Filtra os imóveis do corretor logado
            const querySnapshot = await getDocs(q);
    
            const imoveisData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setImoveis(imoveisData);
            setLoading(false);
          }
        };

        const fetchConstrucao = async () => {
            if (user) {
              const q = query(collection(db, 'construcao'), where('createdBy', '==', user.uid));  // Filtra os imóveis do corretor logado
              const querySnapshot = await getDocs(q);
      
              const imoveisData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setConstrucoes(imoveisData);
              setLoading(false);
            }
          };

          const fetchConstrutora = async() => {
            if (user) {
              const q = query(collection(db, 'construtoras'), where('createdBy', '==', user.uid));  // Filtra os imóveis do corretor logado
              const querySnapshot = await getDocs(q);
      
              const imoveisData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
              setMinhaConstrutora(imoveisData)
              setLoading(false);
            }
          }
    
        fetchImoveis();
        fetchConstrucao();
        fetchConstrutora()

      
      }, []);

      const deleteImovelPorCampo = async (id: string) => {
        const imoveisRef = collection(db, "imoveis");
  
        // Criar uma query para encontrar o documento com base no campo nomeImovel
        const q = query(imoveisRef, where("id", "==", id));
        
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (doc) => {
          // Excluir o documento encontrado
          await deleteDoc(doc.ref);
          console.log(`Imóvel ${id} deletado com sucesso!`);
        });
      };

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

      const deleteConstrutora = async (id: string) => {
        try {
          await deleteDoc(doc(db, 'construtoras', id));
          alert('construtora excluida com sucesso');
        } catch (error) {
          console.error('Erro ao excluir imóvel: ', error);
        }
      };

    const [imoveis, setImoveis] = useState<PropertyType[]>([]);
    const [loading, setLoading] = useState(true);

    const [construcoes, setConstrucoes] = useState<ConstructionsType[]>([])

    const isAdmin = useAdmin()
    
    if(!isAdmin) {
        return <p className="text-center text-3xl mt-4">Você não possui permissão para acessar essa página.</p>
    }

    return (
        <main className="w-full min-h-screen">
            <div className="flex flex-wrap justify-center items-center h-full">
                <div className="w-full md:w-1/2 p-6 space-y-2">
                    <h1 className="text-3xl font-bold text-center">Meus imóveis</h1>
                    <p className="text-gray-600 text-center">Veja todos os seus imóveis cadastrados no sistema.</p>
                </div>
            </div>
            
            {/* Listar imóveis aqui */}

            <div className='w-full flex flex-col justify-center items-center space-y-8d'>
                {
                    
                    imoveis && imoveis.map((imovel, index) => (
                        <div className='flex flex-col items-center'>
                        <FaRegTrashAlt className='w-20 h-6 bg-slate-500 text-white rounded-md my-2' onClick={() => deleteImovelPorCampo(JSON.stringify(imovel.codigoImovel))}/>
                        <PlaceCard areaPrivativa={imovel.areaPrivativa} bairro={imovel.bairro} cidade={imovel.cidade} codigo={imovel.codigoImovel}
                    dataEntregaEmpreendimento={imovel.dataEntregaEmpreendimento} descricao={imovel.descricao} direcionamento='/apartmentgallery' id={imovel.id}
                    imagemUrl={imovel.imagensUrl} numeroLocal={imovel.numeroLocal} numeroRua={imovel.numeroRua} preco={imovel.preco} quartos={imovel.quartos}
                    suites={JSON.stringify(imovel.suites)} vagas={imovel.vagas} key={index}/>
                    </div>
                    ))
                    
                }
            </div>

            <h1 className='text-center text-4xl mt-20 '>Construcoes</h1>

            <div className='w-full flex flex-col justify-center items-center space-y-8 mt-12'>
                {
                    construcoes && construcoes.map((imovel, index) => (
                    <div className='flex flex-col items-center'>
                    <FaRegTrashAlt onClick={() => deleteConstrucaoPorCampo(imovel.id)} className='text-xl text-customPrimary
                    cursor-pointer '>remover construcao</FaRegTrashAlt>
                    <PlaceCard areaPrivativa={imovel.areaPrivativa} bairro={imovel.bairro} cidade={imovel.cidade} codigo={imovel.codigo}
                    dataEntregaEmpreendimento={imovel.dataEntregaEmpreendimento} descricao={imovel.descricao} direcionamento='/apartmentgallery' id={imovel.id}
                    imagemUrl={imovel.imagens} numeroLocal={imovel.numeroLocal} numeroRua={JSON.stringify(imovel.numeroLocal)} preco={imovel.preco} quartos={imovel.dormitorios}
                    suites={JSON.stringify(imovel.suites)} vagas={imovel.vagas} key={index}/>
                    
                    </div>
                    ))
                }
            </div>

            <h1 className='text-center text-4xl mt-20 '>Construtora</h1>

            <div className='w-full flex flex-col justify-center items-center space-y-8 mt-12'>
                {
                    minhaConstrutora && minhaConstrutora.map((con) => (
                      <div className='flex flex-col justify-center items-center'>
                        <FaRegTrashAlt onClick={() => deleteConstrutora(con.id)}/>
                        <h1>Construtora: {con.nome}</h1>
                      </div>
                    ))
                }
            </div>

        </main>
    )
}

export default meusimoveis;