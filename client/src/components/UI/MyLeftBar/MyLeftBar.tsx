"use client";
import { useAddNewBookMutation, useGetBooksQuery } from "@/Api/BookApi";
import AddModal from "@/components/AdminModal/AddModal";
import { setBooks } from "@/store/Slices/BooksSlice";
import { setGenres, setSelectedGenre } from "@/store/Slices/GenresSlice";
import { RootState } from "@/store/store";
import { IBook } from "@/Types/types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyLeftBar = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const bookes = useSelector((state: RootState) => state.books.books);
  const [addBook] = useAddNewBookMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.genres.genres);
  const selectedGenre = useSelector(
    (state: RootState) => state.genres.selectedGenre
  );

  useEffect(() => {
    if (books) {
      const uniqueGenres = Array.from(new Set(books.map((book) => book.genre)));
      dispatch(setGenres(uniqueGenres));
    }
  }, [books, dispatch]);

  const handleSelect = (genre: string) => {
    dispatch(setSelectedGenre(genre));
  };

  const handleAddBook = async (newBook: IBook) => {
    try {
      const result = await addBook(newBook).unwrap();
      const updatedBooks = [...(bookes || []), result];
      dispatch(setBooks(updatedBooks));
    } catch (error) {
      console.error("Failed to add the book: ", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="max-w-[400px] mt-[90px] ml-[85px]">
      {openModal && (
        <AddModal onAdd={handleAddBook} onClose={() => setOpenModal(false)} />
      )}
      {user?.role === "admin" && (
        <button
          onClick={() => setOpenModal(true)}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Add New Book
        </button>
      )}
      <h1 className="text-2xl font-bold text-black mb-4">Books By Genre</h1>
      <ul>
        <li
          onClick={() => handleSelect("")}
          className={`text-black mb-3 cursor-pointer ${
            selectedGenre === "" ? "font-bold text-orange-500" : ""
          }`}
        >
          All
        </li>
        {genres.map((genre, index) => (
          <li
            onClick={() => handleSelect(genre)}
            key={index}
            className={`text-black mb-3 cursor-pointer ${
              selectedGenre === genre ? "font-bold text-orange-500" : ""
            }`}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLeftBar;
