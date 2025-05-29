import { useState } from "react";
import { Link } from "react-router-dom";
import BooksData from "../sample_data/BooksData";

const IssueReturn = () => {
  const [bookInput, setBookInput] = useState("");
  const [foundedBooks, setFoundedBooks] = useState([]);
   const find_book = (e) => {
    e.preventDefault();
    const result = BooksData.filter(
      (book) =>
        book.title.toLowerCase().includes(bookInput.toLowerCase()) ||
        book.author.toLowerCase().includes(bookInput.toLowerCase()) ||
        book.isbn.toLowerCase().includes(bookInput.toLowerCase()) ||
        book.category.toLowerCase().includes(bookInput.toLowerCase())
    );
    setFoundedBooks(result);
    console.log(foundedBooks);
    
  };
  return (
    <div className="grid grid-flow-row gap-4 text-2xl p-6 items-center justify-center text-center">
      <p>Looking for which book?</p>
      <div className="rounded-md p-4 bg-green-100 border-3 w-fit h-fit">
        <form onSubmit={find_book} className="flex gap-4 p-4">
          <label className="p-2">Enter book details:</label>
          <input
            type="text"
            placeholder="Book name"
            className="p-2 rounded-sm outline-none"
            value={bookInput}
            onChange={(e) => setBookInput(e.target.value)}
            name="book-name"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
      {foundedBooks.length > 0 ? (
        <ul className="grid grid-flow-row justify-center gap-2">
          {foundedBooks.map((book) => (
            <li className="rounded-md p-4 bg-blue-100 border-3" key={book.id}>
              <strong>Title:</strong> {book.title}
              <br />
              <strong>Author:</strong> {book.author}
              <br />
              <strong>ISBN:</strong> {book.isbn}
              <br />
              <strong>Category:</strong> {book.category}
              <br />
              <strong>Total Copies:</strong> {book.total_copies}
              <br />
              <strong>Available Copies:</strong> {book.available_copies}
            </li>
          ))}
        </ul>
      ) : (
        console.log(foundedBooks)
      )}
      <Link to={'/issue'} className="text-gray-500 text-sm width-30px cursor-pointer ">Want to issue book?</Link>
    </div>
  
  );
};

export default IssueReturn;
