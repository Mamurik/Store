import { IUser } from "@/Types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const userApi = createApi({
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    endpoints:(builder)=>({
        getUsers:builder.query<IUser[],void>({
          query:()=> ({
            method:"GET",
            url:'/users'
          })
        }),
        addNewUser:builder.mutation<IUser,IUser>({
            query:(body)=>({
                method:"POST",
                url:"/users",
                body
            })
        })
    })
})

export const {useGetUsersQuery,useAddNewUserMutation} = userApi
export default userApi