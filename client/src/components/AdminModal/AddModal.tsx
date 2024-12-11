import { useAddNewBookMutation } from "@/Api/BookApi";
import { RootState } from "@/store/store";
import { IBook } from "@/Types/types";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

interface IAddModal {
  onClose: () => void;
  onAdd: (newBook: IBook) => void;
}

const AddModal: FC<IAddModal> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [desc, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [genre, setGenre] = useState<string>("");
  const [img, setImg] = useState<string>("/book.png");

  const handleAdd = async () => {
    const newBook: IBook = {
      id: Date.now(),
      title,
      author,
      desc,
      price,
      genre,
      img,
    };
    onAdd(newBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl text-black mb-4">ADD Book</h2>
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
          <label className="block text-blue-500 mb-1">Image URL:</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
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
          <label className="block text-blue-500 mb-1">Description</label>
          <textarea
            value={desc}
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
            className="bg-gray-300 text-black p-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
