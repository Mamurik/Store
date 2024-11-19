import { useGetUsersQuery } from "@/Api/UserApi";
import { IUser } from "@/Types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice{
    users:IUser | null
}
const initialState:IUserSlice = {
    users:null
}

const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
          setUser:(state,action:PayloadAction<IUser>)=>{
             state.users = action.payload
          },
          
    }    
})
export const {setUser} = userSlice.actions
export default userSlice.reducer