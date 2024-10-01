import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    cities: string,
    neighborhood: string,
    propertyType: string,
    propertyProfile: string,
    minValue: number,
    maxValue: number,
    bedrooms: number,
    bathrooms: number,
    garages: number,
    constructionCompany: string,
    condominums: string,
    condominumInformations: string[],
    constructorInformations: string[]
}

const initialState: InitialState = {
    cities: '',
    neighborhood: '',
    propertyType: '',
    propertyProfile: '',
    minValue: 0,
    maxValue: 0,
    bedrooms: 0,
    bathrooms: 0,
    garages: 0,
    constructionCompany: '',
    condominums: '',
    condominumInformations: [],
    constructorInformations: []
}

const filterValuesSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterValues: (state, action: PayloadAction<Partial<InitialState>>) => {
            return {...state,...action.payload }
        },
        resetFilterValues: (state) => initialState,
    }
})


export const {setFilterValues, resetFilterValues} = filterValuesSlice.actions

export default filterValuesSlice.reducer
