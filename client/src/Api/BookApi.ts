import { IBook } from "@/Types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const BookApi = createApi({
    reducerPath:'bookApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    endpoints:(builder)=>({
        getBooks: builder.query<IBook[],void>({
             query:()=>({
                method:"GET",
                url:'/books'
             })
        }),
        getBookByTitle: builder.query<IBook | undefined, string>({
            query: (title) => `/books?title=${title}`, 
        }),
        addNewBook: builder.mutation<IBook,IBook>({
            query:(body)=>({
                method:"POST",
                url:'/books',
                body
            })
        }),
        removeBook:builder.mutation<IBook,number>({
            query:(id)=>({
                method:"DELETE",
                url:`/books${id}`
            })
        })
        
    })
})


export const {useGetBooksQuery,useGetBookByTitleQuery} = BookApi
export default BookApi