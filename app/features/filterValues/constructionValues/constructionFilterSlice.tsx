import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    condominumInformations: string[],
    constructionInformations: string[],
    bathrooms: number,
    garages: number
}

const initialState: InitialState = {
    condominumInformations: [],
    constructionInformations: [],
    bathrooms: 0,
    garages: 0
}

const constructionFilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterValues: (state, action: PayloadAction<Partial<InitialState>>) => {
            return {...state,...action.payload }
        },
        resetFilterValues: (state) => initialState,
    }
})

export const {setFilterValues, resetFilterValues} = constructionFilterSlice.actions

export default constructionFilterSlice.reducer
