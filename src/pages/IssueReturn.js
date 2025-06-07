import { useState } from "react";
import { Link } from "react-router-dom";
import { useBooksData } from "../sample_data/useBooksData";
import Card from "../components/Card";
import axios from "axios";

const IssueReturn = () => {
  const [bookInput, setBookInput] = useState("");
  const books = useBooksData();
  const [foundedBooks, setFoundedBooks] = useState([]);
  // const student_id = 1;

  const find_book = (e) => {
    e.preventDefault();
    const result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(bookInput.toLowerCase()) ||
        book.author.toLowerCase().includes(bookInput.toLowerCase()) ||
        book.isbn.toLowerCase().includes(bookInput.toLowerCase()) ||
        book.category.toLowerCase().includes(bookInput.toLowerCase())
    );
    setFoundedBooks(result);
    console.log(foundedBooks);
  };
  const handleStudentReturn = (bookId) => {
    const studentId = prompt("Enter Id:", "0");
    const numberStudentId = Number.parseInt(studentId); // fixed variable name
    console.log(`studentID: ${numberStudentId}, bookID: ${bookId}`);
    try {
      axios.post(`${process.env.BACKEND_URL}/api/books/return/${bookId}`, {
        student_id: numberStudentId,
      });
      alert("Sucess")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" pt-20 px-4 grid grid-flow-row gap-4 text-2xl p-6 items-center justify-center text-center">
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
              <Card
                key={book.id}
                data={{
                  title: book.title,
                  author: book.author,
                  isbn: book.isbn,
                  category: book.category,
                  total_copies: book.total_copies,
                  available_copies: book.available_copies,
                }}
              />
              <button onClick={() => handleStudentReturn(book.id)}>
                Return Book
              </button>
            </li>
          ))}
        </ul>
      ) : (
        console.log(foundedBooks)
      )}
      <Link
        to={"/issue"}
        className="text-gray-500 text-sm width-30px cursor-pointer "
      >
        Want to issue book?
      </Link>
    </div>
  );
};

export default IssueReturn;
