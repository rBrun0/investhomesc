"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useInView, motion } from "framer-motion";
import { useRef, useState } from "react";

export const CallABroker = ({ announcingNumber }: { announcingNumber: string }) => {
  const callABrokerRef = useRef(null);
  const isBrokerInView = useInView(callABrokerRef, { once: true });

  const [yourName, setYourName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (!yourName || !phoneNumber || !message) {
      alert("Todos os campos devem ser preenchidos!");
      return;
    }

    window.open(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Olá, me chamo ${yourName}! ${message}`,
      "_blank"
    );
  }

  return (
    <motion.div
      className="md:w-72 md:h-80 flex flex-col justify-center items-center shadow-sm border rounded-md bg-zinc-100 px-3 py-2 gap-1"
      ref={callABrokerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isBrokerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 8,
        delay: 0.4,
      }}
    >
      <h1 className="text-customPrimary font-semibold">CHAME UM CORRETOR</h1>
      <p className="text-zinc-700 font-medium">
        {`${String(announcingNumber).slice(0, 2)} ${String(announcingNumber).slice(2, 4)} ${String(
          announcingNumber
        ).slice(4, 9)}-${String(announcingNumber).slice(9, 13)}`}
      </p>

      <Textarea
        className="w-11/12 min-h-28 outline-none border rounded-md px-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></Textarea>

      <Input
        type="text"
        placeholder="Nome"
        className="w-11/12 outline-none pl-2 py-2 rounded-md border
                     mt-3 min-h-10 md:min-h-6"
        value={yourName}
        onChange={(e) => setYourName(e.target.value)}
      />

      <Input
        type="tel"
        name=""
        id=""
        placeholder="5545999999999"
        className="w-11/12 outline-none pl-2 py-2
                    rounded-md border min-h-10 md:min-h-6
                     mt-3"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value.trim())}
      />

      <Button
        className={cn(
          "flex justify-center",
          "w-4/12 outline-none text-white mt-3 p-1",
          "rounded-md border-[1px] border-customPrimary bg-customPrimary",
          "hover:bg-customPrimaryHover transition-colors"
        )}
        onClick={sendMessage}
      >
        Enviar
      </Button>
    </motion.div>
  );
};
