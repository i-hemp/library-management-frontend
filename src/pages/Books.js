import { Link } from "react-router-dom";
// import BooksData from "../sample_data/useBooksData";
import { useState } from "react";
import Card from "../components/Card";
// import axios from "axios";
import { useBooksData } from "../sample_data/useBooksData";

export default function Books() {
  const [searchInput, setSearchInput] = useState("");
  const books = useBooksData();

  const filteredBooksData =
    searchInput !== ""
      ? books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.isbn.includes(searchInput) ||
            book.category.toLowerCase().includes(searchInput.toLowerCase())
        )
      : books;
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
        {/* <div className="grid gap-4">
          {books.map((book) => ( */}
        {/* // "id": 10, // "title": "Clean Code", // "author": "Robert C. Martin",
        // "available_copies": 4, // "total_copies": 10, // "price": "12.00", //
        "category": "Software Engineering", // "isbn": null */}
        {/* <Card
              key={book.id}
              data={{
                title: book.title,
                author: book.author,
                category: book.category,
                isbn: book.isbn,
                total_copies: book.total_copies,
                available_copies: book.available_copies,
              }}
            />
          ))} */}
        {/* </div> */}
        <ul className=" grid grid-flow-row justify-center  gap-2 ">
          {filteredBooksData.map((book) => (
            <Card
              key={book.id}
              data={{
                title: book.title,
                author: book.author,
                category: book.category,
                isbn: book.isbn,
                total_copies: book.total_copies,
                available_copies: book.available_copies,
              }}
            />
            // <li className=" " key={book.id}>
            //   <strong>title : </strong>
            //   {book.title}
            //   <br />
            //   <strong>author : </strong>
            //   {book.author}
            //   <br />
            //   <strong>isbn : </strong>
            //   {book.isbn}
            //   <br />
            //   <strong>category : </strong>
            //   {book.category}
            //   <br />
            //   <strong>total_copies : </strong> {book.total_copies}
            //   <br />
            //   <strong>available_copies : </strong> {book.available_copies}
            // </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
