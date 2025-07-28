"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { motion, useInView } from "framer-motion";

type ImagesProps = {
  src: string;
};

export const CompleteGallery = ({ imagesReceived }: { imagesReceived: string[] | undefined }) => {
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true });

  const newImages: ImagesProps[] | null = imagesReceived
    ? imagesReceived.map((img: string, index: number) => ({ src: img, alt: `Imagem ${index + 1}` }))
    : null;

  const [imageIndex, setImageIndex] = useState(-1);

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center items-center">
      <Lightbox
        slides={newImages ? newImages : []}
        open={imageIndex >= 0}
        index={imageIndex}
        close={() => setImageIndex(-1)}
      />

      {newImages &&
        newImages.map((im: ImagesProps, index: number) => (
          <motion.div
            key={index}
            ref={imageRef}
            className="w-32 h-32 rounded-md bg-zinc-400 relative overflow-hidden object-cover cursor-pointer"
            onClick={() => setImageIndex(index)}
            initial={{
              opacity: 0,
            }}
            animate={isImageInView ? { opacity: 1 } : {}}
            transition={{
              delay: 0.1 * index,
            }}
          >
            <Image fill src={im.src} alt="imagem" className="hover:scale-105 duration-200" />
          </motion.div>
        ))}
    </div>
  );
};
