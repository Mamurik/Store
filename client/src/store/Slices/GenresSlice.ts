import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGenres  {
    genres:string[],
    selectedGenre:string | null
}
const initialState:IGenres ={
    genres:[],
    selectedGenre:null
} 

    const genreSlice = createSlice({
    name:'Genres',
    initialState,
    reducers:{
        setGenres:(state,action:PayloadAction<string[]>)=>{
            state.genres = action.payload
        },
        setSelectedGenre:(state,action:PayloadAction<string>)=>{
            state.selectedGenre = action.payload
        }
    }
})
export const {setGenres,setSelectedGenre} = genreSlice.actions
export default genreSlice.reducer