"use client";
import React from "react";
import MyLeftBar from "../UI/MyLeftBar/MyLeftBar";
import BookList from "../BookList/BookList";

const MainPage = () => {
  return (
    <div className="flex justify-between  bg-custom-gray">
      <MyLeftBar></MyLeftBar>
      <BookList></BookList>
    </div>
  );
};

export default MainPage;
