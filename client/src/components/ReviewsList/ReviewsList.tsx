"use client";
import { useGetBooksQuery } from "@/Api/BookApi";
import { useAddReviewMutation, useGetReviewsQuery } from "@/Api/ReviewApi";
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
import MyButton from "../UI/MyButton/MyButton";
import ReviewAddModal from "../ReviewAddModal/ReviewAddModal";
import { IReview } from "@/Types/types";

const ReviewsList = () => {
  const [filter, setFilter] = useState<string>("");
  const userAuth = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const [addReview] = useAddReviewMutation();

  const handleAdd = async (newReview: IReview) => {
    try {
      const res = await addReview(newReview).unwrap();
      dispatch(setReviews([...reviews, res]));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  useEffect(() => {
    if (ApiReviews) {
      dispatch(setReviews(ApiReviews));
    }
  }, [ApiReviews, dispatch]);

  const filteredReviews = reviews.filter((review) =>
    books?.some(
      (book) =>
        book.id.toString() === review.bookId &&
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

  const handleOpenModal = () => {
    if (userAuth.isAuth) {
      setOpenModal(true);
    } else {
      alert("Войдите в аккаунт");
    }
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
      <MyButton onClick={handleOpenModal}>Добавить отзыв</MyButton>
      <div className="flex-grow p-5 m-0 grid grid-cols-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, i) => {
            const book = books?.find((b) => b.id.toString() === review.bookId);
            const user = users?.find((u) => u.id === review.userId);
            return (
              <ReviewItem
                key={i}
                book={book}
                renderStars={renderStars}
                review={review}
                user={user}
                userAuth={userAuth.user}
              />
            );
          })
        ) : (
          <div className="col-span-4 text-center mt-10">
            <p className="text-lg text-white">No matching books found.</p>
          </div>
        )}
        {openModal && (
          <ReviewAddModal
            onAdd={handleAdd}
            books={books}
            user={userAuth.user}
            onClose={() => setOpenModal(false)}
          />
        )}
      </div>
      <MyFooter />
    </div>
  );
};

export default ReviewsList;
