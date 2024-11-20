"use client";
import { useGetUserByNameQuery, useGetUsersQuery } from "@/Api/UserApi";
import { setIsAuth, setUser } from "@/store/Slices/UserSlice";
import { RootState } from "@/store/store";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface LoginProps {
  onSwitchToRegister: () => void;
}
const Login: FC<LoginProps> = ({ onSwitchToRegister }) => {
  const { data: users } = useGetUsersQuery();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const router = useRouter();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let isAuthenticated = false;

    users?.forEach((user) => {
      if (user.name === name && user.password === password) {
        isAuthenticated = true;
        dispatch(setIsAuth(true));
        dispatch(setUser(user));
        console.log("Вы успешно вошли под аккаунтом " + name);
        router.push("/");
      }
    });

    if (!isAuthenticated) {
      console.log("Не правильно ввели пароль или логин");
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      {!isAuth && (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Вход
          </h1>
          <input
            className="w-full p-4 border border-gray-300 text-black rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            type="text"
            placeholder="Имя пользователя"
          />
          <input
            className="w-full p-4 border border-gray-300 text-black rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            placeholder="Пароль"
          />
          <button
            className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
            onClick={handleLogin}
          >
            Войти
          </button>
          <button
            className="w-full py-3 mt-4 bg-gray-200 text-black font-bold rounded hover:bg-gray-300 transition duration-200"
            onClick={onSwitchToRegister}
          >
            Нет аккаунта? Зарегестритуйтесь
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
