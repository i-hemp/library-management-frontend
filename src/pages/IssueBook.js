import { useState } from "react";
import { useBooksData } from "../sample_data/useBooksData";
import { Link } from "react-router-dom";
import Card from "./../components/Card";
import Issuelog from "./IssueLog";
import axios from "axios";
const IssueBook = () => {
  const [bookInput, setBookInput] = useState("");
  const [foundedBooks, setFoundedBooks] = useState([]);
  const books = useBooksData();

  const find_book = (e) => {
    e.preventDefault();
    const result = books.filter(
      (book) =>
        (book.title !== null &&
          book.title.toLowerCase().includes(bookInput.toLowerCase())) ||
        (book.author !== null &&
          book.author.toLowerCase().includes(bookInput.toLowerCase())) ||
        (book.isbn !== null &&
          book.isbn.toLowerCase().includes(bookInput.toLowerCase())) ||
        (book.category !== null &&
          book.category.toLowerCase().includes(bookInput.toLowerCase()))
    );
    setFoundedBooks(result);
    console.log(foundedBooks);
  };
  const handleIssue = (e, id) => {
    const studentId = prompt("Enter Id:", "0");
    const numberStudentId = Number.parseInt(studentId); 
    //not finished
    // useEffect(() => {
    axios
      .post(`http://localhost:5001/api/books/issue/${id}/${numberStudentId}`)
      .then((res) => {
        // e.target.innerText += " " + res.data.available_copies;
        window.alert("Success")
        console.log(res.data);
      // alert("Now Available:",res.data.available_copies)

      })
      .catch((err) => console.error(err));

    // },[]);
  };

  return (
    <div className=" pt-20 px-4 ">
      <div className="grid grid-flow-row gap-4 text-2xl p-6 items-center justify-center text-center">
        <p>Looking for which book?</p>
        <div className="rounded-md p-4 bg-green-100 border-3 w-fit h-fit ">
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
                    category: book.category,
                    isbn: book.isbn,
                    total_copies: book.total_copies,
                    available_copies: book.available_copies,
                  }}
                />
                <button onClick={(e) => handleIssue(e, book.id)}>Issue</button>
              </li>
            ))}
          </ul>
        ) : (
          console.log(foundedBooks)
        )}
        <Link
          to={"/return"}
          className="text-gray-500 text-sm width-30px cursor-pointer "
        >
          Want to return book?
        </Link>
      </div>
      <p>Log:</p>
      <Issuelog />
    </div>
  );
};

export default IssueBook;
