"use client";
import { setIsAuth } from "@/store/Slices/UserSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HeaderUp = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

  const dispatch = useDispatch();
  console.log(isAuth);

  return (
    <div className=" flex justify-between items-center p-10 max-w-[1500px] w-full mx-auto bg-opacity-80 z-10 relative  ">
      <div className="flex ">
        <Link href={"/"}>
          <h1 className="text-black text-2xl mr-[20px] font-bold">MYBOOK</h1>
        </Link>
        <h1 className="text-black mr-[20px]">|</h1>
        <Link href={"/Cart"} className="relative">
          <img src="cart.png" alt="Cart" />
          <p className="absolute top-4 left-5 text-xs text-blue-600 font-bold border rounded-full bg-gray-300 pl-2 pr-2 pt-1 pb-1">
            {user?.cart?.length}
          </p>
        </Link>
        {isAuth && (
          <div className="text-black ml-2 text-lg flex align-center justify-center">
            <img className="w-8 ml-5" src="user.png" alt="" />
            <p className="ml-2">{user?.name}</p>
          </div>
        )}
      </div>
      <div>
        <Link className="text-white mr-[20px] text-lg" href={"/users"}>
          Users
        </Link>
        <Link className="text-white mr-[20px] text-lg" href={"/reviews"}>
          Reviews
        </Link>
        {isAuth ? (
          <Link
            href={"/"}
            className="text-black py-[14px] px-[60px] bg-white border border-black-500 rounded-full text-xl font-bold"
            onClick={() => dispatch(setIsAuth(false))}
          >
            Log out
          </Link>
        ) : (
          <Link
            href={"/Auth"}
            className="text-black py-[14px] px-[60px] bg-white border border-black-500 rounded-full text-xl font-bold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderUp;
