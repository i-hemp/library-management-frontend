import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BooksEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    total_copies: "",
    available_copies: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/books/${id}`)
      .then((res) => setBookInfo(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/api/books/put/${id}`, bookInfo)
      .then(() => {
        alert("Book updated successfully\nYou can close window..!");
        handleCancel();
        window.location.reload();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const handleCancel = () => {
    window.close();
    navigate("/books");

  };

  return (
    <div className="ml-8 mt-10 p-10 pt-20 px-4 ">
      <h2 className="text-xl font-bold mb-4">Edit Book Info</h2>
      <form onSubmit={handleSubmit} className="p-4">
        {[
          { label: "Title", name: "title" },
          { label: "Author", name: "author" },
          { label: "ISBN", name: "isbn" },
          { label: "Category", name: "category" },
          { label: "Total Copies", name: "total_copies" },
          { label: "Available Copies", name: "available_copies" },
        ].map((field) => (
          <div key={field.name} className="gap-2 p-2">
            <label className="mb-1 font-medium">{field.label + " : "}</label>
            <input
              type="text"
              name={field.name}
              value={bookInfo[field.name] || ""}
              onChange={handleChange}
              className="p-2 border-gray-200 border rounded-sm"
              required
            />
          </div>
        ))}
        <div className="p-4 gap-2">
          <button
            type="submit"
            className="px-5 py-2 rounded hover:bg-green-700 hover:text-white"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded hover:bg-red-700 hover:text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BooksEdit;
