export type PropertyType = {
    areaPrivativa: string,
    bairro: string,
    cidade: string,
    codigoImovel: string,
    construtora: string,
    construtoraVal: string,
    dataEntregaEmpreendimento: string,
    descricao: string,
    id: number,
    imagensUrl: string[],
    informacoesEmpreendimento: string[],
    informacoesImovel: string[],
    informacoesLazer: string[],
    localizacaoMaps: string,
    mobiliado: boolean,
    nomeCondominio?: string,
    numeroAnunciante: string[],
    nomeCondominioVal?: "",
    numeroRua: string,
    preco: number,
    quartos: number,
    suites: number,
    tipoDoImovel: string,
    video: string,
    perfil: string[]
    vagas: number,
    bairroVal: string,
    cidadeVal: string,
    numeroLocal: number,
    imagensPlanta: string[],
    bathrooms: number,
    caracteristicasCondominio: string[],
    caracteristicasImovel: string[],
    localizacao: {
        latitude: number,
        longitude: number
    },
    createdBy: string
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
}

export type CondominumsType = {
    nome: string,
    nomeVal: string
}

export type ConstructorsType = {
    nome: string,
    nomeVal: string
}

export type Construtora = {
    nome: string,
    nomeVal: string,
    createdBy: string
}