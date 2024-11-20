"use client";
import { useGetBooksQuery } from "@/Api/BookApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";
import BookItem from "../BookItem/BookItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IBook } from "@/Types/types";

interface BookListProps {}

const BookList: FC<BookListProps> = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const {
    data: apiBooks,
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useGetBooksQuery();

  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );

  useEffect(() => {
    const cachedBooks = localStorage.getItem("books");
    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks));
    }
  }, []);

  useEffect(() => {
    if (apiBooks) {
      setBooks(apiBooks);
    }
  }, [apiBooks]);

  if (isBooksError) return <div>Error finding books</div>;
  if (isBooksLoading && books.length === 0) return <Loader />;

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 bg-white mt-[90px] w-[1400px] border border-black-500 rounded-xl">
      {filteredBooks && filteredBooks.length > 0 ? (
        filteredBooks.map((book) => <BookItem book={book} key={book.id} />)
      ) : (
        <div className="flex justify-center align-center mt-20">
          <h1 className="text-center text-3xl text-black">No books found</h1>
        </div>
      )}
    </div>
  );
};

export default BookList;
