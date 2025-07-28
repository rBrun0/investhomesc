"use client";

import { useInView, motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type ImagesPops = {
  src: string;
};

export const MainGallery = ({ imagesList }: { imagesList: unknown }) => {
  const firstImageRef = useRef(null);

  const isInView = useInView(firstImageRef, { once: true, margin: "-100px" });

  const externImages: ImagesPops[] = [
    {
      src: imagesList[0],
    },
    {
      src: imagesList[1],
    },
    {
      src: imagesList[2],
    },
    {
      src: imagesList[3],
    },
    {
      src: imagesList[4],
    },
  ];

  // const galImages = [buildingImage, buildingImage, buildingImage, buildingImage, buildingImage]
  // const newGalImages = [imagesList[0], imagesList[1], imagesList[2], imagesList[3], imagesList[4]]
  const [imageIndex, setImageIndex] = useState(-1);

  function changeImageIndex(ind: number) {
    setImageIndex(ind);
    console.log(ind);
  }

  return (
    <section className="flex w-full justify-center pl-16 md:pl-28 mt-12 gap-1">
      <Lightbox
        slides={externImages}
        open={imageIndex >= 0}
        close={() => setImageIndex(-1)}
        index={imageIndex}
      />

      <motion.div
        className="w-[120rem] -translate-x-9 md:translate-x-0 h-60 md:w-3/5  max-w-[23rem] md:max-w-[46rem]
             md:h-[30rem] relative object-cover overflow-hidden cursor-pointer"
        ref={firstImageRef}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Image
          fill
          src={imagesList[0]}
          alt="imagem"
          className="hover:scale-105 duration-200"
          onClick={() => changeImageIndex(0)}
        />
      </motion.div>

      <div className="w-2/5 space-y-1">
        <div className="flex gap-1 cursor-pointer">
          {imagesList[1] && (
            <motion.div
              className="relative w-2/5 h-[15rem] overflow-hidden hidden md:block"
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              onClick={() => changeImageIndex(1)}
            >
              <Image
                fill
                src={imagesList[1]}
                objectFit="cover"
                alt="imagem"
                className="hover:scale-105 duration-200"
              />
            </motion.div>
          )}
          {imagesList[2] && (
            <motion.div
              className="relative w-2/5 h-[15rem] overflow-hidden hidden md:block cursor-pointer"
              onClick={() => changeImageIndex(2)}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Image
                fill
                src={imagesList[2]}
                objectFit="cover"
                alt="imagem"
                className="hover:scale-105 duration-200"
              />
            </motion.div>
          )}
        </div>

        <div className="flex gap-1">
          {imagesList[3] && (
            <motion.div
              className="relative w-2/5 h-[15rem] overflow-hidden hidden md:block cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              onClick={() => changeImageIndex(3)}
            >
              <Image
                fill
                src={imagesList[3]}
                alt="imagem"
                objectFit="cover"
                className="hover:scale-105 duration-200"
                onClick={() => changeImageIndex(3)}
              />
            </motion.div>
          )}

          {imagesList[4] && (
            <motion.div
              className="relative w-2/5 h-[15rem] overflow-hidden hidden md:block cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              onClick={() => changeImageIndex(3)}
            >
              <Image
                fill
                src={imagesList[4]}
                alt="imagem"
                objectFit="cover"
                className="hover:scale-105 duration-200"
                onClick={() => changeImageIndex(4)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
