import {z} from 'zod' 
import { useForm, SubmitHandler} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';



const construcaoSchema = z.object({
    description: z.string().min(10, {message: 'descricao precisa ser preenchida'}),
    preco: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    areaPrivativa: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    codigo: z.string(),
    estado: z.string().min(2, {message: 'Estado deve conter 2 digitos'}).max(2, {message: 'Estado deve conter 2 digitos'}),
    bairro: z.string().min(3, {message: 'Bairro precisa ser preenchido'}),
    cidade: z.string().min(3, {message: 'Cidade precisa ser preenchida'}),
    rua: z.string().min(3, {message: 'Rua precisa ser preenchida'}),
    // numeroEdificio: z.string().regex(/^\d+$/, {message: 'campo deve ser preenchido por numeros'}).transform((val) => Number(val)),
    dataEntregaEmpreendimento: z.date().optional(),
    suites: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    quartos: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    vagas: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    // imagens: z.array(z.string()),
    registroDeIncorpocao: z.string().regex(/^\d+$/, {message: 'campo deve ser preenchido por numeros'}).transform((val) => Number(val)),
    longitude: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    latitude: z.string().min(1, {message: "Campo deve ser preenchido!"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}).transform((val) => Number(val)),
    // areaDeLazer: z.string().array()
    videoLink: z.string(),  

})

export type ConstrutoraType = z.infer<typeof construcaoSchema>
export type ConstrutoraSubmit = SubmitHandler<ConstrutoraType>

const buildingSchema = {
    useCreate: () =>
        useForm<ConstrutoraType>({
            resolver:  zodResolver(construcaoSchema) ,
        })
}

export const {useCreate} = buildingSchema