"use client"

import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { PlaceCard } from '../components/PlaceCard/PlaceCard';
import { ConstructorsType, PropertyType } from '../@Types/types';
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Roles } from '@/lib/utils';
import { 
   AlertDialog, AlertDialogAction, AlertDialogCancel,
   AlertDialogContent, AlertDialogDescription,
   AlertDialogFooter, AlertDialogHeader,
   AlertDialogTitle, AlertDialogTrigger
  }
 from '@/components/ui/alert-dialog';
import Modal from './mybuilding/Modal';
import ConstructorModal from './myconstructor/ConstructorModal'
import { toast, Toaster } from 'sonner';


function Meusimoveis() {
  
    const [minhaConstrutora, setMinhaConstrutora] = useState<ConstructorsType[]>([])
    const [imoveis, setImoveis] = useState<PropertyType[]>([]);

    const [searchValue, setSearchValue] = useState('')

    const selector = useSelector
    const userProfile = selector((state: RootState) => state.userSlice)

    const fetchImoveis = async () => {
        const q = query(collection(db, 'imoveis'), where('createdBy', '==', userProfile.uid));
        const querySnapshot = await getDocs(q);

        const temp = []

        querySnapshot.forEach((i) => {
          temp.push(i.data())
        })

        setImoveis(temp);
      
    };

    const fetchConstrutora = async() => {
        const q = query(collection(db, 'construtoras'), where('createdBy', '==', userProfile.uid)); 
        const querySnapshot = await getDocs(q);

        const temp = []

        querySnapshot.forEach(doc => {
          temp.push(doc.data())
        });

        setMinhaConstrutora(temp)
    }

      const deleteImovelPorCampo = async (uid: string) => {
        const imoveisRef = collection(db, "imoveis");

        toast.success(uid)
  
        const q = query(imoveisRef, where("uid", "==", uid));
        
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          toast.error("Nenhuma construtora encontrada!");
          return;
        }
        
        querySnapshot.forEach(async (doc) => {
          // Excluir o documento encontrado
          await deleteDoc(doc.ref);
          toast.success("imovel deletado com sucesso!")
          console.log(`Imóvel ${uid} deletado com sucesso!`);
        });

        fetchImoveis()
      };

      const deleteConstrutora = async (id: string) => {
        try {
          const imoveisRef = collection(db, "construtoras");
          const q = query(imoveisRef, where("id", "==", id));
          const querySnapshot = await getDocs(q);
      
          if (querySnapshot.empty) {
            toast.error("Nenhuma construtora encontrada!");
            return;
          }
      
          await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              console.log("Construtora encontrada:", doc.data());
              await deleteDoc(doc.ref);
              console.log(`Construtora ${id} deletada com sucesso!`);
              toast.success("Construtora excluída com sucesso!" + JSON.stringify(doc.data()));
            })
          );
      
          // toast.success("Construtora excluída com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir construtora:", error);
          toast.error("Erro ao excluir construtora!");
        }
      };



      useEffect(() => {
        fetchImoveis();
        fetchConstrutora()
      }, []);
    
    if(!(userProfile.role === Roles.ADMIN || userProfile.role === Roles.CORRETOR)) {
        return <p className="text-center text-3xl mt-4">Você não possui permissão para acessar essa página.</p>
    }

    return (
      <>
        <main className="w-full min-h-screen">
            <div className="flex flex-wrap justify-center items-center">
                <div className="w-full md:w-1/2 p-6 space-y-2 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-center">Meus imóveis</h1>
                    <p className="text-gray-600 text-center">Veja todos os seus imóveis cadastrados no sistema.</p>
                    <input type="text" 
                    className='w-96 h-10 border rounded-md px-2 outline-none'
                    placeholder='Filtrar por código'
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                    />

                </div>
            </div>
            

            <div className='w-full flex flex-col justify-center items-center space-y-8'>

              {
                searchValue.length >= 1 && (
                  imoveis && imoveis.filter((im) => {
                    return im.codigoImovel.includes(searchValue)
                  }).map((imovel, index) => (
                    <div className='flex flex-col items-center relative' key={index}>

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
                          onClick={() => deleteImovelPorCampo(imovel.uid)}>
                            Excluir
                          </AlertDialogAction>


                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Modal
                    codigoImovel={imovel.codigoImovel} 
                    fetchImoveis={fetchImoveis}
                    />

                    <PlaceCard 
                    areaPrivativa={imovel.areaPrivativa} bairro={imovel.bairro} cidade={imovel.cidade}
                    codigo={imovel.codigoImovel} dataEntregaEmpreendimento={imovel.receiveTime}
                    descricao={imovel.descricao}
                    direcionamento='apartmentgallery' id={String(imovel.uid)}
                    imagemUrl={imovel.imagensUrl} numeroLocal={imovel.numeroLocal} numeroRua={imovel.numeroRua} preco={imovel.preco}
                    quartos={imovel.dormitorios}
                    suites={imovel.suites} vagas={imovel.vagas} key={index} numeroAnunciante={imovel.numeroAnunciante}
                    />

                </div>
                ))
                                  
                )
              }

                {
                    
                    searchValue.length < 1 && imoveis && imoveis.map((imovel, index) => (
                        <div className='flex flex-col items-center relative' key={index}>

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
                              onClick={() => deleteImovelPorCampo(imovel.uid)}>
                                Excluir
                              </AlertDialogAction>


                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Modal
                        codigoImovel={imovel.codigoImovel} 
                        fetchImoveis={fetchImoveis}
                        />

                        <PlaceCard 
                        areaPrivativa={imovel.areaPrivativa} bairro={imovel.bairro} cidade={imovel.cidade}
                        codigo={imovel.codigoImovel} dataEntregaEmpreendimento={imovel.receiveTime}
                        descricao={imovel.descricao}
                        direcionamento='apartmentgallery' id={String(imovel.uid)}
                        imagemUrl={imovel.imagensUrl} numeroLocal={imovel.numeroLocal} numeroRua={imovel.numeroRua} preco={imovel.preco}
                        quartos={imovel.dormitorios}
                        suites={imovel.suites} vagas={imovel.vagas} key={index} numeroAnunciante={imovel.numeroAnunciante}
                        />

                    </div>
                    ))
                    
                }
            </div>

            <h1 className='text-center text-4xl mt-20 '>Construtoras</h1>

            <div className='w-full flex flex-wrap justify-start items-center gap-4 mt-12 mb-4'>
                {
                    minhaConstrutora && minhaConstrutora.map((con, index) => (
                      <div className='w-96 h-24  relative border rounded-md px-8 flex items-start justify-center' key={index}>
                        <AlertDialog>
                          <AlertDialogTrigger>
                        <FaRegTrashAlt className='w-14 h-6 py-1 bg-customPrimary text-white rounded-md my-2 absolute z-10 right-2 bottom-0
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
                              onClick={() => {
                                console.log(con.name)
                                deleteConstrutora(con.id)
                                fetchConstrutora()
                              }}>
                                Excluir
                              </AlertDialogAction>


                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <ConstructorModal 
                        construtora={con}
                        fetchConstrutora={fetchConstrutora}
                        />
                        <div className='w-full flex flex-col items-start'>
                        <h1><span>Construtora:</span></h1>
                        <h1 className='text-xl font-semibold'>{con.name}</h1>

                        </div>
                      </div>
                    ))
                }
            </div>

        </main>

        <Toaster/>
        </>
    )
}

export default Meusimoveis;