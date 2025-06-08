import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//                title: book.title,
//               author: book.author,
//               category: book.category,
//               isbn: book.isbn,
//               total_copies: book.total_copies,
//               available_copies: book.available_copies,
export default function AddBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [total_copies, setTotal_copies] = useState(0);
  const [available_copies, setAvailable_copies] = useState(0);
  const [isbn, setIsbn] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const res = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/books/`,
        {
          title: title,
          author: author,
          isbn: isbn,
          category: category,
          total_copies: total_copies,
          available_copies: available_copies,
          price: price,
        }
      );
      console.log("Book added:", res.data);
      alert("Book added successfully!");

      setTitle("");
      setAuthor("");
      setIsbn("");
      setCategory("");
      setTotal_copies(1);
      setAvailable_copies(1);
      setPrice(0);
      navigate("/books");
      window.location.reload();
    } catch (err) {
      console.log(`Error adding book: ${err}`);
      alert("Failed to add book. Check console for errors.");
    }
  };
  return (
    <div className="p-6 pt-20 px-4 ">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={(e) => handleAddBook(e)}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={author}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          value={isbn}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Total Copies"
          value={total_copies}
          onChange={(e) => setTotal_copies(parseInt(e.target.value))}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Available Copies"
          value={available_copies}
          onChange={(e) => setAvailable_copies(parseInt(e.target.value))}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded col-span-2"
        >
          Save Book
        </button>
      </form>
    </div>
  );
}
