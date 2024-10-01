import Image from "next/image"
import { FaBed } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { formatToBrl } from "@/app/@Types/utils/formatToBrl";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardDialog } from "./CardDialog";


type PlaceCardProps = {
    id: number | string,
    preco: number | string,
    imagemUrl: string[],
    descricao: string,
    areaPrivativa: string,
    codigo: string,
    dataEntregaEmpreendimento: string,
    suites: string,
    quartos: number, 
    vagas: number
    bairro: string,
    cidade: string,
    numeroRua: string,
    numeroLocal: number,
    direcionamento: string
}

export const PlaceCard = ({id, preco, imagemUrl, descricao, areaPrivativa, codigo, dataEntregaEmpreendimento, suites, quartos, bairro, 
    cidade, numeroRua, numeroLocal, vagas, direcionamento}: PlaceCardProps) => {
    return (
        <div className="flex mx-auto flex-col lg:flex-row items-start w-4/5 md:w-4/5 lg:w-[72rem] shadow-lg overflow-hidden">
            <Link href={`/${direcionamento}/${codigo}`}>
            <div className="mx-auto w-[24.4rem] min-h-40 lg:min-w-[600px] lg:min-h-[340px] relative overflow-hidden object-cover">
                {
                    imagemUrl[0] && <Image src={imagemUrl[0]} fill objectFit="cover" alt="imagem" className="hover:scale-105 duration-200 transition-transform"/> 
                }
            </div>
            </Link>

            <section className="flex flex-col flex-wrap justify-between pl-6 pt-4 lg:min-h-[340px]">
                <h1 className="text-2xl font-bold tracking-wider"> {formatToBrl(+preco)}</h1>

                <p className="flex text-xs lg:text-base lg:w-52 lg:max-w-full lg:max-h-36 text-zinc-600 tracking-wide text-ellipsis">
                    {descricao}
                </p>

                

                <p className="text-sm">{numeroRua} - {bairro} - {cidade} /SC</p>

                    <div className="flex space-x-3">

                        <div className="flex-col justify-center items-start text-xs lg:text-lg"><span className="flex justify-center items-center space-x-1"><FaBed className="font-semibold"/> <span>{quartos}</span></span> <span className="text-xs">Dorm.</span></div>

                        <div className="flex-col justify-center items-start text-xs lg:text-lg"><span className="flex justify-center items-center space-x-1"><FaBed className="font-semibold"/> <span>{suites}</span></span> <span className="text-xs">Suites</span></div>

                        <div className="flex-col justify-center items-start text-xs lg:text-lg"><span className="flex justify-center items-center space-x-1"><FaCar className="font-semiboldl"/> <span>{vagas}</span></span> <span className="text-xs">Vagas</span></div>

                        <div className="flex-col justify-center items-start text-xs lg:text-lg"><span className="flex justify-center items-center space-x-1"><FaRulerCombined className="font-semibold"/> <span>{areaPrivativa}m2</span></span> <span className="text-xs"   >Area Administrativa</span></div>
                    </div>

                    <div className="mx-auto md:w-1/2 lg:w-10/12 h-[1px] bg-zinc-500"/>

                    <div className="flex justify-between items-center px-4 space-x-5 max-w-full py-6 md:py-2 gap-2">
                            <span className="rounded-md w-36 h-8 text-sm border-[2px] border-black border-solid
                            flex justify-center items-center"
                            >Cod: {codigo}
                            </span>

                            <div className="flex justify-center items-center space-x-4 md:space-x-3">
                                    <Link href={"https://wa.me/9999999"} target="blank">
                                    <span className=" cursor-pointer w-10 h-10 lg:w-14 lg:h-14 text-white bg-green-400 rounded-full flex items-center
                                     justify-center "><FaWhatsapp/></span>
                                    </Link>

                                    <Dialog>
                                        <DialogTrigger  className="bg-customPrimary text-white font-medium rounded-md 
                                        w-28 h-8 md:w-32 md:h-10 lg:w-40 lg:h-12 
                                        cursor-pointer">
                                            Mensagem
                                        </DialogTrigger>

                                        <CardDialog codigoDoImovel={codigo}/>
                                    </Dialog>
                        
                                    
                            </div>
                    </div>

            </section>
        </div>

    
    )
}