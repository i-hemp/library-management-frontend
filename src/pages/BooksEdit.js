import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import picone from "./../assets/new_images/vecteezy_person-man-holding-pen-write-plan-or-idea-on-book-with_10111102.jpg";

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
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/books/${id}`)
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
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/books/put/${id}`, bookInfo)
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
    <div className="flex">
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
              className="p-2 ml-5 border-gray-200 border rounded-sm"
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
    <div className="imagepic pt-10">
        <img src={picone} alt="edit-image" className="pt-10" style={{ width: '800px', height: 'auto' }}/>

    </div>
    </div>
  );
};

export default BooksEdit;
