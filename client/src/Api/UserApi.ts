import { RootState } from "@/store/store";
import { IBook, IUser } from "@/Types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => ({
                method: "GET",
                url: '/users'
            })
        }),
        addNewUser: builder.mutation<IUser, IUser>({
            query: (body) => ({
                method: "POST",
                url: "/users",
                body
            })
        }),
        getUserByName: builder.query<IUser, string>({
            query: (name) => ({
                method: "GET",
                url: `/users?name=${name}`
            })
        }),
        addToCart: builder.mutation<IUser, IUser>({
            query: (user) => ({
                method: "PUT",
                url: `/users/${user.id}`, 
                body: user
            })
        })
    })
});

// Экспортируем хуки
export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useGetUserByNameQuery,
    useAddToCartMutation
} = userApi;

export default userApi;