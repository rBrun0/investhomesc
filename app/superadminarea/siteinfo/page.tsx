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
import { cn, Roles } from '@/lib/utils';
import InputMask from 'react-input-mask';
import { OfficeImageConfig } from '../photoConfig/OfficeImageConfig';

const SiteInfo = () => {

    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [actualImage, setActualImage] = useState<File | null>(null);
    const [officeImage, setOfficeImage] = useState<File | null>(null);
    const [currentOfcImage, setCurrentOfcImage] = useState<File | null>(null);

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
          telOne: data.telOne,
          telTwo: data.telTwo,
          neighborhood: data.neighborhood,
          locationExplain: data.aboutLocal,
          city: data.city,
          state: data.state,
          street: data.street,
          logo: uploadImage,
          officeImage: officeImage,
          linkFacebook: data.linkFacebook,
          linkWhatsapp: data.linkWhatsapp,
          linkInstagram: data.linkInstagram,
          linkYoutube: data.linkYoutube,
          linkWaze: data.linkWaze,
          linkGoogleMaps: data.linkGoogleMaps,
        });
        
        setActualImage(uploadImage);
        setCurrentOfcImage(officeImage);
        // setUploadImage('http://')
        
        toast.success("Informações salvas com sucesso")
        
    } catch(e) {
        toast.error('Erro ao salvar as informações')
    }


  };
  
  const baseForm = localInfoSchema.useCreate();
  
  const { register, watch, setValue, handleSubmit, formState: {errors: formErrors} } = baseForm;
  console.log({formErrors})
  
  console.log(watch("telOne"))
  console.log(watch("telTwo"))
  
  const carregarDados = async () => {
      const docRef = doc(db, "settings", "site");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
          const data = snap.data();
          const firstTelephone = data.telOne
          const secondTelephone = data.telOne
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
  };

  useEffect(() => {
    carregarDados();
  }, []);

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
                <InputMask mask="(99) 99 99999-9999" placeholder="(55) 47 91234-5678" 
                {...register('telOne')} className="rounded border outline-none w-52 h-8 px-2"
            />
            </label>

            <label htmlFor="teltwo">
                <h1 className='text-sm text-zinc-700'>Telefone 2</h1>
                <InputMask mask="(99) 99 99999-9999" placeholder="(55) 47 91234-5678" 
                {...register('telOne')} className="rounded border outline-none w-52 h-8 px-2"
                />
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
            <OfficeImageConfig cloudinaryUpload={cloudinaryUpload} setUploadImage={setOfficeImage} uploadImage={officeImage} actualImage={currentOfcImage}/>
            
            </div>

            <Button variant='default' type='submit' className={cn(
                'absolute rounded-full bottom-20 right-20 w-20 h-20',
                'bg-customPrimary hover:bg-customPrimary/80'
            )}>
                Salvar
            </Button>
            </form>
        </main>

        <Toaster/>
    </div>
  )
}

export default SiteInfo