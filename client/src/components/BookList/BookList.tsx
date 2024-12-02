"use client";
import {
  useGetBooksQuery,
  useRemoveBookMutation,
  useUpdateBookMutation,
} from "@/Api/BookApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";
import BookItem from "../BookItem/BookItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IBook } from "@/Types/types";
import AdminModal from "../AdminModal/AdminModal";
import { setBooks } from "@/store/Slices/BooksSlice";

interface BookListProps {}

const BookList: FC<BookListProps> = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.books.books) || [];
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
      dispatch(setBooks(JSON.parse(cachedBooks)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (apiBooks) {
      dispatch(setBooks(apiBooks));
    }
  }, [apiBooks, dispatch]);

  if (isBooksError) return <div>Error finding books</div>;
  if (isBooksLoading) return <Loader />;

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
      dispatch(setBooks(books.filter((book) => book.id !== bookId)));
    } catch (error) {
      console.error("Failed to delete the book: ", error);
    }
  };

  const handleOpenModal = (book: IBook) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleSaveBook = async (updatedBook: IBook) => {
    try {
      const result = await updateBook(updatedBook).unwrap();
      dispatch(
        setBooks(books.map((book) => (book.id === result.id ? result : book)))
      );
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-2 bg-white mt-[90px] w-[1400px] border  rounded-xl mb-5">
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
        <div className="flex justify-center items-center mt-20">
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
