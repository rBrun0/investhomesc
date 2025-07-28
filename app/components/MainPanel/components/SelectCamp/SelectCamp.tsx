"use client";

import { SelectInput } from "@/app/components/Select";
import { setFilterValues } from "@/app/features/filterValues/filterValuesSlice";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SelectCamp = () => {
  const filterValues = useSelector((state: RootState) => state.filterValuesSlice);

  const cityCampList = [
    {
      label: "Todas as cidades",
      value: "",
    },
    {
      label: "Itapema",
      value: "Itapema",
    },
    {
      label: "Balneário Camboriú",
      value: "Balneário Camboriú",
    },
    {
      label: "Camboriú",
      value: "Camboriú",
    },
    {
      label: "Porto Belo",
      value: "Porto Belo",
    },
  ];

  const itapemaNeighborhood = [
    {
      label: "Todos os bairros",
      value: "",
    },
    {
      label: "Alto São Bento",
      value: "alto sao bento",
    },
    // {
    //     label: 'Casa Branca',
    //     value: 'casa branca',
    // },
    {
      label: "Ilhota",
      value: "ilhota",
    },
    {
      label: "Meia Praia",
      value: "meia praia",
    },
    {
      label: "Morretes",
      value: "morretes",
    },
    {
      label: "Tabuleiro",
      value: "tabuleiro",
    },
    {
      label: "Centro",
      value: "centro",
    },
  ];

  const balnearioCamboriuNeighborhood = [
    {
      label: "Todos os bairros",
      value: "",
    },
    {
      label: "Barra Norte",
      value: "Barra Norte",
    },
    {
      label: "Barra Sul",
      value: "Barra Sul",
    },
    {
      label: "Centro",
      value: "Centro",
    },
    {
      label: "Pioneiros",
      value: "Pioneiros",
    },
  ];

  const portoBeloNeighborhood = [
    {
      label: "Todos os bairros",
      value: "",
    },
    {
      label: "Centro",
      value: "Centro",
    },
    {
      label: "Perequê",
      value: "Pereque",
    },
  ];

  const camboriuNeighborhood = [
    {
      label: "Todos os bairros",
      value: "",
    },
    {
      label: "Centro",
      value: "Centro",
    },
  ];

  const propertyTypesData = [
    {
      value: "",
      label: "Todos os tipos",
    },
    {
      value: "apartamento",
      label: "Apartamentos",
    },
    {
      value: "casa",
      label: "Casa",
    },
    {
      value: "Sala comercial",
      label: "Sala comercial",
    },
  ];

  const propertyProfilesData = [
    { label: "Todos os perfis", value: "" },
    { label: "Chacara Flora", value: "chacara flora" },
    { label: "Frente Avenida", value: "frente avenida" },
    { label: "Frente Mar", value: "frente mar" },
    { label: "Lancamentos", value: "lancamentos" },
    { label: "Mobiliados", value: "mobiliados" },
    { label: "Plaza Iate Club", value: "plaza iate club" },
    { label: "Quadra do Mar", value: "quadra do mar" },
    { label: "Sem Mobilia", value: "sem mobilia" },
    { label: "Showroom", value: "showroom" },
  ];

  // city and neighborhood states

  const [cityCamp, setCityCamp] = useState("");
  const [selectedNeighorhood, setSelectedNeighborhood] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPropertyProfile, setSelectedPropertyProfile] = useState("");

  const dispatch = useDispatch();

  // function chooseCity(e: React.ChangeEvent<HTMLInputElement>) {
  //     setCityCamp(e.target.value)
  // }

  useEffect(() => {
    filterValues.cities && setCityCamp(filterValues.cities);
    filterValues.neighborhood && setSelectedNeighborhood(filterValues.neighborhood);
    filterValues.propertyType && setCityCamp(filterValues.propertyType);
    filterValues.propertyProfile && setCityCamp(filterValues.propertyProfile);
  }, []);

  useEffect(() => {
    dispatch(
      setFilterValues({
        cities: cityCamp,
        neighborhood: selectedNeighorhood,
        propertyType: selectedPropertyType,
        propertyProfile: selectedPropertyProfile,
      })
    );
  }, [cityCamp, selectedNeighorhood, selectedNeighorhood, selectedPropertyProfile]);

  return (
    <>
      {/* <select 
            className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2" 
            value={cityCamp} 
            onChange={(e) => chooseCity(e)}>
                {
                    cityCampList.map((vl) => (
                            <option value={vl.value} key={vl.value}>{vl.label}</option>
                    ))
                }
            </select> */}

      <SelectInput
        data={cityCampList}
        placeholder="Selecione uma cidade"
        value={cityCamp}
        className="w-56"
        onValueChange={(value) => setCityCamp(value)}
      />

      {cityCamp === "all" && (
        // <select className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
        // value={selectedNeighorhood}
        // onChange={(e) => setSelectedNeighborhood(e.target.value)}>
        //     <option>Todos Bairros...</option>
        // </select>
        <SelectInput
          className="w-60 rounded-md cursor-pointer text-zinc-600 pl-2"
          data={[
            {
              value: "",
              label: "Todos os Bairros",
            },
          ]}
          value={selectedNeighorhood}
          onValueChange={(value) => setSelectedNeighborhood(value)}
        ></SelectInput>
      )}

      {cityCamp === "itapema" && (
        // <select
        // className="w-56 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
        // onChange={(e) => setSelectedNeighborhood(e.target.value)}>
        //     {
        //         itapemaNeighborhood.map((vl) => (
        //             <option value={vl.value} key={vl.value}>{vl.label}</option>
        //         ))
        //     }
        // </select>
        <SelectInput
          className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
          data={itapemaNeighborhood}
          value={selectedNeighorhood}
          onValueChange={(value) => setSelectedNeighborhood(value)}
        ></SelectInput>
      )}

      {cityCamp === "balneario camboriu" && (
        <SelectInput
          className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
          data={balnearioCamboriuNeighborhood}
          value={selectedNeighorhood}
          onValueChange={(value) => setSelectedNeighborhood(value)}
        ></SelectInput>
      )}

      {cityCamp === "camboriu" && (
        <SelectInput
          className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
          data={camboriuNeighborhood}
          value={selectedNeighorhood}
          onValueChange={(value) => setSelectedNeighborhood(value)}
        ></SelectInput>
      )}

      {cityCamp === "porto belo" && (
        <SelectInput
          className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
          data={portoBeloNeighborhood}
          value={selectedNeighorhood}
          onValueChange={(value) => setSelectedNeighborhood(value)}
        ></SelectInput>
      )}

      <SelectInput
        className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
        data={propertyTypesData}
        value={selectedPropertyType}
        onValueChange={(value) => setSelectedPropertyType(value)}
      ></SelectInput>

      <SelectInput
        className="w-60 h-10 rounded-md cursor-pointer text-zinc-600 pl-2"
        data={propertyProfilesData}
        value={selectedPropertyProfile}
        onValueChange={(value) => setSelectedPropertyProfile(value)}
      ></SelectInput>
    </>
  );
};
