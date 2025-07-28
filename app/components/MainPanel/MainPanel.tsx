"use client";

import Image from "next/image";
import { RoomsList } from "./components/RoomsList/RoomsList";
import { SelectCamp } from "./components/SelectCamp/SelectCamp";
import praia from "@/app/assets/praia.jpg";
import { MinAndMaxValues } from "./components/MinAndMaxValues";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetFilterValues, setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
// import { RootState } from "@/app/store"
import { useEffect, useState } from "react";
import { ScrollDownIcon } from "../ScrollDownIcon";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export const MainPanel = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const filterValues = useSelector((state: RootState) => state.filterValuesSlice)

  const [codeSearchValue, setCodeSearchValue] = useState("");

  useEffect(() => {
    dispatch(
      setFilterValues({
        codeSearch: codeSearchValue,
      })
    );
  }, [codeSearchValue]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isLocked = document.body.getAttribute("data-scroll-locked") === "1";

      if (isLocked) {
        document.body.removeAttribute("data-scroll-locked");
        document.body.style.overflow = "auto";
      }
    });

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
    }

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked", "style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full h-[700px] md:h-[580px] mt-24 flex justify-center items-center relative text-white">
      <ScrollDownIcon />
      <Image
        src={praia}
        alt="imagem-praia"
        fill
        objectFit="cover"
        className="absolute -z-50 brightness-50"
      />

      <section className="w-11/12 h-[37.8rem] md:h-[24rem] lg:h-96 rounded-md flex flex-col justify-start items-center space-y-6 relative">
        <motion.h1
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="text-white text-center text-2xl md:text-3xl tracking-wider lg:text-4xl px-3 pt-6 font-semibold hidden md:block"
        >
          Somente vendas! Não trabalhamos com aluguel
        </motion.h1>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.6,
          }}
          className="flex flex-wrap justify-center w-[90%] gap-2 md:gap-4 lg:gap-8  "
        >
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center items-center justify-center md:justify-between px-20 
                gap-3 pb-2 md:pb-0"
          >
            <SelectCamp />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 pb-2 md:pb-0">
            <MinAndMaxValues />
          </div>

          <Input
            type="text"
            className="w-60 border rounded-md outline-none h-10 px-2 text-zinc-800 mb-4 md:mb-0 md:mt-[10px]"
            placeholder="código imóvel"
            value={codeSearchValue}
            onChange={(e) => setCodeSearchValue(e.target.value)}
          />

          <RoomsList />

          <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-7">
            <div className="flex gap-7 md:flex-row md:gap-4">
              <div
                onClick={() => {
                  router.push("/advancedsearch");
                }}
              >
                <button className="w-24 h-9 bg-customPrimary hover:bg-customPrimaryHover transition-colors text-white rounded-md">
                  BUSCAR
                </button>
              </div>
              <button
                className="w-24 h-9 bg-customPrimary hover:bg-customPrimaryHover transition-colors text-white rounded-md"
                onClick={() => {
                  dispatch(resetFilterValues());
                }}
              >
                LIMPAR
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};
