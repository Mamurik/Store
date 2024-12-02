import { IBook } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBooksSlice{
    books:IBook[] | null
}

const initialState:IBooksSlice = {
    books:[]
}
const BooksSlice = createSlice({
     name:"books",
     initialState,
     reducers:{
        setBooks:(state,action:PayloadAction<IBook[]>)=>{
            state.books = action.payload
         },
     }

})

export const {setBooks} = BooksSlice.actions
export default BooksSlice.reducer