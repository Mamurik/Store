"use client";
import { useAddNewUserMutation, useGetUsersQuery } from "@/Api/UserApi";
import { IUser } from "@/Types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [username, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [addUser] = useAddNewUserMutation();
  const { data: users } = useGetUsersQuery();
  const router = useRouter();

  const handleAddUser = async () => {
    try {
      const newUser: IUser = {
        id: Date.now(),
        name: username,
        password: userPassword,
        role: "user",
        cart: [],
      };

      if (username !== "" && userPassword !== "") {
        const userExists = users?.some((user) => user.name === newUser.name);
        if (!userExists) {
          const result = await addUser(newUser).unwrap();
          router.push("/");
        } else {
          alert("Такой пользователь уже есть");
        }
      } else {
        alert("Имя пользователя и пароль должны быть не пустыми");
      }

      setUserName("");
      setUserPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Регистрация
        </h1>
        <input
          className="w-full p-4 border border-gray-300 text-black rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          type="text"
          placeholder="Имя пользователя"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value);
          }}
        />
        <input
          className="w-full p-4 border border-gray-300 text-black rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userPassword}
          type="password"
          placeholder="Пароль"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserPassword(e.target.value);
          }}
        />
        <button
          className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
          onClick={handleAddUser}
        >
          Зарегистрироваться
        </button>
        <button
          className="w-full py-3 mt-4 bg-gray-200 text-black font-bold rounded hover:bg-gray-300 transition duration-200"
          onClick={onSwitchToLogin}
        >
          Уже есть аккаунт? Войдите
        </button>
      </div>
    </div>
  );
};

export default Register;
