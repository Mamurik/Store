import { useGetUsersQuery } from "@/Api/UserApi";
import { IUser } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice{
    user:IUser | null,
    isAuth: boolean
}
const initialState:IUserSlice = {
    user:null,
    isAuth:false
}

const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
          setUser:(state,action:PayloadAction<IUser>)=>{
             state.user = action.payload
          },
          setIsAuth:(state,action:PayloadAction<boolean>)=>{
            state.isAuth = action.payload
         },
          
    }    
})
export const {setUser,setIsAuth}  = userSlice.actions
export default userSlice.reducer