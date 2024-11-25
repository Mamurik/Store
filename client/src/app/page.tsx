import BookList from "@/components/BookList/BookList";
import MainPage from "@/components/MainPage/MainPage";
import MyFooter from "@/components/MyFooter/MyFooter";
import MyHeader from "@/components/UI/MyHeader/MyHeader";
import MyLeftBar from "@/components/UI/MyLeftBar/MyLeftBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <MyHeader></MyHeader>
      <MainPage></MainPage>
      <MyFooter></MyFooter>
    </div>
  );
}
