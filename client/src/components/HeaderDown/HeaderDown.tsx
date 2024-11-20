"use client";
import { setSearchBook } from "@/store/Slices/SearchSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";

const HeaderDown = () => {
  const dispatch = useDispatch();
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );
  return (
    <div className=" flex  flex-col  max-w-[1500px] p-10 w-full mx-auto bg-opacity-80 z-10 relative ">
      <div className="">
        <h1 className="text-black font-bold text-[75px] max-w-[600px] mb-[15px]">
          READ AND ADD YOUR INSIGHT
        </h1>
        <p className="text-black font-bold mb-[25px] text-[25px]">
          Find Your Favorite Book And Read It Here For Free
        </p>
        <div className="flex align-center p-3 text-black w-96 border border-black-500 relative">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6"
            src="search.png"
            alt="Search Icon"
          />
          <input
            className="pl-10 border-none w-96 focus:outline-none focus:ring-0 "
            placeholder="Search book"
            type="text"
            name=""
            id=""
            value={searchString}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setSearchBook(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderDown;
