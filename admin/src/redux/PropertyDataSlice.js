import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    properties : []
}

const PropertyDataSlice = createSlice({
    name: "PropertyDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            state.properties = []
        },
        handlePostProperty : (state, action) =>{
            state.properties.push(action.payload)
        },
        handleGetProperty : (state, action) =>{
            state.properties = action.payload
        },
        handleUpdateProperty : (state, action) =>{
            const index = state.properties.findIndex((property) => property._id === action.payload._id)
            state.properties[index] = action.payload
        },
        handleDeleteProperty : (state, action) =>{
            state.properties = state.properties.filter((property) => property._id !== action.payload._id)
        }   
    }
})

export default PropertyDataSlice.reducer;
export const {resetState, handlePostProperty, handleGetProperty, handleUpdateProperty, handleDeleteProperty} = PropertyDataSlice.actions;