"use client";
import { IBook } from "@/Types/types";
import React, { FC, useState } from "react";

interface AdminModalProps {
  book: IBook;
  onClose: () => void;
  onSave: (updatedBook: IBook) => void;
}

const AdminModal: FC<AdminModalProps> = ({ book, onClose, onSave }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.desc);
  const [price, setPrice] = useState(book.price);
  const [genre, setGenre] = useState(book.genre);

  const handleSave = () => {
    const updatedBook = {
      ...book,
      title,
      author,
      desc: description,
      price,
      genre,
    };
    onSave(updatedBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl text-black mb-4">Edit Book</h2>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block  text-blue-500 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-500 mb-1">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border text-black p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black text-black p-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
