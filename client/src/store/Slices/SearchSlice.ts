import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearch {
    searchString:string
}
const initialState:ISearch = {
    searchString:''
}

const SearchSlice = createSlice({
    name:"searchBooks",
    initialState,
    reducers:{
        setSearchBook:(state,action:PayloadAction<string>)=>{
            state.searchString = action.payload
        }
    } 
})

export const {setSearchBook} = SearchSlice.actions
export default SearchSlice.reducer