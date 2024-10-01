'use client'

import Image from "next/image"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import { ImagesPops } from "./MainGallery"

type ImagesProps = {
    src: string
}

export const CompleteGallery = ({imagesReceived}: {imagesReceived: string[] | undefined}) => {

    const newImages: ImagesProps[] | null = imagesReceived ?  imagesReceived.map((img: string, index: number) => ({src: img, alt: `Imagem ${index + 1}`})) : null



    const [imageIndex, setImageIndex] = useState(-1)

    return (

        <div className="w-full flex flex-wrap gap-4 justify-center items-center">

            <Lightbox
            slides={newImages ? newImages : []}
            open={imageIndex >= 0}
            index={imageIndex}
            close={() => setImageIndex(-1)}
            />

            {
                newImages && newImages.map((im: ImagesProps, index: number) => (
                    <div className="w-32 h-32 rounded-md bg-zinc-400 relative overflow-hidden object-cover" key={index}
                    onClick={() => setImageIndex(index)}>
                        <Image fill src={im.src} alt="imagem" className="hover:scale-105 duration-200"/>
                    </div>
                ))
            }
                          

        </div>
    )
}