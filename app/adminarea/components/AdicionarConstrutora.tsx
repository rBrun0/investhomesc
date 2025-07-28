"use client"    

import { auth, db } from "@/app/firebaseConfig"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { Hammer } from "lucide-react"
import { ConstructorSchema, useCreate } from "./schemas/construtora"
import {toast} from 'sonner';
import { v4 as uuidv4 } from 'uuid';



export const AdicionarConstrutora = () => {

    const {register, handleSubmit, reset, formState: {errors: formErrors } } = useCreate()
    
    const curUser = auth.currentUser
    
    async function onSubmit(data: ConstructorSchema) {

        if(data.name === "") {
            toast.error('Preencha o campo nome')
            return
        }

        try{
            const constructorsRef = collection(db, "construtoras");
        
            const q = query(constructorsRef, where("nome", "==", data.name));

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.error('Já existe uma construtora com esse nome!')
                return; 
              }

            addDoc(collection(db, "construtoras"), {
                id: uuidv4(),
                name: data.name,
                createdBy: curUser?.uid
            })

            toast.success('Construtora adicionada com sucesso!')
        } catch(error) {
            console.log({error})
        } finally {
            console.log("feitooo")
        }
        reset()
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                
                <Button className="text-xl bg-transparent text-customPrimary border border-customPrimary hover:bg-slate-100">
                <Hammer  />
                    Adicionar construtora
                </Button>

            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <h1 className="text-xl font-semibold">Adicionar construtora</h1>
            </DialogHeader>

            <form className="w-full mx-6 md:mx-0 mt-12 flex flex-col items-center outline-none" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="" className="w-full">
                    <h1 className="text-start text-sm">Nome</h1>

                <input type="text" placeholder="nome da construtora" className="text-zinc-700 pl-3 w-full h-14 border rounded-md outline-none"
                {...register('name')} />
                {
                    formErrors.name && <p className="w-full text-start text-xs text-red-500 ">{formErrors.name.message}</p>
                }
                </label>

                <Button type="submit" variant="outline" className="bg-customPrimary text-white w-28 h-10 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-8 ml-auto">Adicionar</Button>
        </form>

            </DialogContent>
        </Dialog>
    )
}