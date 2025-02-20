export type PropertyType = {
    rua: string,
    areaPrivativa: string,
    bairro: string,
    cidade: string,
    codigoImovel: string,
    construtora: string,
    construtoraVal: string,
    receiveTime: string,
    descricao: string,
    uid: string,
    imagensUrl: string[],
    informacoesEmpreendimento: string[],
    informacoesImovel: string[],
    informacoesLazer: string[],
    localizacaoMaps: string,
    mobiliado: boolean,
    nomeCondominio?: string,
    numeroAnunciante: string,
    nomeCondominioVal?: "",
    numeroRua: string,
    preco: number | string,
    dormitorios: number,
    suites: number,
    tipoDoImovel: string,
    video: string,
    buildingProfile: string[]
    vagas: number,
    bairroVal: string,
    cidadeVal: string,
    estado: string,
    numeroLocal: number,
    imagensPlanta: string[],
    banheiros: number | string,
    condominumInformations: string[],
    buildingInformations: string[],
    latitude: string,
    longitude: string,
    createdBy: string
    facebookLink?: string,
    instagramLink?: string,
    whatsappLink?: string
}

export type ConstructionsType = {
    id:string
    areaDeLazer: string[],
    areaPrivativa: string,
    bairro: string,
    cidade: string,
    codigo: string,
    dataEntregaEmpreendimento: string,
    caracteristicasCondominio: string[],
    caracteristicasImovel: string,
    descricao: string,
    dormitorios: number,
    estado: string,
    imagens: string[],
    informacoesEmpreendimento: string[],
    informacoesImovel: string[],
    localizacao: {
        latitude: number,
        longitude: number
    },
    numeroLocal: number,
    preco: number,
    registroDeIncorporacao: number,
    rua: string,
    suites: number,
    vagas: number,
    video: string,
    createdBy: string
    facebookLink?: string,
    instagramLink?: string,
    whatsappLink?: string
}

export type CondominumsType = {
    nome: string,
}

export type ConstructorsType = {
    id: string,
    createdBy: string,
    name: string,
}

export type Users = {
    uid: string,
    password: string,
    displayName: string,
    email: string,
    role: string 
}