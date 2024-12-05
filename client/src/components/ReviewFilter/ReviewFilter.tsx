"use client";
import { RootState } from "@/store/store";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

interface ReviewFilterProps {
  onFilter: (filter: string) => void;
}

const ReviewFilter: FC<ReviewFilterProps> = ({ onFilter }) => {
  const [input, setInput] = useState<string>("");

  const filterReviews = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onFilter(value);
  };

  return (
    <input
      value={input}
      onChange={filterReviews}
      className="flex justify-between items-center p-10 mx-auto border rounded-xl relative pl-10 mt-10 max-w-[1200px] border-none h-10 w-96 focus:outline-none focus:ring-0"
      placeholder="Filter by Book Name"
    />
  );
};

export default ReviewFilter;
