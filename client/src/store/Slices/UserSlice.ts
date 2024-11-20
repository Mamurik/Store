import { useGetUsersQuery } from "@/Api/UserApi";
import { IUser } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice{
    users:IUser | null,
    isAuth: boolean
}
const initialState:IUserSlice = {
    users:null,
    isAuth:false
}

const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
          setUser:(state,action:PayloadAction<IUser>)=>{
             state.users = action.payload
          },
          setIsAuth:(state,action:PayloadAction<boolean>)=>{
            state.isAuth = action.payload
         },
          
    }    
})
export const {setUser,setIsAuth}  = userSlice.actions
export default userSlice.reducer