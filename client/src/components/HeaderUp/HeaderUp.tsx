import Link from "next/link";
import React from "react";

const HeaderUp = () => {
  return (
    <div className=" flex justify-between items-center p-10 max-w-[1500px] w-full mx-auto bg-opacity-80 z-10 relative  ">
      <div className="flex ">
        <Link href={"/"}>
          <h1 className="text-black text-2xl mr-[20px] font-bold">MYBOOK</h1>
        </Link>
        <h1 className="text-black mr-[20px]">|</h1>
        <Link href={"/cart"}>
          <img src="cart.png" alt="Cart" />
        </Link>
      </div>
      <div>
        <Link className="text-white mr-[20px] text-lg" href={"/books"}>
          Books
        </Link>
        <Link className="text-white mr-[20px] text-lg" href={"/users"}>
          Users
        </Link>
        <Link className="text-white mr-[20px] text-lg" href={"/reviews"}>
          Reviews
        </Link>
        <Link
          href={"/Auth"}
          className="text-black py-[14px] px-[60px] bg-white border border-black-500 rounded-full text-xl font-bold"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HeaderUp;
