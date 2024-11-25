"use client";
import { useGetUsersQuery } from "@/Api/UserApi";
import React from "react";
import MyHeader from "../UI/MyHeader/MyHeader";
import HeaderUp from "../HeaderUp/HeaderUp";

const UsersList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  return (
    <div className="bg-orange-300 min-h-screen ">
      <HeaderUp></HeaderUp>
      <div className=" bg-orange-100 p-10 border rounded-xl flex justify-center align-center  ">
        {users?.map((user) => (
          <div
            key={user.id}
            className="border m-10 bg-gray-300 rounded-xl min-w-[200px] max-w-[200px] flex justify-center flex-col p-5"
          >
            <p className="text-blue-500 text-xl">{user.name}</p>
            <p className="text-green-500 text-xl">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
