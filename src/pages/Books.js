import { Link } from "react-router-dom";
import BooksData from "../sample_data/BooksData";
import { useState } from "react";

export default function Books() {
  const [searchInput, setSearchInput] = useState("");
  const filteredBooksData =
    searchInput !== ""
      ? BooksData.filter(
          (book) =>
            book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.isbn.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.category.toLowerCase().includes(searchInput.toLowerCase())
        )
      : BooksData;

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Books</h2>

        <input
          type="text"
          placeholder="Search books..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link
          to="/books/add"
          className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-500"
        >
          + Add Book
        </Link>
      </div>
      <p>List of books will appear here.</p>
      <div>
        {/* flex flex-row */}
        <ul className=" grid grid-flow-row justify-center  gap-2 ">
          {filteredBooksData.map((book) => (
            <li className="rounded-md p-4 bg-blue-100 border-3 " key={book.id}>
              <strong>title : </strong>
              {book.title}
              <br />
              <strong>author : </strong>
              {book.author}
              <br />
              <strong>isbn : </strong>
              {book.isbn}
              <br />
              <strong>category : </strong>
              {book.category}
              <br />
              <strong>total_copies : </strong> {book.total_copies}
              <br />
              <strong>available_copies : </strong> {book.available_copies}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
