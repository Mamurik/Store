"use client";
import { IBook, IUser } from "@/Types/types";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "@/Api/UserApi";
import { setUser } from "@/store/Slices/UserSlice";
import { RootState } from "@/store/store";

interface BookItemProps {
  book: IBook;
  openModal: () => void;
  handleDelete: () => void;
}

const BookItem: FC<BookItemProps> = ({ book, openModal, handleDelete }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [addToCart] = useAddToCartMutation();

  const handleAdd = async (id: number) => {
    try {
      if (user) {
        const updatedCart = [...(user.cart ?? []), book];
        const userItemToCart: IUser = {
          id: user.id,
          name: user.name,
          password: user.password,
          role: user.role,
          cart: updatedCart,
        };

        const updatedUser = await addToCart(userItemToCart).unwrap();
        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="flex justify-center mt-5 h-[300px]" key={book.id}>
      <img className="max-w-[220px]" src={book.img} alt={book.title} />
      <div className="mt-[26px] max-w-[200px] mb-3">
        <p className="text-black mb-3 text-xl font-bold">{book.title}</p>
        <p className="text-black mb-3">By {book.author}</p>
        <p className="max-w-[600px] text-black mb-3">{book.desc}</p>

        <button
          onClick={() => handleAdd(book.id)}
          className="text-black mb-3 bg-green-800 text-white p-3 w-35 border rounded-xl"
        >
          {book.price} $
        </button>
      </div>{" "}
      {user?.role === "admin" && (
        <div className="flex justify-center flex-col max-w[100px] mt-10">
          <button
            onClick={openModal}
            className="text-black mb-3 border border-black p-3 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-black mb-3 border border-black p-3 rounded-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookItem;
