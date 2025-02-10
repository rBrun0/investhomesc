import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const defaultValues = z.object({
    telOne: z.string().regex(/^[0-9]+$/, "Apenas números")
    .min(13, {message: "Mínimo de 13 dígitos"})
    .max(13, {message: "Máximo de 13 dígitos"}),
    telTwo: z.string().regex(/^[0-9]+$/, "Apenas números")
    .min(13, {message: "Mínimo de 11 dígitos"})
    .max(13, {message: "Máximo de 11 dígitos"}),
    neighborhood: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    aboutLocal: z.string(),
    linkWhatsapp: z.string().optional(),
    linkFacebook: z.string().optional(),
    linkInstagram: z.string().optional(),
    linkYoutube: z.string().optional(),
    linkWaze: z.string().optional(),
    linkGoogleMaps: z.string().optional(),
})

export type SchemaType = z.infer<typeof defaultValues>

export const localInfoSchema = {
    useCreate: () =>
        useForm<SchemaType>({
            resolver:  zodResolver(defaultValues) ,
        })
}

export const brasillianState = [
    { label: "AC", value: "AC" },
    { label: "AL", value: "AL" },
    { label: "AP", value: "AP" },
    { label: "AM", value: "AM" },
    { label: "BA", value: "BA" },
    { label: "CE", value: "CE" },
    { label: "DF", value: "DF" },
    { label: "ES", value: "ES" },
    { label: "GO", value: "GO" },
    { label: "MA", value: "MA" },
    { label: "MT", value: "MT" },
    { label: "MS", value: "MS" },
    { label: "MG", value: "MG" },
    { label: "PA", value: "PA" },
    { label: "PB", value: "PB" },
    { label: "PR", value: "PR" },
    { label: "PE", value: "PE" },
    { label: "PI", value: "PI" },
    { label: "RJ", value: "RJ" },
    { label: "RN", value: "RN" },
    { label: "RS", value: "RS" },
    { label: "RO", value: "RO" },
    { label: "RR", value: "RR" },
    { label: "SC", value: "SC" },
    { label: "SP", value: "SP" },
    { label: "SE", value: "SE" },
    { label: "TO", value: "TO" }
  ];