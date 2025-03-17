"use client"

import { auth, db } from "@/app/firebaseConfig";
import { Button } from "@/components/ui/button";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { HousePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa"
import { v4 as uuidv4 } from 'uuid';
import { ImoveisType, useCreate } from "./schemas/imoveis";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import CurrencyInput from "react-currency-input-field";
import InputMask from 'react-input-mask';
import { brasilStates } from "./brazillianStates";



export const AdicionarImoveis = () => {


    const [registeredConstructors, setRegisteredConstructors] = useState<{name: string}[]>()

        const fetchConstructors = async () => {
        
            const querySnapshot = await getDocs(collection(db,"construtoras"))
            const temp = []
            querySnapshot.forEach((doc) => {
                    temp.push(doc.data())
            }
        )
        setRegisteredConstructors(temp)
    }

    const {register, watch, getValues, handleSubmit, formState: {errors: formErrors}, reset} = useCreate()
    const valuesWatch = getValues()

    console.log(watch())

    
    const [areaDeLazer, setAreaDeLazer] = useState<{id: number, value: string}[]>([]);
    const [areaDeLazerInput, setAreaDeLazerInput] = useState("");
    const [uploadedImages, setUploadedImages] = useState<string[]>([])  

    const [informacoesEmpreendimentoInput, setInformacoesEmpreendimentoInput] = useState("")
    const [informacoesEmpreendimento, setInformacoesEmpreendimento] = useState<{id: number, value: string}[]>([]);

    const [informacoesImovelInput, setInformacoesImovelInput] = useState("")
    const [informacoesImovel, setInformacoesImovel] = useState<{id: number, value: string}[]>([]);
    // const [checkboxPerfi, setCheckBoxPerfil] = useState<string[]>([])
    // const [checkboxCondominio, setCheckboxCondominio] = useState<string[]>([])

    const curUser = auth.currentUser

    const [file, setFile] = useState<File | null>(null);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function adicionarInformacoesImovel() {

        const valueImovel = informacoesImovel.map((v) => v.value)

        if(valueImovel.includes(informacoesImovelInput)) {
            toast.error("Essa infoemação já foi adicionada!")
            return;
        }

        setInformacoesImovel([
           ...informacoesImovel,
            {id: Math.random(), value: informacoesImovelInput },
        ]);
        setInformacoesImovelInput("");
    }
    
    function removerInformacoesImovel(id: number) {
        setInformacoesImovel(informacoesImovel.filter((info) => info.id!== id));
    }

    function adicionarInformacoesEmpreendimento() {

        const valueEmprendimento = informacoesEmpreendimento.map((v) => v.value) 

        if(!informacoesEmpreendimentoInput) {
                toast.error("Por favor, insira uma informação!")
                return;
        }

        if(valueEmprendimento.includes(informacoesEmpreendimentoInput)) {
            toast.error("Essa informação já foi adicionada!")
            return;
        }

        setInformacoesEmpreendimento((prev) => {

            return [...prev, {id: uuidv4(), value: informacoesEmpreendimentoInput }]
        })

        setInformacoesEmpreendimentoInput("");
    }

    function removerInformacaoEmpreendimento(id: number) {
        setInformacoesEmpreendimento(informacoesEmpreendimento.filter((info) => info.id!== id));
    }

    function adicionarInformacoesLazer() {

        const valueLazer = areaDeLazer.map((v) => v.value)

        if(valueLazer.includes(areaDeLazerInput)) {
            toast.error("Essa informação já foi adicionada!")
            return;
        }

        setAreaDeLazer([
           ...areaDeLazer,
            {id: Math.random(), value: areaDeLazerInput },
        ]);
        setAreaDeLazerInput("");
    }

    function removerAreaDeLazer(id: number) {
        setAreaDeLazer(areaDeLazer.filter((area) => area.id!== id));
    }

    const cloudinaryUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "presetinvesthome"); // Substitua pelo seu upload_preset
      
        const response = await fetch("https://api.cloudinary.com/v1_1/dpqsn5y55/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log('data cloudinary', data)
        return data.secure_url;

    }

    function correctCoord(coord: number) {
        if(String(coord).includes("-")) {
            return coord
        }
    
        return Number(`-${String(coord)}`)
    } 

    const handleUpload = async () => {
        if (!file) return;

        // const timestamp = Date.now(); // Alternativa: new Date().toISOString()
        // const fileName = `${timestamp}-${file.name}`;

        const imageUrl = await cloudinaryUpload(file);
        setUploadedImages((prev) => [...prev, imageUrl]); 

        console.log({setUploadedImages})
    };
    
    async function onSubmit(data: ImoveisType) {

        if(uploadedImages.length <= 0) {
            toast.error('Por favor, selecione pelo menos uma imagem!')
            return;
        }
        
        try {

            
            const propertiesRef = collection(db, "imoveis");
            
            const q = query(propertiesRef, where("codigoImovel", "==", data.descricao));
            
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                toast.error('Já existe uma construtora com esse nome!')
                console.log("deu")
                return; 
            }
            
            addDoc((collection(db, "imoveis")), {
            ...{
                ...data,
                uid: uuidv4(),
                descricao: data.descricao,
                imagensUrl: uploadedImages,
                buildingProfile: data.buildingProfile,
                informacoesImovel: informacoesImovel.map((emp) => emp.value),
                informacoesLazer: areaDeLazer.map((area) => area.value),
                informacoesEmpreendimento: informacoesEmpreendimento.map((empreendimento) => empreendimento.value),
                createdBy: curUser.uid,
                correctorNumber: data.numeroAnunciante,
                codigoImovel: `invest-${String(uuidv4()).slice(0,4)}`,
                latitude: correctCoord(Number(data.latitude)),
                longitude: correctCoord(Number(data.longitude)),
                preco: data.preco.replace(/[^\d.-]/g, '').replace(',', '.'),
            }
        })

        setUploadedImages([])
        setAreaDeLazer([])
        setInformacoesEmpreendimento([])
        setInformacoesImovel([])
        setIsDialogOpen(false)

        toast.success("Imovel criado com sucesso!")
        
        reset()
    } catch(err) {
        console.log({err})
        toast.error("Erro ao criar imovel!")
    }
    }

    useEffect(() => {
        fetchConstructors()
    }, [])

    console.log({uploadedImages})
    console.log({uploadedImages})

    useEffect(() => {
        console.log("Arquivo selecionado:", file);
      }, [file]);

    return (
        <>
            <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                <Button className="text-center text-xl bg-transparent text-customPrimary border border-customPrimary hover:bg-slate-100">
                <HousePlus />
                    Adicionar imoveis
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-96 overflow-y-scroll max-w-[40rem]">

                    <DialogHeader>
                    <h1 className="text-xl font-semibold">Adicionar imoveis</h1>
                    </DialogHeader>

                <div >

            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-16 flex flex-col justify-center items-center outline-none gap-12">

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6  ">Preço</h1>
                {/* <input type="number" id="preco" placeholder="R$"  className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                {...register('preco')}/> */}
                <CurrencyInput
                decimalsLimit={2}
                prefix="R$ "
                id="preco"
                {...register('preco')}
                className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                />
                {
                    formErrors.preco && <p className="w-full text-start text-xs text-red-500 ">{formErrors.preco.message}</p>
                }
                </label>

                <div className="flex flex-col justify-center items-center space-y-16 w-full">
                    <div className="flex flex-col items-center w-full">

                    <label htmlFor="descricaoInput" className="w-full relative">
                    <h1 className="absolute -top-6">Descrição do imovel</h1>
                    <input type="text" id="descricaoInput" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('descricao')}/>
                    {
                    formErrors.descricao && <p className="w-full text-start text-xs text-red-500 ">{formErrors.descricao.message}</p>
                }
                </label>
                        
                    </div>

                <label htmlFor="areaPrivativaInput" className="w-full relative">
                    <h1 className="absolute -top-6">Área privativa</h1>
                    <input type="number" id="areaPrivativaInput" placeholder="m²" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('areaPrivativa')}/>
                    {
                    formErrors.areaPrivativa && <p className="w-full text-start text-xs text-red-500 ">{formErrors.areaPrivativa.message}</p>
                }
                </label>

                {/* <label className="w-full relative">
                    <h1 className="absolute -top-6">Data de entrega</h1> */}
                {/* </label> */}

        <label className="w-full text-sm font-medium text-gray-700 mb-2" htmlFor="receiveTime">
        Tempo de entrega (em dias)

        <input type="text" id="areaPrivativaInput" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('receiveTime')}/>
                    {
                    formErrors.receiveTime && <p className="w-full text-start text-xs text-red-500 ">{formErrors.receiveTime.message}</p>
                }

      </label>




                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Banheiros</h1>
                    <input type="number" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('banheiros')}/>
                                    {
                    formErrors.banheiros && <p className="w-full text-start text-xs text-red-500 ">{formErrors.banheiros.message}</p>
                }
                </label>


                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Dormitorios</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                {...register('dormitorios')}/>
                                {
                    formErrors.dormitorios && <p className="w-full text-start text-xs text-red-500 ">{formErrors.dormitorios.message}</p>
                }                
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Suites</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('suites')}/>
                                    {
                    formErrors.suites && <p className="w-full text-start text-xs text-red-500 ">{formErrors.suites.message}</p>
                }
                </label>

                        
                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Número da propridade</h1>
                    <input type="text" placeholder=""  className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('numero')}/>
                                    {
                    formErrors.numero && <p className="w-full text-start text-xs text-red-500 ">{formErrors.numero.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Vagas</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('vagas')}/>
                {
                    formErrors.vagas && <p className="w-full text-start text-xs text-red-500 ">{formErrors.vagas.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Rua</h1>
                    <input type="text" placeholder="numero ou nome"  className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('rua')}/>
                                    {
                    formErrors.rua && <p className="w-full text-start text-xs text-red-500 ">{formErrors.rua.message}</p>
                }
                </label>



                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Bairro</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('bairro')}/>
                {
                    formErrors.bairro && <p className="w-full text-start text-xs text-red-500 ">{formErrors.bairro.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Cidade</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('cidade')}/>
                {
                    formErrors.cidade && <p className="w-full text-start text-xs text-red-500 ">{formErrors.cidade.message}</p>
                }
                </label>
                
                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Estado</h1>

                    <select name="" id="" {...register('estado')} className="text-zinc-700 pl-3 w-full h-14 border rounded-md">
                        {
                            brasilStates.map((state) => (
                                <option key={state.value} value={state.value}>{state.label}</option>
                            ))
                        }
                    </select>

                    {formErrors.estado && <p className="w-full text-start text-xs text-red-500 ">{formErrors.estado.message}</p>}
                    
                    {/* <input type="text" placeholder="ex: SC" className="text-zinc-700 plut t-3 w-full h-14 border rounded-md"
                    {...register('estado')}/> */}
                                    {
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Construtora</h1>
                    <select className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('construtora')}>
                    {
                        registeredConstructors?.map((c) => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                        ))
                    }
                    </select>

                {
                    formErrors.construtora && <p className="w-full text-start text-xs text-red-500 ">{formErrors.construtora.message}</p>
                }
                </label>

                    <div>
                        <h1 className="text-2xl text-center">Tipo do imovel</h1>

                        <select name="" id="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" {...register('propertyType')}>
                            <option value="apartamento">Apartamento</option>
                            <option value="casa">Casa</option>
                            <option value="sala comercial">Sala Comercial</option>
                        </select>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-3">
                        <h1 className="w-full">Informações do imovel</h1>

                        <label htmlFor="preco" className="w-full relative">
                        <input type="text" placeholder="ex: numero de quartos" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                        value={informacoesImovelInput} onChange={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setInformacoesImovelInput(e.target.value)
                        }}/>
                </label>

                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" onClick={adicionarInformacoesImovel}
                        type="button">
                            adicionar
                        </button>

                        <div className="flex flex-wrap justify-start gap-4">

                            {
                                informacoesImovel.map(info => (
                                    <span className="space-x-2 flex items-center justify-center" key={info.id}>
                                        <FaRegTrashAlt onClick={() => removerInformacoesImovel(info.id)}/>
                                    <span>{info.value}</span>
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-3">
                        <h1 className="w-full text-start">Informações do empreendimento</h1>

                        <label htmlFor="preco" className="w-full flex items-center justify-center">
                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                        value={informacoesEmpreendimentoInput} onChange={(e) => setInformacoesEmpreendimentoInput(e.target.value)}/>
                </label>

                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" type="button"
                        onClick={adicionarInformacoesEmpreendimento}>Adicionar</button>

                        <div className="flex flex-wrap justify-start gap-4 mt-8" >

                            {
                                informacoesEmpreendimento.map((info) => (
                                    <span className="space-x-2 flex items-center justify-center" key={info.id}> 
                                    <FaRegTrashAlt onClick={() => removerInformacaoEmpreendimento(info.id)}/>
                                    <span>{info.value}</span></span>
                                ))
                            }
                        </div>
                    </div>
                    
                </div>

                    <div className="flex flex-col justify-center items-center space-y-3">
                        <h1 className="text-start">Informações do lazer</h1>

                        <label htmlFor="preco" className="w-full relative">
                        <input type="text" placeholder="ex: piscina" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                        value={areaDeLazerInput} onChange={(e) => setAreaDeLazerInput(e.target.value)}/>
                </label>

                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" type="button"
                        onClick={adicionarInformacoesLazer}>Adicionar</button>

                        <div className="flex flex-wrap justify-start gap-4 w-full">
                            {
                                areaDeLazer.map((area) => (
                                    <span className="space-x-2 flex items-center justify-center" key={area.id}> 
                                        <FaRegTrashAlt onClick={() => removerAreaDeLazer(area.id)}/>
                                        <span>{area.value}</span>
                                    </span>
                                ))
                            }
                        </div>
                    </div>  

                    {
                        valuesWatch.propertyType == "condominio" && <input type="text" placeholder="nome do condominio" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"/>
                    }

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6  ">Número do anunciante</h1>

                    <InputMask mask="(99) 99 99999-9999" placeholder="(55) 47 91234-5678" 
                    {...register('numeroAnunciante')} className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    />

                    {/* <input type="text" placeholder="55 99 999999999" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('numeroAnunciante')} maxLength={13}/> */}
                                    {
                    formErrors.numeroAnunciante && <p className="w-full text-start text-xs text-red-500 ">{formErrors.numeroAnunciante.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6  ">Link para vídeo</h1>
                    <input type="text" placeholder="https://youtube.com"  className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('videoLink')}/>
                </label>


                    <div className="flex flex-col justify-center items-center space-y-4 pt-8">

                        <h1 className="text-2xl text-center">Perfil do imovel</h1>

                        <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                        <label className="flex items-center space-x-2" htmlFor="chacara-flora">
                            <input type="checkbox" name="" id="chacara-flora" value={"Chacara Flora"}
                            {...register("buildingProfile")}/>
                            <span>Chácara Flora</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="frente-avenida">
                            <input type="checkbox" name="" id="frente-avenida" value={"Frente Avenida"}
                            {...register("buildingProfile")}/>
                            <span>Frente Avenida</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="frente-mar">
                            <input type="checkbox" name="" id="frente-mar" value={"Frente Mar"}
                            {...register("buildingProfile")}/>
                            <span>Frente Mar</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="lancamentos">
                            <input type="checkbox" name="" id="lancamentos" value={"Lancamentos"}
                            {...register("buildingProfile")}/>
                            <span>Lançamentos</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="mobiliado">
                            <input type="checkbox" name="" id="mobiliado" value={"Mobiliado"}
                            {...register("buildingProfile")}/>
                            <span>Mobiliado</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="plaza-iate">
                            <input type="checkbox" name="" id="plaza-iate" value={"Plaza Iate Club"}
                            {...register("buildingProfile")}/>
                            <span>Plaza Iate Club</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="quadra-mar">
                            <input type="checkbox" name="" id="quadra-mar" value={"Quadra do Mar"}
                            {...register("buildingProfile")}/>
                            <span>Quadra do Mar</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="sem-mobilia">
                            <input type="checkbox" name="" id="sem-mobilia" value={"Sem Mobilia"}
                            {...register("buildingProfile")}/>
                            <span>Sem Mobília</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="showroom">
                            <input type="checkbox" name="" id="showroom" value={"Showroom"}
                            {...register("buildingProfile")}/>
                            <span>Showroom</span>
                        </label>
                           
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-4 pt-8">

                <h1 className="text-2xl text-center">características do imovel</h1>

                <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                <label className="flex items-center space-x-2" htmlFor="Apartamentocobertura">
                    <input type="checkbox" name="" id="Apartamentocobertura" value={"Apartamento cobertura"} {...register("buildingInformations")}/>
                    <span>Apartamento cobertura</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Soldatarde">
                    <input type="checkbox" name="" id="Soldatarde" value={"Sol da tarde"} {...register("buildingInformations")}/>
                    <span>Sol da tarde</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Duplex">
                    <input type="checkbox" name="" id="Duplex" value={"Duplex"} {...register("buildingInformations")}/>
                    <span>Duplex</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Quadramar">
                    <input type="checkbox" name="" id="Quadramar" value={"Quadra mar"} {...register("buildingInformations")}/>
                    <span>Quadra mar</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Semmobilia">
                    <input type="checkbox" name="" id="Semmobilia" value={"Sem mobília"} {...register("buildingInformations")}/>
                    <span>Sem mobília</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="SoldaManha">
                    <input type="checkbox" name="" id="SoldaManha" value={"Sol da manhã"} {...register("buildingInformations")}/>
                    <span>Sol da Manhã</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Aptodiferenciado">
                    <input type="checkbox" name="" id="Aptodiferenciado" value={"Apartamento diferenciado"} {...register("buildingInformations")}/>
                    <span>Apto diferenciado</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Showroom">
                    <input type="checkbox" name="" id="Showroom" value={"Showroom"} {...register("buildingInformations")}/>
                    <span>Showroom</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Frenteavenida">
                    <input type="checkbox" name="" id="Frenteavenida" value={"Frente avenida"} {...register("buildingInformations")}/>
                    <span>Frente avenida</span>
                </label>
                </div>

                </div>

                <div className="flex flex-col justify-center items-center space-y-4 pt-8">

                <h1 className="text-2xl text-center">características do condomínio</h1>

                <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                                <label className="flex items-center space-x-2" htmlFor="c-apartamento">
                                    <input type="checkbox" name="" id="c-apartamento" value={"Apartamento cobertura"} {...register("condominumInformations")}/>
                                    <span>Apartamento cobertura</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-SoldaManha">
                                    <input type="checkbox" name="" id="c-SoldaManha" value={"Sol da Manha"}
                                     {...register("condominumInformations")}/>
                                    <span>Sol da Manhã</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-Soldatarde">
                                    <input type="checkbox" name="" id="c-Soldatarde" value={"Sol da tarde"}
                                     {...register("condominumInformations")}/>
                                    <span>Sol da tarde</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-Aptodiferenciado">
                                    <input type="checkbox" name="" id="c-Aptodiferenciado" value={"Apto diferenciado"}
                                     {...register("condominumInformations")}/>
                                    <span>Apto diferenciado</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-Duplex">
                                    <input type="checkbox" name="" id="c-Duplex" value={"Duplex"}
                                     {...register("condominumInformations")}/>
                                    <span>Duplex</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-Showroom">
                                    <input type="checkbox" name="" id="c-Showroom" value={"Showroom"}
                                     {...register("condominumInformations")}/>
                                    <span>Showroom</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-Quadramar">
                                    <input type="checkbox" name="" id="c-Quadramar" value={"Quadra mar"}
                                     {...register("condominumInformations")}/>
                                    <span>Quadra mar</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Frenteavenida">
                                    <input type="checkbox" name="" id="Frenteavenida" value={"Frente avenida"}
                                     {...register("condominumInformations")}/>
                                    <span>Frente avenida</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="c-Semmobilia">
                                    <input type="checkbox" name="" id="c-Semmobilia" value={"Sem mobilia"}
                                     {...register("condominumInformations")}/>
                                    <span>Sem mobília</span>
                                </label>
                                
                                </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-12 mt-12 ">
                    <h1 className="text-2xl">Localização</h1>
                    <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Latitude</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('latitude')}/>

                    {
                    formErrors.latitude && <p className="w-full text-start text-xs text-red-500 ">{formErrors.latitude.message}</p>
                    }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Longitude</h1>
                    <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                    {...register('longitude')}/>

                    {
                    formErrors.longitude && <p className="w-full text-start text-xs text-red-500 ">{formErrors.longitude.message}</p>
                    }
                </label>

                </div>

                <div className="mt-20 space-y-4 w-full flex flex-col items-center">
                        <h1 className="text-2xl">Adicionar imagens</h1>

                        <input 
                        type="file" 
                        name="" 
                        id="" 
                        onChange={async (e) => {
                            if(e.target.files && e.target.files.length > 0) {
                                const selectedFile = e.target.files[0];
                                setFile(selectedFile)
                            }
                        }}
                        className="mx-auto"
                        />

                        <div className="flex items-center justify-center gap-2 w-full">
                        <button onClick={handleUpload}
                        className="bg-customPrimary text-white w-28 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 " type="button">
                            Fazer upload
                        </button>

                        <button onClick={() => {
                            if(uploadedImages.length <= 0) return;
                            const popImage = uploadedImages.pop()

                            console.log(popImage)

                            setUploadedImages([...uploadedImages])
                            
                            toast.success("Imagem removida!")
                        }}
                        className="bg-customPrimary text-white w-32 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 " type="button"
                        >
                            Remover última
                        </button>
                        </div>

                        {
                            uploadedImages.length > 0 && <div className="flex flex-wrap gap-4 justify-center items-center w-full">
                                {
                                    uploadedImages.map((img) => (
                                        <div className="relative w-20 h-20" key={img}>
                                            <Image src={img} alt="imagem" objectFit="cover" fill/>
                                        </div>
                                    ))
                                }
                            </div>
                        }

                    </div>

                <button className="bg-customPrimary text-white w-40 h-12 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 font-semibold"
                        type="submit">Criar imovel</button>

            </form>
        </div>
        </DialogContent>
    </Dialog>
    <Toaster/>
    </>
    )
}