import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://servicodados.ibge.gov.br/api/v1/localidades/"
    }),
    endpoints: (builder) => ({
        getStates: builder.query<string[], string>({
            query: () => '/estados'
        })
        ,
        getCities: builder.query<string[], string>({
            query: (uf) => `estados/${uf}/municipios`,
            // transformResponse: (r: any[]) => r.map((city) => city.name)
        }),
        getBairros: builder.query<any, string>({
            query: (cidade) => `municipios/${cidade}/distritos`,
          }),
    })
})

export const {useGetBairrosQuery, useGetCitiesQuery, useGetStatesQuery} = apiSlice