"use client";
import { useGetBooksQuery } from "@/Api/BookApi";
import React from "react";

const MyLeftBar = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <div></div>;
  if (isError) return <div>Error</div>;

  const uniqueGenres = Array.from(new Set(books?.map((book) => book.genre)));

  return (
    <div className="max-w-[400px] mt-[90px] ml-[85px]">
      <h1 className="text-2xl font-bold text-black mb-4">Books By Genre</h1>
      <ul>
        <li className="text-black mb-3">All</li>
        {uniqueGenres.map((genre, index) => (
          <li key={index} className="text-black mb-3">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyLeftBar;
