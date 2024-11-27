import { IBook } from "@/Types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getBooks: builder.query<IBook[], void>({
            query: () => '/books',
            transformResponse: (response: IBook[]) => {
                localStorage.setItem('books', JSON.stringify(response));
                return response;
            },
        }),
        getBookByTitle: builder.query<IBook | undefined, string>({
            query: (title) => `/books?title=${title}`,
            transformResponse: (response: IBook[]) => {
                if (response.length > 0) return response[0];
                return undefined;
            },
        }),
        addNewBook: builder.mutation<IBook, IBook>({
            query: (body) => ({
                method: "POST",
                url: '/books',
                body,
            }),
        }),
        removeBook: builder.mutation<IBook, number>({
            query: (id) => ({
                method: "DELETE",
                url: `/books/${id}`,
            }),
        }),
        updateBook: builder.mutation<IBook, IBook>({
            query: (book) => ({
                method: "PUT",
                url: `/books/${book.id}`,
                body:book
            }),
        }),
    }),
});

export const { useGetBooksQuery, useGetBookByTitleQuery,useRemoveBookMutation,useUpdateBookMutation } = BookApi;
export default BookApi;