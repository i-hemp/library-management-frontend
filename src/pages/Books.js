import { Link } from "react-router-dom";
import BooksData from "../sample_data/BooksData";

export default function Books() {
  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Books</h2>
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
          {BooksData.map((book) => (
            <li
              className="rounded-md p-4 bg-blue-100 border-3 "
              key={Books.id}
            >
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
