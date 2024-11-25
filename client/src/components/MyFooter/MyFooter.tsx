import Link from "next/link";
import React from "react";

const MyFooter = () => {
  return (
    <div className="bg-orange-400">
      <div className=" flex justify-between  items-center p-10 max-w-[1500px] w-full mx-auto  ">
        <Link href={"/"}>
          <h1 className="text-black text-2xl mr-[10px] font-bold">MyBook</h1>
        </Link>
        <div className="flex">
          <Link href={"/users"}>
            <h1 className="text-white text-xl mr-[20px] font-bold">Users</h1>
          </Link>
          <Link href={"/reviews"}>
            <h1 className="text-white text-xl mr-[20px] font-bold">Reviews</h1>
          </Link>
          <Link href={"/Cart"}>
            <h1 className="text-white text-xl mr-[20px] font-bold">Cart</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyFooter;
