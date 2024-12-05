"use client";
import { IBook, IReview, IUser } from "@/Types/types";
import React, { FC, useState } from "react";

interface ReviewAddModalProps {
  onClose: () => void;
  onAdd: (newReview: IReview) => void;
  user: IUser | null;
  books: IBook[] | undefined;
}

const ReviewAddModal: FC<ReviewAddModalProps> = ({
  onClose,
  onAdd,
  books,
  user,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const handleSubmit = () => {
    if (!user || !selectedBookId) return;

    const newReview: IReview = {
      id: Date.now(),
      userId: user.id,
      bookId: selectedBookId,
      comment: comment,
      rating: rating,
    };
    onAdd(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl text-black mb-4">Добавить Отзыв</h2>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Выберите книгу:</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="border text-black p-2 w-full"
          >
            <option value="" disabled>
              Выберите книгу
            </option>
            {books?.map((book) => (
              <option key={book.id} value={book.id.toString()}>
                {" "}
                {/* Конвертируем id в строку */}
                {book.title} - {book.author} ({book.price} $)
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Рейтинг</label>
          <input
            type="number"
            max={5}
            min={0}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Комментарий</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded mr-2"
          >
            Отменить
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Добавить отзыв
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAddModal;
