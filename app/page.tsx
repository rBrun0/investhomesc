import React from "react";
import InicialPage from "./inicialPage/page";
import "leaflet/dist/leaflet.css";
import { Header } from "./components/Header/Header";



export default function Home() {
  return (
      <>
      <Header/>
      <InicialPage/>
      </>
  );
}