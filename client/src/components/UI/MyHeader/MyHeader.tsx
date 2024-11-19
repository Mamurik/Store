import React from "react";
import Link from "next/link";
import HeaderUp from "@/components/HeaderUp/HeaderUp";
import HeaderDown from "@/components/HeaderDown/HeaderDown";
const MyHeader = () => {
  return (
    <header className=" h-[650px]">
      <HeaderUp></HeaderUp>
      <HeaderDown></HeaderDown>
      <img
        src="grapich.png"
        alt=""
        className="absolute top-0 right-0 h-full z-0 w-[700px] max-h-[650px]"
      />
    </header>
  );
};

export default MyHeader;
