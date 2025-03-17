import React from "react";
import InicialPage from "./inicialPage/page";
import "leaflet/dist/leaflet.css";
import { Header } from "./components/Header/Header";
import FloatWhatsapp from "./components/FloatWhatsapp/FloatWhatsapp";



export default function Home() {
  return (
      <>
      <Header/>
      <InicialPage/>
      <FloatWhatsapp/>
      </>
  );
}