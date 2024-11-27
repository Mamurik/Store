"use client";
import {
  useGetBooksQuery,
  useRemoveBookMutation,
  useUpdateBookMutation,
} from "@/Api/BookApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";
import BookItem from "../BookItem/BookItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IBook } from "@/Types/types";
import AdminModal from "../AdminModal/AdminModal";

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

  const selectedGenre = useSelector(
    (state: RootState) => state.genres.selectedGenre
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [removeBook] = useRemoveBookMutation();
  const [updateBook] = useUpdateBookMutation();

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

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchString.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  const handleDelete = async (bookId: number) => {
    try {
      await removeBook(bookId).unwrap();
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Failed to delete the book: ", error);
    }
  };

  const handleOpenModal = (book: IBook) => {
    setSelectedBook(book);
    setOpenModal(true);
  };
  const handleSaveBook = async (updatedBook: IBook) => {
    await updateBook(updatedBook).unwrap();
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };
  return (
    <div className="grid grid-cols-2 bg-white mt-[90px] w-[1400px] border border-black-500 rounded-xl mb-5">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <BookItem
            handleDelete={() => handleDelete(book.id)}
            openModal={() => handleOpenModal(book)}
            book={book}
            key={book.id}
          />
        ))
      ) : (
        <div className="flex justify-center align-center mt-20">
          <h1 className="text-center text-3xl text-black">No books found</h1>
        </div>
      )}
      {openModal && selectedBook && (
        <AdminModal
          onSave={handleSaveBook}
          book={selectedBook}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default BookList;
