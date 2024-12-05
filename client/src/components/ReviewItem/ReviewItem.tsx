import { IBook, IReview, IUser } from "@/Types/types";
import { url } from "inspector";
import React, { FC } from "react";

interface ReviewItemProps {
  book: IBook | undefined;
  review: IReview;
  user: IUser | undefined;
  userAuth: IUser | null;
  renderStars: (numb: number) => React.ReactNode;
}

const ReviewItem: FC<ReviewItemProps> = ({
  book,
  review,
  renderStars,
  user,
  userAuth,
}) => {
  return (
    <div className="m-5  flex flex-col items-center bg-white shadow-md rounded-lg w-[400px] mx-auto ">
      {book ? (
        <div className="flex flex-col items-center p-4 rounded-lg mb-2">
          <img
            src={book.img}
            alt={book.title}
            className="w-32 h-48 mb-2 max-w-[130px] rounded"
          />
          <h1 className="text-lg font-bold">{book.title}</h1>
          <h1 className="text-lg">{book.author}</h1>
          <h1 className="text-lg">{book.price} $</h1>
        </div>
      ) : (
        <h2 className="text-red-500">Книга не найдена</h2>
      )}
      <h1 className="mt-2 text-sm italic">Отзыв: {review.comment}</h1>

      {user ? (
        <div className="mt-2 text-sm">
          {userAuth?.name === user.name ? (
            <h2 className="font-semibold">Ваш Комментарий</h2>
          ) : (
            <h2 className="font-semibold">
              Комментарий пользователя: {user.name}
            </h2>
          )}
        </div>
      ) : null}
      <div className="flex items-center mt-2 mb-4">
        {renderStars(review.rating)}
      </div>
    </div>
  );
};

export default ReviewItem;
