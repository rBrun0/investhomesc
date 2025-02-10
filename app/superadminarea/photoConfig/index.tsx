'use client'

import { db } from "@/app/firebaseConfig";
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { Aperture } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PhotoConfigProps = {
  cloudinaryUpload: (file: File) => Promise<string>
  setUploadImage: Dispatch<SetStateAction<File | string>>
  uploadImage: File | null,
  actualImage: File | null,

}


export const PhotoConfig = ({cloudinaryUpload, setUploadImage, uploadImage, actualImage}: PhotoConfigProps) => {
  const [siteImage, setSiteImage] = useState<string | null>(null);

  console.log(siteImage)
  
  async function loadSettingsData() {
    const docRef = doc(db, "settings", "site");
    const snap = await getDoc(docRef);
  
    if (snap.exists()) {
      const data = snap.data();
      setSiteImage(data?.logo);
    }
  
  }
  const [logo, setLogo] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setLogo(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!logo) return;
  
      setIsUploading(true);
  
      try {

        const res = await cloudinaryUpload(logo)
        setUploadImage(res)
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        alert("Erro ao atualizar a logo.");
      } finally {
        setIsUploading(false);
      }
    };

    useEffect(() => {
      loadSettingsData()
    }, [uploadImage])

    useEffect(() => {
      setUploadImage(actualImage)
    }, [actualImage])
    return (
      <section className=" flex flex-col items-center">
        {
         uploadImage ? (
          <label htmlFor="inputImages" className="w-12 h-12 rounded-full bg-customPrimary hover:brightness-110 text-white flex items-center justify-center
          transition-all cursor-pointer relative">
            <Image src={String(uploadImage) } alt="Logo" className="w-12 h-12 rounded-full" objectFit="cover" fill/>
          </label>
         ) : (
          <label htmlFor="inputImages" className="w-12 h-12 rounded-full bg-customPrimary hover:brightness-110 text-white flex items-center justify-center
          transition-all cursor-pointer">
          <Aperture />
          </label>
         )
        }
        <input id="inputImages" type="file" accept="image/*" onChange={handleFileChange} className="invisible"/>
        <Button variant="outline" onClick={handleUpload} disabled={!logo || isUploading}
        className="cursor-pointer"
        >
          {isUploading ? "Enviando..." : "Carregar Logo"}
        </Button>
      </section>
    );
} 