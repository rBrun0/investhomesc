"use client"

import { FaRegTrashAlt } from "react-icons/fa"
import React from "react"
import { ChangeEvent, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export const AdicionarConstrucao = () => {

    const curUser = auth.currentUser


    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [areaPrivativa, setAreaPrivativa] = useState("");
    const [codigo, setCodigo] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [vagas, setVagas] = useState("");
    const [suites, setSuites] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [registroDeInforporacao, setRegistroDeIncorporacao] = useState<string | null>("");
    const [areaDeLazer, setAreaDeLazer] = useState<string[]>([]);
    const [areaDeLazerInput, setAreaDeLazerInput] = useState("")
    const [dataEntregaEmpreendimento, setDataEntregaEmpreendimento] = useState('')
    const [quartos, setQuartos] = useState<string>('')

    const [uploadedImages, setUploadedImages] = useState<string[]>([])  

    const [informacoesEmpreendimentoInput, setInformacoesEmpreendimentoInput] = useState("")
    const [informacoesEmpreendimento, setInformacoesEmpreendimento] = useState<string[]>([]);

    const [informacoesImovelInput, setInformacoesImovelInput] = useState("")
    const [informacoesImovel, setInformacoesImovel] = useState<string[]>([]);

    const [checkboxVal,setCheckboxVal] = useState<string[]>([])
    const [cbCondominio, setCbCondominio] = useState<string[]>([])


    const adicionarInformacaoEmpreendimento = () => {
        setInformacoesEmpreendimentoInput("")
        setInformacoesEmpreendimento([...informacoesEmpreendimento, informacoesEmpreendimentoInput])
    }

    const removerInformacaoEmpreendimento = (name: string) => {
        setInformacoesEmpreendimento(informacoesEmpreendimento.filter(name => name !== name))
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

  const [file, setFile] = useState<any>();

  const handleUpload = () => {
    if (!file) return;
    
    const storageRef = ref(storage, `construcao/${JSON.stringify(Date())}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {

      },
      (error) => {
        console.error("Erro ao enviar imagem: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("URL da imagem: ", downloadURL);
          // Aqui você pode salvar a URL no Firestore junto com o imóvel
          setUploadedImages([...uploadedImages, downloadURL])
        });
      }
    );
  }
;

async function adicionarConstrucao() {
    try {
        await addDoc(collection(db, "construcao"), {
            id: String(Date.now()),
            bairro: bairro,
            cidade: cidade,
            areaDeLazer: areaDeLazer,
            areaPrivativa: areaPrivativa,
            caracteristicasCondominio: cbCondominio,
            caracteristicasImovel: checkboxVal,
            codigo: uuidv4().slice(0,8),
            dataEntregaEmpreendimento: dataEntregaEmpreendimento,
            descricao: descricao,
            dormitorios: quartos,
            estado: estado,
            imagens: uploadedImages,
            imagensPlanta: uploadedImages,
            informacoesEmpreendimento: informacoesEmpreendimento,
            informacoesImovel: informacoesImovel,
            localizacao: {latitude: latitude, longitude: longitude},
            numeroLocal: numero,
            preco: preco,
            registroDeInforporacao: registroDeInforporacao,
            rua: rua,
            suites: suites,
            vagas: vagas,
            Video: videoLink,
            createdBy: curUser?.uid
        })
    } catch (error) {
        console.error("Erro ao adicionar construção: ", error);
    }
}




    return (
        <section className="w-full mt-20 flex flex-col items-center">

        <hr className="w-4/5 mx-auto mt-12"/>
            
        <h1 className="text-center text-4xl mt-12">ADICIONAR CONSTRUCAO</h1>


        <input type="text" placeholder="valor" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={preco} onChange={(e) => setPreco(e.target.value)}/>
        <input type="text" placeholder="data de entrega - ex: 10/10/2010" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"
         value={dataEntregaEmpreendimento} onChange={(e) => setDataEntregaEmpreendimento(e.target.value)}/>
        <input type="text" placeholder="area privativa" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={areaPrivativa} onChange={(e) => setAreaPrivativa(e.target.value)}/>
        <input type="text" placeholder="codigo" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={codigo} onChange={(e) => setCodigo(e.target.value)}/>
        <div className="flex flex-col items-center justify-center w-3/5">
            <input type="string" placeholder="descricao" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>

            <p className="flex flex-wrap">{descricao}</p>
        </div>

        <input type="text" placeholder="numero do edificio" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={numero} onChange={(e) => setNumero(e.target.value)}/>
        <input type="number" placeholder="numero do edificio" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={quartos} onChange={(e) => setQuartos(e.target.value)}/>
        <input type="text" placeholder="numero ou nome da rua" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={rua} onChange={(e) => setRua(e.target.value)}/>
        <input type="text" placeholder="bairro" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
        <input type="text" placeholder="cidade" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
        <input type="text" placeholder="estado - sigla" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={estado} onChange={(e) => setEstado(e.target.value)}/>
        <input type="text" placeholder="registro de incorporacao" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={registroDeInforporacao ? registroDeInforporacao : ""} onChange={(e) => setRegistroDeIncorporacao(e.target.value)}/>
        <input type="text" placeholder="vagas" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"  value={vagas} onChange={(e) => setVagas(e.target.value)}/>
        <input type="text" placeholder="suites" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={suites} onChange={(e) => setSuites(e.target.value)}/>
        <input type="text" placeholder="link para video" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8" value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>

        <div className="flex flex-col justify-center items-center space-y-3 mt-12">
                        <h1 className="text-3xl" >informacoes do empreendimento</h1>

                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                        value={informacoesEmpreendimentoInput} onChange={(e) => setInformacoesEmpreendimentoInput(e.target.value)}/>
                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" onClick={adicionarInformacaoEmpreendimento}>adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4 mt-8" >
                            <span className="space-x-2 flex items-center justify-center"> <FaRegTrashAlt /><span>item-1</span></span>
                            {
                                informacoesEmpreendimento.map((val, index) => (
                                    <span className="space-x-2 flex items-center justify-center" key={index}
                                    onClick={() => removerInformacaoEmpreendimento(val)}> <FaRegTrashAlt className="cursor-pointer"/><span>{val}</span></span>
                                ))
                            }
                           
                        </div>
                    </div>



                    <div className="flex flex-col justify-center items-center space-y-3 pt-20">
                        <h1 className="text-3xl">informacoes do imovel</h1>

                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                        value={informacoesImovelInput} onChange={(e) => setInformacoesImovelInput(e.target.value)}/>
                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" onClick={adicionarInformacaoImovel}>adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4 mt-8" >
                        {
                                informacoesImovel.map((val: string, index) => (
                                    <span className="space-x-2 flex items-center justify-center" key={index}
                                    onClick={() => removerInformacaoImovel(val)}> <FaRegTrashAlt className="cursor-pointer"/><span>{val}</span></span>
                                ))
                            }
                        </div>
                    </div>



                    <div className="flex flex-col justify-center items-center gap-4 mt-12">
                    <h1 className="text-3xl">localizacao</h1>

                        <input type="string" placeholder="latitude ex: -34342" className="text-zinc-700 pl-3 w-96 h-14 shadow-md" 
                        value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                        <input type="string" placeholder="longitude ex: -342343" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                         value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
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
                            <span>Churrasqueira</span>
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

                                <h1 className="text-center text-3xl">Caracteristicas do condominio</h1>

                                <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Apartamento cobertura"} onChange={(e) => handleCheckbox(e)}/>
                                    <span>Apartamento cobertura</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Sol da Manha"} onChange={(e) => handleCheckbox(e)}/>
                                    <span>Sol da Manha</span>
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
                                    <span>Sem mobíllia</span>
                                </label>
                                
                                </div>
            </div>

                    <div className="flex flex-col justify-center items-center mt-20">
                        <h1>Area De Lazer</h1>

                        <input type="text" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                        value={areaDeLazerInput} onChange={(e) => setAreaDeLazerInput(e.target.value)}/>
                        <button onClick={adicionarAreaDeLazer}
                        className="bg-customPrimary text-white w-28 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16">adicionar</button>

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
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                              }
                        }}/>
                        <button onClick={handleUpload}
                        className="bg-customPrimary text-white w-28 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 ">Fazer upload</button>

                    </div>

                    <button className="bg-customPrimary text-white w-48 h-12 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 font-semibold" onClick={adicionarConstrucao}>adicionar construcao</button>
        </section>
    )
}