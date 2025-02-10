'use client'

import React, { useEffect, useState } from 'react'
import { brasillianState, localInfoSchema, SchemaType } from './schema';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { PhotoConfig } from '../photoConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Roles } from '@/lib/utils';


const SiteInfo = () => {

    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [actualImage, setActualImage] = useState<File | null>(null);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      const cloudinaryUpload = async (file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "presetinvesthome"); // Substitua pelo seu upload_preset
        
          const response = await fetch("https://api.cloudinary.com/v1_1/dpqsn5y55/image/upload", {
            method: "POST",
            body: formData,
          });
      
          const data = await response.json();
      
          console.log('data cloudinary', data)
          return data.secure_url;
      
      }

        const selector = useSelector
    
        const userProfile = selector((state: RootState) => state.userSlice)

  const today = new Date();

  
  const onSubmit = async (data: SchemaType) => {
      
      if(Object.keys(formErrors).length > 0) {
        toast.error('Preencha todos os campos corretamente')
        return;
    }
    
    try {
        await setDoc(doc(db, "settings", "site"), {
          telOne: `(${data.telOne.slice(0,2)}) ${data.telOne.slice(2,4)} ${data.telOne.slice(4,9)}-${data.telOne.slice(9,13)}`,
          telTwo: `(${data.telTwo.slice(0,2)}) ${data.telTwo.slice(2,4)} ${data.telTwo.slice(4,9)}-${data.telTwo.slice(9,13)}`,
          neighborhood: data.neighborhood,
          locationExplain: data.aboutLocal,
          city: data.city,
          state: data.state,
          street: data.street,
          logo: uploadImage,
          linkFacebook: data.linkFacebook,
          linkWhatsapp: data.linkWhatsapp,
          linkInstagram: data.linkInstagram,
          linkYoutube: data.linkYoutube,
          linkWaze: data.linkWaze,
          linkGoogleMaps: data.linkGoogleMaps,
        });
        
        setActualImage(uploadImage)
        // setUploadImage('http://')
        
        toast.success("Informações salvas com sucesso")
        
    } catch(e) {
        toast.error('Erro ao salvar as informações')
    }


  };
  
  const baseForm = localInfoSchema.useCreate()
  
  const { register, watch, setValue, handleSubmit, formState: {errors: formErrors} } = baseForm;
  console.log('dirty', baseForm.formState.dirtyFields)
  console.log({formErrors})
  
  console.log(watch("telOne"))
  console.log(watch("telTwo"))
  
  const carregarDados = async () => {
      const docRef = doc(db, "settings", "site");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
          const data = snap.data();
          const firstTelephone = data.telOne.split(" ").join('').split("").filter((c: string) => c !== '(' && c !== ')' && c !== '-').join('');
          const secondTelephone = data.telOne.split(" ").join('').split("").filter((c: string) => c !== '(' && c !== ')' && c !== '-').join('');
      setValue("aboutLocal", data.locationExplain);
      setValue("city", data.city);
      setValue("telOne", firstTelephone)
      setValue("telTwo", secondTelephone);
      setValue("state", data.state);
      setValue("street", data.street);
      setValue("neighborhood", data.neighborhood);
      setValue("linkFacebook", data.linkFacebook);
      setValue("linkWhatsapp", data.linkWhatsapp);
      setValue("linkInstagram", data.linkInstagram);
      setValue("linkYoutube", data.linkYoutube);
      setActualImage(data.logo)
    }
    console.log("data", snap.data())
  };

  useEffect(() => {
    carregarDados();
  }, []);

  console.log({actualImage})

      if (userProfile.role != Roles.ADMIN) {    
          return <p className="text-center text-4xl mt-12 ">Você não tem permissão para alterar dados do site.</p>;
      }

  return (
    <div className='w-full'>
        <header className='w-full h-20 border-b px-4 py-2'>
            <p className='text-2xl font-semibold'>
                Olá, {userProfile.displayName}!
            </p>
                <p className='text-lg text-zinc-500 font-medium'>
                {formatDate(today)}
            </p>
        </header>

        <main className='w-full px-4 py-4 flex gap-4 flex-wrap'>
            <form action="" className='w-full flex flex-wrap gap-4' onSubmit={handleSubmit(onSubmit)}>


            <label htmlFor="telone">
                <h1 className='text-sm text-zinc-700' >Telefone 1</h1>
            <input type="text" id='telone' maxLength={13}
            {...register('telOne')} placeholder='55 47 999999999'
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>


            <label htmlFor="teltwo">
                <h1 className='text-sm text-zinc-700'>Telefone 2</h1>
            <input type="text" id='teltwo' maxLength={13} placeholder='55 47 999999999'
            {...register('telTwo')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="neighborhood">
                <h1 className='text-sm text-zinc-700'>Bairro</h1>
            <input type="tel" id='neighborhood'
            {...register('neighborhood')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Cidade</h1>
            <input type="text" id='city' 
            {...register('city')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="state" >
                <h1 className='text-sm text-zinc-700'>Estado</h1>
            <select id='state' {...register('state')}
            className='rounded border outline-none w-52 h-8'>
                {
                    brasillianState.map((s) => {
                        return <option key={s.value} value={s.value}>{s.label}</option>
                    })
                }
            </select>
            </label>

            <label htmlFor="street">
                <h1 className='text-sm text-zinc-700'>Rua</h1>
            <input type="text" id='street' {...register('street')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Link Whatsapp</h1>
            <input type="text" id='city' 
            {...register('linkWhatsapp')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Link Instagram</h1>
            <input type="text" id='city' 
            {...register('linkInstagram')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Link Facebook</h1>
            <input type="text" id='city' 
            {...register('linkFacebook')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Link Youtube</h1>
            <input type="text" id='city' 
            {...register('linkYoutube')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Link Waze</h1>
            <input type="text" id='city' 
            {...register('linkWaze')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>
            
            <label htmlFor="city">
                <h1 className='text-sm text-zinc-700'>Link Google Maps</h1>
            <input type="text" id='city' 
            {...register('linkGoogleMaps')}
            className='rounded border outline-none w-52 h-8 px-2'/>
            </label>

            <label htmlFor="aboutLocal">
                <h1 className='text-sm text-zinc-700'>Sobre o local</h1>
                <textarea name="" id="" {...register('aboutLocal')}
                className='rounded border outline-none w-96 h-28 px-3 py-1'
                placeholder='máximo 85 caracteres'
                >

                </textarea>
            </label>

            <div className='flex items-center justify-center'>
            <PhotoConfig cloudinaryUpload={cloudinaryUpload} setUploadImage={setUploadImage} uploadImage={uploadImage} actualImage={actualImage}/>
            
                {/* actualImage && 
                <div className='absolute bottom-20 right-10'>
                    <div className='relative w-32 h-32 border rounded-full'>
                         <Image src={String(actualImage)} alt="Logo" className='w-20 h-20' fill objectFit='cover'/>
                    </div>
                </div> */}
            
            </div>





            <Button variant='default' type='submit'>
                Salvar
            </Button>
            </form>
        </main>

        <Toaster/>
    </div>
  )
}

export default SiteInfo