"use client";
import { IBook, IUser } from "@/Types/types";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "@/Api/UserApi";
import { setUser } from "@/store/Slices/UserSlice";
import { RootState } from "@/store/store";
import classes from "./BookItem.module.css";

interface BookItemProps {
  book: IBook;
  openModal?: () => void;
  handleDelete?: () => void;
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
    <div className={classes.cardContainer} key={book.id}>
      <div className={classes.card}>
        <div className={classes.cardFront}>
          <img className={classes.bookImage} src={book.img} alt={book.title} />
          <div className={classes.bookDetails}>
            <p className={classes.bookTitle}>{book.title}</p>
            <p className={classes.bookAuthor}>By {book.author}</p>
            <p className={classes.bookDescription}>{book.desc}</p>
            <p className="text-green-500 mb-10">{book.price} $</p>
          </div>
        </div>
        <div className={classes.cardBack}>
          <div className="flex flex-col items-center">
            <p className="text-green-500 mr-5 mb-4">{book.price} $</p>
            <button
              onClick={() => handleAdd(book.id)}
              className={classes.bookPriceButton}
            >
              Add to Cart
            </button>
            {user?.role === "admin" && (
              <div className={classes.adminActions}>
                <button onClick={openModal} className={classes.editButton}>
                  Edit
                </button>
                <button onClick={handleDelete} className={classes.deleteButton}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
