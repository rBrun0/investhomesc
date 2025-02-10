import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const zConstructorSchema = z.object({
        name: z.string().min(3, {message: "Campo nome deve ser preenchido"}).transform((v) => {
            return v.split(' ').map(v => v[0].toUpperCase() + v.substring(1)).join(' ')
        }),
    }).required()

export type ConstructorSchema = z.infer<typeof zConstructorSchema>;

const constructorSchema = {
        useCreate: () => 
            useForm<ConstructorSchema>({
                resolver:  zodResolver(zConstructorSchema),
            })
}


export const {useCreate} = constructorSchema;