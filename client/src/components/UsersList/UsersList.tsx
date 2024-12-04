"use client";
import { useGetUsersQuery } from "@/Api/UserApi";
import React from "react";
import MyHeader from "../UI/MyHeader/MyHeader";
import HeaderUp from "../HeaderUp/HeaderUp";

const UsersList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  return (
    <div className="bg-gray-200 min-h-screen ">
      <div className="bg-orange-300">
        <HeaderUp />
      </div>

      <div className="  p-10 border rounded-xl flex justify-center align-center  ">
        {users?.map((user) => (
          <div
            key={user.id}
            className="border m-10 bg-orange-200 rounded-xl min-w-[200px] max-w-[200px] flex justify-center flex-col p-5"
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
