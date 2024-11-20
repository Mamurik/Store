"use client";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import { setIsAuth } from "@/store/Slices/UserSlice";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <div>
      {!isAuth ? (
        isRegistering ? (
          <Register onSwitchToLogin={handleSwitchToLogin} />
        ) : (
          <Login onSwitchToRegister={handleSwitchToRegister} />
        )
      ) : (
        <div>
          <h1 className="text-xl text-white">
            Вы уже авторизованы, хотите выйти?
          </h1>
          <button onClick={() => dispatch(setIsAuth(false))}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default Page;
