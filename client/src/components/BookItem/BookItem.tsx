import { IBook } from "@/Types/types";
import React, { FC } from "react";
interface BookItemProps {
  book: IBook;
}
const BookItem: FC<BookItemProps> = ({ book }) => {
  return (
    <div className="flex justify-center mt-5 " key={book.id}>
      <img className="max-w-[220px]" src={book.img} alt="" />
      <div className="mt-[26px] max-w-[200px] mb-3">
        <p className="text-black mb-3 text-xl font-bold">{book.title}</p>
        <p className="text-black mb-3">By {book.author}</p>
        <p className="max-w-[600px] text-black mb-3">{book.desc}</p>
        <button className="text-black mb-3 bg-green-800 text-white p-3 w-35 border rounded-xl">
          {book.price} $
        </button>
      </div>
    </div>
  );
};

export default BookItem;
