"use client";
import { useGetUserByNameQuery, useGetUsersQuery } from "@/Api/UserApi";
import { setIsAuth, setUser } from "@/store/Slices/UserSlice";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Login = () => {
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
    <div className="bg-gray-200 ">
      <h1 className="text-xl text-black">Login</h1>
      {!isAuth && (
        <div className="max-w-[200px] flex align-center justify-center flex-col">
          <input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            type="text"
            placeholder="Username"
          />
          <input
            className="text-xl text-black width-[400px]"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            placeholder="Password"
          />
          <button
            className="text-xl text-black border border-black-[3px]"
            onClick={handleLogin}
          >
            LogIn
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
