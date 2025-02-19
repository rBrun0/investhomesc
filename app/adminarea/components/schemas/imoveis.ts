import {z} from 'zod' 
import { useForm, SubmitHandler} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';



const imoveisSchema = z.object({
    // id: z.string(),
    descricao: z.string().min(1, {message: 'descrição precisa ser preenchida'}),
    // area: z.number().min(1, {message: 'area precisa ser preenchida'}),
    preco: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'})
    ,
    areaPrivativa: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'})
    ,
    estado: z.string().max(2, {message: 'Estado deve conter 2 dígitos'}),
    bairro: z.string().min(3, {message: 'Bairro precisa ser preenchido'}),
    cidade: z.string().min(3, {message: 'Cidade precisa ser preenchida'}),
    rua: z.string().min(3, {message: 'Rua precisa ser preenchida'}),
    numero: z.string().refine((v) => typeof Number(v) == 'number', {message: 'Preco precisa ser um numero'}),
    dataEntregaEmpreendimento: z.string().optional(),
    suites: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}),
    dormitorios: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'})
    .transform((val) => Number(val)),
    vagas: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}),
    propertyType: z.string().min(1, {message: "campo deve ser preenchido"}),
    construtora: z.string().min(1, {message: "campo deve ser preenchido"}),
    banheiros: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}),
    numeroAnunciante: z.string().regex(/^\d+$/, {message: 'campo deve ser preenchido por números'})
    .min(13, {message: 'campo precisa ser preenchido'}).max(13, {message:"Máximo 13 caracteres"}),
    // imagens: z.array(z.string()),
    registroDeIncorpocao: z.string().refine((v) => typeof Number(v) == 'number', {message: 'Preco precisa ser um numero'}).optional(),
    longitude: z.string().optional(),
    latitude: z.string().optional(),
    // areaDeLazer: z.string().array()
    videoLink: z.string().optional(),  
    receiveTime: z.string().min(1, {message: "campo deve ser preenchido"}).regex(/^\d+$/, {message: 'campo deve ser preenchido por números'}),
    buildingInformations: z.string().array().optional().nullable(),
    condominumInformations: z.string().array().optional().nullable(),
    buildingProfile: z.string().array().optional(),
})      

export type ImoveisType = z.infer<typeof imoveisSchema>
export type ImoveisSubmit = SubmitHandler<ImoveisType>

const buildingSchema = {
    useCreate: () =>
        useForm<ImoveisType>({
            resolver:  zodResolver(imoveisSchema),
            defaultValues: {
                buildingInformations: [],
                condominumInformations: [],
                buildingProfile: [],
            }
        })
}

export const {useCreate} = buildingSchema