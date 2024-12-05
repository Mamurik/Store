"use client";
import { useGetBooksQuery } from "@/Api/BookApi";
import { useGetReviewsQuery } from "@/Api/ReviewApi";
import React, { useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";
import { useGetUsersQuery } from "@/Api/UserApi";
import HeaderUp from "../HeaderUp/HeaderUp";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ReviewItem from "../ReviewItem/ReviewItem";
import MyFooter from "../MyFooter/MyFooter";
import ReviewFilter from "../ReviewFilter/ReviewFilter";
import { setReviews } from "@/store/Slices/ReviewSlice";

const ReviewsList = () => {
  const [filter, setFilter] = useState<string>("");
  const userAuth = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const {
    data: ApiReviews,
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

  useEffect(() => {
    if (ApiReviews) {
      dispatch(setReviews(ApiReviews));
    }
  }, [ApiReviews, dispatch]);

  const filteredReviews = reviews.filter((review) =>
    books?.some(
      (book) =>
        book.id === review.bookId &&
        book.title.toLowerCase().includes(filter.toLowerCase())
    )
  );

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
    <div
      className="flex flex-col min-h-screen bg-gray-200"
      style={{
        backgroundImage: 'url("ReviewFon.jpg")',
        backgroundRepeat: "repeat",
      }}
    >
      <div className="bg-orange-300">
        <HeaderUp />
      </div>
      <ReviewFilter onFilter={setFilter} />
      <div className="flex-grow p-5 m-0 grid grid-cols-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, i) => {
            const book = books?.find((b) => b.id === review.bookId);
            const user = users?.find((u) => u.id === review.userId);
            return (
              <ReviewItem
                key={i}
                book={book}
                renderStars={renderStars}
                review={review}
                user={user}
                userAuth={userAuth}
              />
            );
          })
        ) : (
          <div className="col-span-4 text-center mt-10">
            <p className="text-lg text-white">No matching books found.</p>
          </div>
        )}
      </div>
      <MyFooter />
    </div>
  );
};

export default ReviewsList;
