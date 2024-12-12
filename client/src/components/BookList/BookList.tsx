"use client";
import React, { FC, useEffect, useState } from "react";
import {
  useGetBooksQuery,
  useRemoveBookMutation,
  useUpdateBookMutation,
} from "@/Api/BookApi";
import Loader from "../UI/Loader/Loader";
import BookItem from "../BookItem/BookItem";
import AdminModal from "../AdminModal/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IBook } from "@/Types/types";
import { setBooks } from "@/store/Slices/BooksSlice";
import { setCurrentPage } from "@/store/Slices/PaginationSlice";

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

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const ITEMS_PER_PAGE = useSelector(
    (state: RootState) => state.pagination.itemsPerPage
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

  // Пагинация
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    } catch (error) {
      console.error("Failed to update the book: ", error);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="bg-white mt-[90px] w-[1400px] border pb-[90px] rounded-xl mb-5">
      <div className="grid grid-cols-4 justify-center">
        {paginatedBooks.length > 0 ? (
          paginatedBooks.map((book) => (
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
      </div>

      {/* Пагинация */}
      <div className="flex justify-center mt-5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-md text-white ${
              currentPage === index + 1 ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

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
