"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import HeaderUp from "../HeaderUp/HeaderUp";

const UserCart = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="bg-orange-300 min-h-screen">
      <HeaderUp />
      <div className="bg-white flex flex-col justify-center items-center py-10">
        <h1 className="text-center text-black text-2xl font-bold mb-5">
          Корзина пользователя: {user?.name || "Пользователь не найден"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto p-5">
          {user?.cart && user.cart.length > 0 ? (
            user.cart.map((cartItem, index) => (
              <div
                className="bg-orange-200 rounded-lg shadow-lg p-4 flex flex-col items-center"
                key={index}
              >
                <img
                  className="max-w-full h-auto rounded-md mb-3"
                  src={cartItem.img}
                  alt={cartItem.title}
                />
                <h2 className="text-black mb-2 text-xl font-bold">
                  {cartItem.title}
                </h2>
                <p className="text-gray-700 mb-1">By {cartItem.author}</p>
                <p className="text-gray-600 mb-3">{cartItem.desc}</p>
                <p className="font-bold text-green-500 mb-3">
                  {cartItem.price} $
                </p>
                <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-200">
                  Удалить из корзины
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">Корзина пуста</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCart;
