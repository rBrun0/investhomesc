'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { collection,  getDocs, query, updateDoc, where } from 'firebase/firestore';
import {  db } from '../../firebaseConfig';
import { useCreate } from '@/app/adminarea/components/schemas/construtora';
import { ConstructorsType } from '@/app/@Types/types';



type ModalProps = {
    construtora: {
        createdBy: string,
        name: string
    },
    fetchConstrutora: () => Promise<void>
}

const Modal = ({construtora, fetchConstrutora}: ModalProps) => {

    // console.log("cons,", construtora)
    
    const [registeredConstructors, setRegisteredConstructors] = useState<ConstructorsType[]>()
    // console.log("csontrutora registrada,", registeredConstructors)
 
    // setBuildingSavedData();

        const fetchSiteData = async () => {
            try {
                const resultData = [];
                const q = query(collection(db, "construtoras"), where("name", "==", construtora.name));
                const querySnapshot = await getDocs(q);
            
                querySnapshot.forEach((doc) => {
                  resultData.push(doc.data());
                });
            
                setRegisteredConstructors(resultData); 
              } catch (error) {
                console.error("Erro ao buscar dados:", error);
              }
    }
    
        const {register, setValue, handleSubmit, formState: {errors: formErrors}} = useCreate()
        
        // console.log({formErrors})            
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        
        async function onSubmit(data: {name: string, }) {
            
            try {
                const q = query(collection(db, "construtoras"), where("name", "==", construtora.name));
                const querySnapshot = await getDocs(q);
                console.log("snapshot" ,querySnapshot)
            
                if (querySnapshot.empty) {
                    // console.log("snapshot vazio" ,querySnapshot)
                    toast.error("Nenhuma construtora para atualizar!");
                    console.log("Deu");
                    return;
                }
        
                if(!registeredConstructors) return;
            
                // Obtém a referência do primeiro documento encontrado
                if (!querySnapshot.empty) {
                    const docRef = querySnapshot.docs[0].ref;
            
                    await updateDoc(docRef, {
                        ...data,
                        createdBy: registeredConstructors?.[0]?.createdBy,
                        name: data.name
                    });
                    
                    setIsDialogOpen(false);
                    fetchConstrutora()
                    
                    toast.success("Construtora atualizada com sucesso!");
                } else {
                    console.log("erro")
                    toast.error("Nenhuma construtora encontrada para atualizar!");
                }
            }
            catch(err) {
            console.log({err})
            toast.error("Erro ao atualizar construtora!")
        }
        }
    
        useEffect(() => {
            fetchSiteData()
        }, [])



          useEffect(() => {
            if(!registeredConstructors) return;

            setValue("name", registeredConstructors?.[0]?.name)

          }, [registeredConstructors])

        //   console.log('errooos', formErrors)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
            <Pencil className='w-14 h-6 py-1 bg-customPrimary text-white rounded-md my-2 absolute z-10 right-20 bottom-0
                cursor-pointer'
                onClick={
                () => setIsDialogOpen(true)
                }
        />
        </DialogTrigger>
        <DialogContent className='max-h-96 overflow-y-scroll max-w-[40rem]'>
            <DialogHeader>
            <h2>Editando construtora</h2>
            </DialogHeader>

            {/* Dialog Content */}

                            <div >
            
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-16 flex flex-col justify-center items-center outline-none gap-12">
            
                            <label htmlFor="preco" className="w-full relative">
                                <h1 className="absolute -top-6  ">Nome da construtora</h1>
                            <input type="string" id="preco" placeholder=""  className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                            {...register('name')}/>
                            {
                                formErrors.name && <p className="w-full text-start text-xs text-red-500 ">{formErrors.name.message}</p>
                            }
                            </label>
        
            
                            <button className="bg-customPrimary text-white w-40 h-12 rounded-md border-[1px] border-customPrimary
                                    hover:bg-white hover:text-customPrimary transition-colors mt-16 font-semibold"
                                    type="submit">Atualizar construtora</button>
            
                        </form>
                    </div>


        </DialogContent>
    </Dialog>
  )
}

export default Modal