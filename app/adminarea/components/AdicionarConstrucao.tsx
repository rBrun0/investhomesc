"use client"

import { FaRegTrashAlt } from "react-icons/fa"
import React, { useEffect } from "react"
import { ChangeEvent, useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building, CalendarIcon } from "lucide-react";
import { ConstrutoraType, useCreate } from "./schemas/construcao";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {toast, Toaster} from "sonner";
import Image from "next/image";

export const AdicionarConstrucao = () => {

    const baseForm = useCreate()
    const {register, handleSubmit, formState: {errors}, watch, reset} = baseForm
    const valuesWatch = baseForm.getValues()

    console.log({valuesWatch})
    console.log('formErrrors', errors)

    const curUser = auth.currentUser


    // const [descricao, setDescricao] = useState("");
    // const [preco, setPreco] = useState("");
    // const [areaPrivativa, setAreaPrivativa] = useState("");
    // const [codigo, setCodigo] = useState("");
    // const [bairro, setBairro] = useState("");
    // const [cidade, setCidade] = useState("");
    // const [estado, setEstado] = useState("");
    // const [rua, setRua] = useState("");
    // const [numero, setNumero] = useState("");
    // const [vagas, setVagas] = useState("");
    // const [suites, setSuites] = useState("");
    // const [videoLink, setVideoLink] = useState("");
    // const [latitude, setLatitude] = useState("");
    // const [longitude, setLongitude] = useState("");
    // const [registroDeInforporacao, setRegistroDeIncorporacao] = useState<string | null>("");
    const [areaDeLazer, setAreaDeLazer] = useState<string[]>([]);
    const [areaDeLazerInput, setAreaDeLazerInput] = useState("")
    // const [dataEntregaEmpreendimento, setDataEntregaEmpreendimento] = useState('')
    // const [quartos, setQuartos] = useState<string>('')

    const [uploadedImages, setUploadedImages] = useState<string[]>([])  

    const [informacoesEmpreendimentoInput, setInformacoesEmpreendimentoInput] = useState("")
    const [informacoesEmpreendimento, setInformacoesEmpreendimento] = useState<string[]>([]);

    const [informacoesImovelInput, setInformacoesImovelInput] = useState("")
    const [informacoesImovel, setInformacoesImovel] = useState<string[]>([]);

    const [checkboxVal,setCheckboxVal] = useState<string[]>([])
    const [cbCondominio, setCbCondominio] = useState<string[]>([])

    const [date, setDate] = useState<Date | null>()


    const adicionarInformacaoEmpreendimento = () => {
        setInformacoesEmpreendimentoInput("")
        setInformacoesEmpreendimento([...informacoesEmpreendimento, informacoesEmpreendimentoInput])
    }

    const removerInformacaoEmpreendimento = (name: string) => {
        setInformacoesEmpreendimento(informacoesEmpreendimento.filter(n => n !== name))
    }

    const adicionarInformacaoImovel = () => {

        setInformacoesImovelInput("")
        setInformacoesImovel([...informacoesImovel, informacoesImovelInput])
    }

    const removerInformacaoImovel = (name: string) => {
        setInformacoesImovel(informacoesImovel.filter(nome => nome !== name))
    }

    const adicionarAreaDeLazer = () => {
        if(areaDeLazerInput == "") {
            return
        }
        setAreaDeLazerInput("")
        setAreaDeLazer([...areaDeLazer, areaDeLazerInput])
    }

    const removerAreaDeLazer = (name: string) => {
        setAreaDeLazer(areaDeLazer.filter(nome => nome !== name))
    }

    function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
        const isSelected = e.target.checked
        const value = e.target.value

        if(isSelected) {
            setCheckboxVal([...checkboxVal, value])
        } else {
            setCheckboxVal((prev) => {
                return prev.filter((nam) => nam != value)
            })
        }

        console.log(checkboxVal)
    }

    function handleCheckboxCondominum(e: ChangeEvent<HTMLInputElement>) {
        const isSelected = e.target.checked
        const value = e.target.value

        if(isSelected) {
            setCbCondominio([...checkboxVal, value])
        } else {
            setCbCondominio((prev) => {
                return prev.filter((nam) => nam != value)
            })
        }

        console.log(cbCondominio)
    }

  const [file, setFile] = useState<File | null>();

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

  const handleUpload = async () => {
    if (!file) return;
    
    if (!file) return;

    // const timestamp = Date.now(); // Alternativa: new Date().toISOString()
    // const fileName = `${timestamp}-${file.name}`;

    const imageUrl = await cloudinaryUpload(file);
    setUploadedImages((prev) => [...prev, imageUrl]); 

    console.log({setUploadedImages})
  }
;

async function onSubmit(data:ConstrutoraType) {
    if(!uploadedImages || uploadedImages.length <= 0) {
        toast.error("Escolha ao menos 1 imagem!")
    }


    try {
        await addDoc(collection(db, "construcao"), {
            ...{
                ...data,
                id: uuidv4(),
                areaDeLazer,
                caracteristicasCondominio:cbCondominio,
                informacoesEmpreendimento,
                informacoesImovel,
                imagens: uploadedImages, 
                dataEntregaEmpreendimento: String(date),
                createdBy: curUser?.uid,
            }
        })
    } catch (error) {
        console.error("Erro ao adicionar construção: ", error);
    }

    reset()
}

useEffect(() => {
    console.log({valuesWatch})
}, [valuesWatch])




    return (
        <Dialog>

            <DialogTrigger>
                <Button className="text-xl bg-transparent text-customPrimary border border-customPrimary hover:bg-slate-100 ">
                <Building />
                    Adicionar construção
                </Button>
            </DialogTrigger>

            <DialogContent className="overflow-y-scroll h-[28rem] max-w-[42rem]">
                <DialogHeader>
                    <DialogTitle className=" text-2xl">Adicionar construção</DialogTitle>
                </DialogHeader>

                {
                    watch('description')
                }

        <form className="w-full flex flex-col items-center gap-12 mt-16" onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Valor</h1>
        <input type="text" placeholder="R$" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" {...register('preco')}/>
                </label>

                <label htmlFor="preco" className="w-full relative">
                    {/* <h1 className="absolute -top-6">Data de entrega</h1>
        <input type="text" placeholder="10/10/2010" className="text-zinc-700 pl-3 w-full h-14 shadow-md"
         value={dataEntregaEmpreendimento} onChange={(e) => setDataEntregaEmpreendimento(e.target.value)}/> */}

<Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal py-7",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Selecione a data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
            locale={ptBR} // Defina o idioma aqui
            // format={date => format(date, 'dd/MM/yyyy', { locale: ptBR })}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
    </PopoverContent>
</Popover>
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Área privativa</h1>
        <input type="text" placeholder="m²" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" {...register('areaPrivativa')}/>
                {
                    errors.areaPrivativa && <p className="w-full text-start text-xs text-red-500 ">{errors.areaPrivativa.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Código da construção</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" {...register('codigo')}/>
                {
                    errors.codigo && <p className="w-full text-start text-xs text-red-500 ">{errors.codigo.message}</p>
                }
                </label>

                
        <label className="flex flex-col justify-center w-full relative">
                    <h1 className="absolute -top-6 text-start">Descrição</h1>
            <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
            {...register('description')} />
                {
                    errors.description && <p className="w-full text-start text-xs text-red-500 ">{errors.description.message}</p>
                }
        </label>  

        {/* <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Número do edifício</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 shadow-md "
        {...register('numero')}/>
                </label> */}

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Rua</h1>
        <input type="text" placeholder="numero ou nome" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
        {...register('rua')}/>
                {
                    errors.rua && <p className="w-full text-start text-xs text-red-500 ">{errors.rua.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Bairro</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
        {...register('bairro')}/>
                {
                    errors.bairro && <p className="w-full text-start text-xs text-red-500 ">{errors.bairro.message}</p>
                }
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Cidade</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
        {...register('cidade')}/>
                {
                    errors.preco && <p className="w-full text-start text-xs text-red-500 ">{errors.preco.message}</p>
                }
                </label>

                <label htmlFor="estado" className="w-full relative">
                    <h1 className="absolute -top-6">Estado</h1>
        <input type="text" placeholder="SC" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" id="estado" 
        {...register('estado')}/>
                {
                    errors.estado && <p className="w-full text-start text-xs text-red-500 ">{errors.estado.message}</p>
                }
                </label>

                <label htmlFor="registroIncorp" className="w-full relative">
                    <h1 className="absolute -top-6">Registro de incorporação</h1>
        <input type="text" placeholder="registro de incorporacao" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
        {...register('registroDeIncorpocao')} id="registroIncorp"
        />      
                {
                    errors.registroDeIncorpocao && <p className="w-full text-start text-xs text-red-500 ">{errors.registroDeIncorpocao.message}</p>
                }
                </label>

                <label htmlFor="vagas" className="w-full relative">
                    <h1 className="absolute -top-6">Vagas</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" id="vagaas"
        {...register('vagas')}/>
                {
                    errors.vagas && <p className="w-full text-start text-xs text-red-500 ">{errors.vagas.message}</p>
                }
                </label>

                <label htmlFor="suites" className="w-full relative">
                    <h1 className="absolute -top-6">Suítes</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" id="suites"
        {...register('suites')}/>
                {
                    errors.suites && <p className="w-full text-start text-xs text-red-500 ">{errors.suites.message}</p>
                }
                </label>
                
                <label htmlFor="quartos" className="w-full relative">
                    <h1 className="absolute -top-6">Quartos</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" id="quartos"
        {...register('quartos')}/>
                {
                    errors.quartos && <p className="w-full text-start text-xs text-red-500 ">{errors.quartos.message}</p>
                }
                </label>

                <label htmlFor="videoLink" className="w-full relative">
                    <h1 className="absolute -top-6">Link de vídeo</h1>
        <input type="text" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" id="videoLink"
        {...register('videoLink')}/>
                        {
                    errors.videoLink && <p className="w-full text-start text-xs text-red-500 ">{errors.videoLink.message}</p>
                }
                </label>
    

        <div className="flex flex-col justify-center items-center space-y-3">
                        <h1 className="text-3xl pb-6" >Informações do empreendimento</h1>

                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                        value={informacoesEmpreendimentoInput} onChange={(e) => setInformacoesEmpreendimentoInput(e.target.value)}/>
                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" onClick={adicionarInformacaoEmpreendimento}>Adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4" >
                           
                            {
                                informacoesEmpreendimento.map((val, index) => (
                                    <span className="space-x-2 flex items-center justify-center" key={index}
                                    onClick={() => removerInformacaoEmpreendimento(val)}> <FaRegTrashAlt className="cursor-pointer"/><span>{val}</span></span>
                                ))
                            }
                           
                        </div>
                    </div>



                    <div className="flex flex-col justify-center items-center space-y-3 pt-20">
                        <h1 className="text-3xl pb-12">Informações do imovel</h1>

                        <label htmlFor="preco" className="w-full relative">
                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                        value={informacoesImovelInput} onChange={(e) => setInformacoesImovelInput(e.target.value)}/>
                </label>

                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" onClick={adicionarInformacaoImovel}>Adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4" >
                        {
                                informacoesImovel.map((val: string, index) => (
                                    <span className="space-x-2 flex items-center justify-center" key={index}
                                    onClick={() => removerInformacaoImovel(val)}> <FaRegTrashAlt className="cursor-pointer"/><span>{val}</span></span>
                                ))
                            }
                        </div>
                    </div>



                    <div className="flex flex-col justify-center items-center gap-4 mt-12">
                    <h1 className="text-3xl pb-12">Localização</h1>

                    <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Latitude</h1>
                        <input type="string" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md" 
                        {...register('latitude')} />
                </label>

                <label htmlFor="preco" className="w-full relative">
                    <h1 className="absolute -top-6">Longitude</h1>
                        <input type="string" placeholder="" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                         {...register('longitude')}/>
                </label>

                    </div>

                    <div className="flex flex-col justify-center items-center mt-12">

                        <h1 className="text-center text-3xl">Caracteristicas do condominio</h1>

                    <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Academia"} onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Academia</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Churrasqueira"} onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Churrasqueira</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Sol da tarde"} onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Sol da tarde</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Elevador"} onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Elevador</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Espaço gourmet"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Espaço gourmet</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Lavanderia no prédio"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Lavanderia no prédio</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Sauna"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Sauna</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Piscina"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Piscina</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Playground"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Playground</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Portaria 24h"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Portaria 24h</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Quadra esportiva"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Quadra esportiva</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Salão de festas"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Salão de festas</span>
                        </label>
                        
                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Entrada para banhistas"}  onChange={e => handleCheckboxCondominum(e)}/>
                            <span>Entrada para banhistas</span>
                        </label>
                           
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-12">

                                <h1 className="text-center text-3xl">Características do condomínio</h1>

                                <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Apartamento cobertura"} onChange={(e) => handleCheckbox(e)}/>
                                    <span>Apartamento cobertura</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Sol da Manha"} onChange={(e) => handleCheckbox(e)}/>
                                    <span>Sol da Manhã</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Sol da tarde"} onChange={(e) => handleCheckbox(e)}/>
                                    <span>Sol da tarde</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Apto diferenciado"} onChange={(e) => handleCheckbox(e)}/>
                                    <span>Apto diferenciado</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Duplex"}  onChange={(e) => handleCheckbox(e)}/>
                                    <span>Duplex</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Showroom"}  onChange={(e) => handleCheckbox(e)}/>
                                    <span>Showroom</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Quadra mar"}  onChange={(e) => handleCheckbox(e)}/>
                                    <span>Quadra mar</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"apartamento"}  onChange={(e) => handleCheckbox(e)}/>
                                    <span>Frente avenida</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"apartamento"}  onChange={(e) => handleCheckbox(e)}/>
                                    <span>Sem mobília</span>
                                </label>
                                
                                </div>
            </div>

                    <div className="flex flex-col justify-center items-center mt-20">
                        <h1>Área De Lazer</h1>

                        <label htmlFor="preco" className="w-full relative">
                        <input type="text" className="text-zinc-700 pl-3 w-full h-14 border rounded-md"
                        value={areaDeLazerInput} onChange={(e) => setAreaDeLazerInput(e.target.value)}/>
                </label>

                        <button onClick={adicionarAreaDeLazer}
                        className="bg-customPrimary text-white w-28 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16">Adicionar</button>

                        <div>
                            {
                                areaDeLazer.map((ar, index) => (
                                    <span key={index} className="cursor-pointer"><FaRegTrashAlt onClick={() => removerAreaDeLazer(ar)}/> {ar}</span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-20 space-y-4">
                        <h1 className="text-3xl">Adicionar imagens</h1>

                        <input type="file" name="" id="" onChange={(e) => {
                             if(e.target.files && e.target.files.length > 0) {
                                const selectedFile = e.target.files[0];
                                setFile(selectedFile)
                                console.log({file})
                            }
                        }}/>
                        <div className="flex items-center justify-center gap-2">
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
                        className="bg-customPrimary text-white w-28 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 " type="button"
                        >
                            remover última
                        </button>
                        </div>

                        {
                            uploadedImages.length > 0 && <div className="flex flex-wrap gap-4 justify-center items-center">
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

                    <button className="bg-customPrimary text-white w-48 h-12 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 font-semibold" type="submit">Adicionar construção</button>
        </form>
        </DialogContent>
        <Toaster/>
    </Dialog>
    )
}