import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    teams : []
}

const TeamDataSlice = createSlice({
    name: "teamDataSlice",

    initialState,
    reducers : {
        resetState : (state) =>{
            state.teams = []
        },
        handlePostTeam : (state, action) =>{
            state.teams.push(action.payload)
        },
        handleGetTeam : (state, action) =>{
            state.teams = action.payload
        },
        handleUpdateTeam : (state, action) =>{
            const index = state.teams.findIndex((team) => team._id === action.payload._id)
            state.teams[index] = action.payload
        },
        handleDeleteTeam : (state, action) =>{
            state.teams = state.teams.filter((team) => team._id !== action.payload._id)
        }   
    }
})

export default TeamDataSlice.reducer;
export const {resetState, handlePostTeam, handleGetTeam, handleUpdateTeam, handleDeleteTeam} = TeamDataSlice.actions;