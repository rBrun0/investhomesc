"use client"

import { auth, db, storage } from "@/app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa"
import { v4 as uuidv4 } from 'uuid';

export const AdicionarImoveis = () => {

    const [dataEntregaEmpreendimento, setDataEntregaEmpreendimento] = useState('')
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [areaPrivativa, setAreaPrivativa] = useState("");
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
    const [areaDeLazer, setAreaDeLazer] = useState<{id: number, value: string}[]>([]);
    const [areaDeLazerInput, setAreaDeLazerInput] = useState("");
    const [banheiros, setBanheiros] = useState("");
    const [dormitorios, setDormitorios] = useState(""); 
    const [construtora, setConstrutora] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [numeroAnunciante, setNumeroAnunciante] = useState("");

    const [uploadedImages, setUploadedImages] = useState<string[]>([])  

    const [informacoesEmpreendimentoInput, setInformacoesEmpreendimentoInput] = useState("")
    const [informacoesEmpreendimento, setInformacoesEmpreendimento] = useState<{id: number, value: string}[]>([]);

    const [informacoesImovelInput, setInformacoesImovelInput] = useState("")
    const [informacoesImovel, setInformacoesImovel] = useState<{id: number, value: string}[]>([]);
    const [checkboxPerfi, setCheckBoxPerfil] = useState<string[]>([])
    const [checkboxEmpreendimento, setCheckboxEmpreendimento] = useState<string[]>([])
    const [checkboxCondominio, setCheckboxCondominio] = useState<string[]>([])

    const curUser = auth.currentUser

    const [file, setFile] = useState<any>();

    function adicionarInformacoesImovel() {
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
        setInformacoesEmpreendimento([
           ...informacoesEmpreendimento,
            {id: Math.random(), value: informacoesEmpreendimentoInput },
        ]);
        setInformacoesEmpreendimentoInput("");
    }

    function removerInformacaoEmpreendimento(id: number) {
        setInformacoesEmpreendimento(informacoesEmpreendimento.filter((info) => info.id!== id));
    }

    function adicionarInformacoesLazer() {
        setAreaDeLazer([
           ...areaDeLazer,
            {id: Math.random(), value: areaDeLazerInput },
        ]);
        setAreaDeLazerInput("");
    }

    function removerAreaDeLazer(id: number) {
        setAreaDeLazer(areaDeLazer.filter((area) => area.id!== id));
    }

    const handleCheckPerfilImovel = (e: ChangeEvent<HTMLInputElement>) => {
        const isSelected = e.target.checked
        const value = e.target.value

        if(isSelected) {
            setCheckBoxPerfil([...checkboxPerfi, value])
        } else {
            setCheckBoxPerfil((prev) => {
                return prev.filter((nam) => nam != value)
            })
        }

        console.log(checkboxPerfi)
    }

    const handleCheckImovel = (e: ChangeEvent<HTMLInputElement>) => {
        const isSelected = e.target.checked
        const value = e.target.value

        if(isSelected) {
            setCheckboxEmpreendimento([...checkboxEmpreendimento, value])
        } else {
            setCheckboxEmpreendimento((prev) => {
                return prev.filter((nam) => nam != value)
            })
        }

        console.log(checkboxPerfi)
    }

    const handleCheckCondominio = (e: ChangeEvent<HTMLInputElement>) => {
        const isSelected = e.target.checked
        const value = e.target.value

        if(isSelected) {
            setCheckboxCondominio([...checkboxCondominio, value])
        } else {
            setCheckboxCondominio((prev) => {
                return prev.filter((nam) => nam != value)
            })
        }

        console.log(checkboxCondominio)
    }

    const handleUpload = () => {
      if (!file) return;
      
      const storageRef = ref(storage, `imoveis/${JSON.stringify(Date())}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Você pode monitorar o progresso do upload aqui
        },
        (error) => {
          console.error("Erro ao enviar imagem: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("URL da imagem: ", downloadURL);
            // Aqui você pode salvar a URL no Firestore junto com o imóvel
          });
        }
      );
    };

    function adicionarImovel() {
        addDoc((collection(db, "imoveis")), {
            areaPrivativa: areaPrivativa,
            bairro: bairro,
            bairroVal: bairro.toLocaleLowerCase().normalize("NFC"),
            bathrooms: banheiros,
            caracteristicasCondominio: checkboxCondominio,
            caracteristicasImovel: checkboxEmpreendimento,
            cidade: cidade,
            cidadeVal: cidade.toLocaleLowerCase().normalize("NFC"),
            codigoImovel: String(Date.now()),
            construtora: construtora,
            construtoraVal: construtora.toLowerCase().normalize("NFC"),
            created: new Date(),
            dataEntregaEmpreenimento: dataEntregaEmpreendimento,
            descricao: descricao,
            id: uuidv4().slice(0,8),
            imagensPlanta: uploadedImages,
            imagensUrl: uploadedImages,
            informacoesEmpreendimento: informacoesEmpreendimento,
            informacoesImovel: informacoesImovel,
            informacoesLazer: areaDeLazer,
            localizacao: {latitude: latitude, longitude: longitude},
            numeroAnunciante: numeroAnunciante,
            numeroRua: rua,
            perfil: checkboxPerfi,
            preco: preco,
            propertyVideo: videoLink,
            quartos: dormitorios,
            suites: suites,
            tipoDoImovel: propertyType,
            vagas: vagas,
            createdBy: curUser?.uid
        })
    }

    return (
        <div>
                       

            <hr className="w-4/5 mx-auto mt-12"/>

            <div className="w-full mt-16 flex flex-col justify-center items-center outline-none">
                <h1 className="text-center text-xl font-semibold">adicionar imoveis</h1>

                <input type="number" placeholder="preco"  className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"/>

                <div className="flex flex-col justify-center items-center space-y-16 w-3/5">
                    <div className="flex flex-col items-center">
                    <input type="text" placeholder="descricao do imovel" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"/>
                    <div className="">
                        {
                            descricao
                        }
                    </div>
                    </div>

                    <input type="number" name="" id="" placeholder="area privativa" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={preco} onChange={e => setPreco(e.target.value)}/>

                    <input type="number" name="" id="" placeholder="descricao" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={descricao} onChange={(e) => setDescricao(e.target.value)}/>


                    <input type="text" name="" id="" placeholder="data de entrega - 10/10/1910" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={dataEntregaEmpreendimento} onChange={(e) => setDataEntregaEmpreendimento(e.target.value)}/>

                    <input type="text" placeholder="dormitorios" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={suites} onChange={(e) => setSuites(e.target.value)}/>

                    <input type="number" placeholder="banheiros" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={banheiros} onChange={(e) => setBanheiros(e.target.value)}/>

                    <input type="text" placeholder="estado" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={estado} onChange={(e) => setEstado(e.target.value)}/>

                    <input type="text" placeholder="dormitorios" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={dormitorios} onChange={(e) => setDormitorios(e.target.value)}/>
                    <input type="text" placeholder="suites" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"/>

                    <input type="text" placeholder="numero da propriedade"  className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"
                    value={numero} onChange={(e) => setNumero(e.target.value)}/>

                    <input type="text" placeholder="rua - numero ou nome"  className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"
                    value={rua} onChange={(e) => setRua(e.target.value)}/>

                    <input type="text" placeholder="numero de vagas" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"
                    value={vagas} onChange={(e) =>setVagas(e.target.value)}/>
                    <input type="text" placeholder="bairro" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={bairro} onChange={(e) => setBairro(e.target.value)}/>
                    <input type="text" placeholder="cidade" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                    <input type="text" placeholder="nome da construtora" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={construtora} onChange={(e) => setConstrutora(e.target.value)}/>
                    <input type="text" placeholder="data de entrega do empreendimento" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"/>

                    <div >
                        <h1 className="text-2xl text-center">tipo do imovel</h1>

                        <select name="" id="" className="text-zinc-700 pl-3 w-96 h-14 shadow-md" onChange={(e) => setPropertyType(e.target.value)}>
                            <option value="apartamento">Apartamento</option>
                            <option value="casa">Casa</option>
                            <option value="sala comercial">Sala Comercial</option>
                        </select>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-3">
                        <h1>informacoes do imovel</h1>

                        <input type="text" placeholder="ex: numero de quartos" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                        value={informacoesImovelInput} onChange={(e) => setInformacoesEmpreendimentoInput(e.target.value)}/>
                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" onClick={adicionarInformacoesImovel}>adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4">

                            {
                                informacoesImovel.map(info => (
                                    <span className="space-x-2 flex items-center justify-center" key={info.id}> <FaRegTrashAlt onClick={() => removerInformacoesImovel(info.id)}/>
                                    <span>{info.value}</span></span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-3">
                        <h1>informacoes do empreendimento</h1>

                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                        value={informacoesEmpreendimentoInput} onChange={(e) => setInformacoesEmpreendimentoInput(e.target.value)}/>
                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors" 
                        onClick={adicionarInformacoesEmpreendimento}>adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4 mt-8" >

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

                    <div className="flex flex-col justify-center items-center space-y-3 mt-8">
                        <h1>informacoes do lazer</h1>

                        <input type="text" placeholder="ex: coleta de lixo" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                        value={areaDeLazerInput} onChange={(e) => setAreaDeLazerInput(e.target.value)}/>
                        <button className="bg-customPrimary text-white w-20 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors"
                        onClick={adicionarInformacoesLazer}>adicionar</button>

                        <div className="flex flex-wrap justify-between gap-4 w-3/5">
                            <span className="space-x-2 flex items-center justify-center"> <FaRegTrashAlt /><span>item-1</span></span>
                            {
                                areaDeLazer.map((area) => (
                                    <span className="space-x-2 flex items-center justify-center" key={area.id}> 
                                    <FaRegTrashAlt onClick={() => removerAreaDeLazer(area.id)}/>
                                    <span>{area.value}</span></span>
                                ))
                            }
                        </div>
                    </div>  

                    {
                        propertyType == "condominio" && <input type="text" placeholder="nome do condominio" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"/>
                    }

                    <input type="text" placeholder="numero do anunciante - 55 99 999999999" className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"
                    value={numeroAnunciante} onChange={(e) => setNumeroAnunciante(e.target.value)}/>

                    <input type="text" placeholder="link para video"  className="text-zinc-700 pl-3 w-96 h-14 shadow-md mt-8"
                    value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>

                    <div className="flex flex-col justify-center items-center space-y-4 pt-8">

                        <h1 className="text-2xl text-center">Perfil do imovel</h1>

                        <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Chacara Flora"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Chacara Flora</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Frente Avenida"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Frente Avenida</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Frente Mar"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Frente Mar</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Lancamentos"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Lancamentos</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Mobiliados"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Mobiliados</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Plaza Iate Club"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Plaza Iate Club</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Quadra do Mar"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Quadra do Mar</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Sem Mobilia"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Sem Mobilia</span>
                        </label>

                        <label className="flex items-center space-x-2" htmlFor="apartamento">
                            <input type="checkbox" name="" id="apartamento" value={"Showroom"} onChange={(e) => handleCheckPerfilImovel(e)}/>
                            <span>Showroom</span>
                        </label>
                           
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-4 pt-8">

                <h1 className="text-2xl text-center">caracteristicas do imovel</h1>

                <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                <label className="flex items-center space-x-2" htmlFor="Apartamentocobertura">
                    <input type="checkbox" name="" id="Apartamentocobertura" value={"Apartamento cobertura"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Apartamento cobertura</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Soldatarde">
                    <input type="checkbox" name="" id="Soldatarde" value={"Sol da tarde"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Sol da tarde</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Duplex">
                    <input type="checkbox" name="" id="Duplex" value={"Duplex"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Duplex</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Quadramar">
                    <input type="checkbox" name="" id="Quadramar" value={"Quadra mar"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Quadra mar</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Semmobilia">
                    <input type="checkbox" name="" id="Semmobilia" value={"Sem mobília"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Sem mobília</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="SoldaManha">
                    <input type="checkbox" name="" id="SoldaManha" value={"Sol da Manha"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Sol da Manha</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Aptodiferenciado">
                    <input type="checkbox" name="" id="Aptodiferenciado" value={"Apto diferenciado"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Apto diferenciado</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Showroom">
                    <input type="checkbox" name="" id="Showroom" value={"Showroom"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Showroom</span>
                </label>

                <label className="flex items-center space-x-2" htmlFor="Frenteavenida">
                    <input type="checkbox" name="" id="Frenteavenida" value={"apartamento"} onChange={(e) => handleCheckImovel(e)}/>
                    <span>Frente avenida</span>
                </label>
                </div>

                </div>

                <div className="flex flex-col justify-center items-center space-y-4 pt-8">

                <h1 className="text-2xl text-center">caracteristicas do condominio</h1>

                <div className="flex flex-wrap w-3/5 justify-start items-center gap-8">
                                <label className="flex items-center space-x-2" htmlFor="apartamento">
                                    <input type="checkbox" name="" id="apartamento" value={"Apartamento cobertura"} onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Apartamento cobertura</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="SoldaManha">
                                    <input type="checkbox" name="" id="SoldaManha" value={"Sol da Manha"} onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Sol da Manha</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Soldatarde">
                                    <input type="checkbox" name="" id="apartamento" value={"Sol da tarde"} onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Sol da tarde</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Aptodiferenciado">
                                    <input type="checkbox" name="" id="Aptodiferenciado" value={"Apto diferenciado"} onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Apto diferenciado</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Duplex">
                                    <input type="checkbox" name="" id="Duplex" value={"Duplex"}  onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Duplex</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Showroom">
                                    <input type="checkbox" name="" id="Showroom" value={"Showroom"}  onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Showroom</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Quadramar">
                                    <input type="checkbox" name="" id="Quadramar" value={"Quadra mar"}  onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Quadra mar</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Frenteavenida">
                                    <input type="checkbox" name="" id="Frenteavenida" value={"Frente avenida"}  onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Frente avenida</span>
                                </label>

                                <label className="flex items-center space-x-2" htmlFor="Semmobilia">
                                    <input type="checkbox" name="" id="Semmobilia" value={"Sem mobilia"}  onChange={(e) => handleCheckCondominio(e)}/>
                                    <span>Sem mobília</span>
                                </label>
                                
                                </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 mt-12">
                    <h1 className="text-3xl">localizacao</h1>

                    <input type="text" placeholder="latitude " className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                    <input type="text" placeholder="longitude" className="text-zinc-700 pl-3 w-96 h-14 shadow-md"
                    value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                </div>

                <div className="mt-20 space-y-4">
                        <h1 className="text-3xl">Adicionar imagens</h1>

                        <input type="file" name="" id="" onChange={(e) => {
                            if(e.target.files) {
                                {setFile(e.target.files[0])}
                            }
                        }}/>
                        <button onClick={handleUpload}
                        className="bg-customPrimary text-white w-28 h-8 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 ">Fazer upload</button>

                    </div>

                <button className="bg-customPrimary text-white w-40 h-12 rounded-md border-[1px] border-customPrimary
                        hover:bg-white hover:text-customPrimary transition-colors mt-16 font-semibold"
                        onClick={adicionarImovel}>adicionar imovel</button>

            </div>
        </div>
    )
}