"use client";
import { useGetBooksQuery } from "@/Api/BookApi";
import { useGetReviewsQuery } from "@/Api/ReviewApi";
import React from "react";
import Loader from "../UI/Loader/Loader";
import { useGetUsersQuery } from "@/Api/UserApi";
import HeaderUp from "../HeaderUp/HeaderUp";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ReviewsList = () => {
  const userAuth = useSelector((state: RootState) => state.user.user);
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetReviewsQuery();
  const {
    data: books,
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useGetBooksQuery();
  const {
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUsersQuery();
  if (isReviewsLoading || isBooksLoading || isUserLoading) {
    return <Loader />;
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-200 ">
      <div className="bg-orange-300">
        <HeaderUp />
      </div>
      {}
      {reviews?.map((review) => {
        const book = books?.find((b) => b.id === review.bookId);
        const user = users?.find((u) => u.id === review.userId);
        return (
          <div
            key={review.id}
            className="border border-black rounded-xl p-4 border-b"
          >
            {book ? (
              <div>
                <img src={book.img} alt={book.title} className="w-32 h-48" />
                <h1 className="text-lg font-bold">{book.author}</h1>
                <h1 className="text-lg">{book.title}</h1>
                <h1 className="text-lg">{book.price} $</h1>
              </div>
            ) : (
              <h2>Книга не найдена</h2>
            )}
            <h1 className="mt-2">Отзыв: {review.comment}</h1>

            {user ? (
              <div className="mt-2">
                {userAuth?.name === user.name ? (
                  <h2>Ваш Коментарий</h2>
                ) : (
                  <h2>Коментарий пользователя: {user.name}</h2>
                )}
              </div>
            ) : null}
            <div className="flex items-center mt-2">
              {renderStars(review.rating)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsList;
