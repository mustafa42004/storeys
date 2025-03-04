import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    admin: {},
    homeBanner : {},
    counter : {},
    slider : [],
    workProcess : {},
    service : [],
}


const AdminDataSlice = createSlice({
    name: "adminDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handlePostCounter : (state, action) =>{
            state.counter = action.payload
        },
        handlePostBanner : (state, action) =>{
            const {mainHeading} = action.payload
            state.homeBanner.banner = mainHeading
        },
        handlePostService : (state, action) =>{ 
            console.log(action.payload)
            state.service = action.payload

        },
    }
})




export default AdminDataSlice.reducer;
export const {resetState, handlePostCounter, handlePostBanner, handlePostService} = AdminDataSlice.actions;