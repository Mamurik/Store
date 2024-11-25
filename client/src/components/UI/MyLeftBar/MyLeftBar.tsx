"use client";
import { useGetBooksQuery } from "@/Api/BookApi";
import { setGenres, setSelectedGenre } from "@/store/Slices/GenresSlice";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyLeftBar = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="max-w-[400px] mt-[90px] ml-[85px]">
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
