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

export const OfficeImageConfig = ({cloudinaryUpload, uploadImage, setUploadImage, actualImage}: PhotoConfigProps) => {
  const [siteImage, setSiteImage] = useState<string | null>(null);

  console.log(siteImage);
  
  async function loadSettingsData() {
    const docRef = doc(db, "settings", "site");
    const snap = await getDoc(docRef);
  
    if (snap.exists()) {
      const data = snap.data();
      setSiteImage(data?.officeImage);
    }
  }
  
  const [officeImg, setOfficeImg] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setOfficeImg(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!officeImg) return;
  
      setIsUploading(true);
  
      try {
        const res = await cloudinaryUpload(officeImg)
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
      <section className="flex flex-col items-center">
        {
         uploadImage ? (
          <label htmlFor="inputOfficeImage" className="w-12 h-12 rounded-full bg-customPrimary hover:brightness-110 text-white flex items-center justify-center
          transition-all cursor-pointer relative">
            <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image src={String(uploadImage) } alt="Logo" objectFit="cover" fill/>
            </div>
          </label>
         ) : (
          <label htmlFor="inputOfficeImage" className="w-12 h-12 rounded-full bg-customPrimary hover:brightness-110 text-white flex items-center justify-center
          transition-all cursor-pointer">
          <Aperture />
          </label>
         )
        }
        
        <input id="inputOfficeImage" type="file" accept="image/*" onChange={(e) => {
            handleFileChange(e)
            console.log(e)
        }} className="invisible"/>

        <Button variant="outline" onClick={handleUpload} disabled={!officeImg || isUploading}
        className="cursor-pointer"
        >
          {isUploading ? "Enviando..." : "Carregar imagem"}
        </Button>
      </section>

    );
} 