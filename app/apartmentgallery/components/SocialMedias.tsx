"use client";

import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FacebookShareButton, InstapaperShareButton, WhatsappShareButton } from "react-share";

interface SocialMediasProps {
  path: string;
}

export const SocialMedias = ({ path }: SocialMediasProps) => {
  const facebookRef = useRef(null);
  const whatsappRef = useRef(null);
  const instagramRef = useRef(null);

  const isFacebookInView = useInView(facebookRef, { once: true });
  const isWhatsappInView = useInView(whatsappRef, { once: true });
  const isInstagramInView = useInView(instagramRef, { once: true });

  return (
    <div className="flex gap-6">
      {/* <FaFacebook className="text-blue-400 w-8 h-8 md:w-16 md:h-16"/> */}
      <div ref={facebookRef}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={
            isFacebookInView
              ? {
                  opacity: 1,
                }
              : {}
          }
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
        >
          <FacebookShareButton url={path} hashtag="olha esse imovel!! #INVEST&HOME">
            <FaFacebook className="text-blue-400 w-8 h-8 md:w-12 md:h-12 hover:brightness-90 transition-all" />
          </FacebookShareButton>
        </motion.div>
      </div>

      <div ref={whatsappRef}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={
            isWhatsappInView
              ? {
                  opacity: 1,
                }
              : {}
          }
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
        >
          <WhatsappShareButton url={path}>
            <FaWhatsapp className="text-green-600 w-8 h-8 md:w-12 md:h-12 hover:brightness-90 transition-all" />
          </WhatsappShareButton>
        </motion.div>
      </div>

      <div ref={instagramRef}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={
            isInstagramInView
              ? {
                  opacity: 1,
                }
              : {}
          }
          transition={{
            delay: 0.7,
            duration: 0.8,
          }}
        >
          <InstapaperShareButton url={path}>
            <FaInstagram className="text-red-400 w-8 h-8 md:w-12 md:h-12 hover:brightness-90 transition-all" />
          </InstapaperShareButton>
        </motion.div>
      </div>
    </div>
  );
};
