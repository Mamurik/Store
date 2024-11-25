"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderUp from "../HeaderUp/HeaderUp";
import { useRemoveToCartMutation } from "@/Api/UserApi";
import { setUser } from "@/store/Slices/UserSlice";
import { IUser } from "@/Types/types";

const UserCart = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [removeToCart] = useRemoveToCartMutation();
  const dispatch = useDispatch();

  const handleRemove = async (index: number) => {
    try {
      if (user) {
        const updatedCart = [...(user.cart || [])];
        updatedCart.splice(index, 1);

        const userItemToCart: IUser = {
          id: user.id,
          name: user.name,
          password: user.password,
          role: user.role,
          cart: updatedCart,
        };

        const updatedUser = await removeToCart(userItemToCart).unwrap();

        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      console.error("Ошибка удаления из корзины:", error);
    }
  };

  const handleTotalPrice = () => {
    let totalPrice: number = 0;
    (user?.cart || []).forEach((item) => {
      totalPrice += item.price;
    });
    return Math.round(totalPrice * 100) / 100;
  };

  const totalPrice = handleTotalPrice();
  const isCartEmpty = !(user?.cart && user.cart.length > 0);

  return (
    <div className="bg-orange-300 border min-h-screen">
      <HeaderUp />
      <div className="bg-orange-100 flex flex-col justify-center items-center py-10">
        <h1 className="text-center text-black text-2xl font-bold mb-5">
          Корзина пользователя: {user?.name || "Пользователь не найден"}
        </h1>

        <h1 className="text-center text-black text-2xl font-bold mb-5">
          {isCartEmpty ? "Корзина пуста" : `На сумму ${totalPrice} $`}
        </h1>
        {isCartEmpty && (
          <img src="cartIsEmpty.png " alt="" className="w-[208px] " />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto p-5">
          {isCartEmpty ? (
            <p></p>
          ) : (
            (user.cart || []).map((cartItem, index) => (
              <div
                className="bg-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center"
                key={index}
              >
                <img
                  className="max-w-[200px] h-auto rounded-md mb-3"
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
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-200"
                >
                  Удалить из корзины
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCart;
