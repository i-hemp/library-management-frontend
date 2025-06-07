import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Card from "../components/Card";
import axios from "axios";
import picone from "./../assets/new_images/ben-wicks-Z-Q3OB3KVqs-unsplash.jpg";
import BookCard from "../components/BookCard";

export default function Books() {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [issueLog, setIssueLog] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/books/all")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLog = (book_id) => {
    navigate(`/booklog/${book_id}`);
  };

  const handleEdit = (book_id) => {
    navigate(`/booksedit/${book_id}`);
  };

  const handleDelete = (book_id) => {
    axios
      .get(`http://localhost:5001/api/books/issue/logs/book/${book_id}`)
      .then((res) => {
        setIssueLog(res.data);
        if (res.data.length === 0) {
          axios
            .delete(`http://localhost:5001/api/books/${book_id}`)
            .then(() => {
              alert("Book deleted successfully");
              setBooks(books.filter((b) => b.id !== book_id));
            })
            .catch((err) => console.log(err));
        } else {
          alert("Book has issue logs, can't delete!");
        }
      })
      .catch((err) => console.log(err));
  };

  // const filteredBooks = searchInput
  //   ? books.filter(
  //       (book) =>
  //         book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         book.isbn.toString().includes(searchInput) ||
  //         book.category.toLowerCase().includes(searchInput.toLowerCase())
  //     )
  //   : books;
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
      book.isbn.toString().includes(searchInput) ||
      book.category.toLowerCase().includes(searchInput.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || book.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      //  className="p-6"
      className="flex flex-col items-center  pt-20 px-4 w-full min-h-screen bg-fixed bg-center bg-cover"
      // className="justify-between flex flex-col pt-20 px-4 w-full min-h-screen bg-fixed bg-center bg-cover"
      // w-screen h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${picone})`,
      }}
    >
      <div className="flex pb-5 flex-row items-center justify-between gap-60">
        {/* <div className="flex justify-items-between items-center mb-4"> */}
        <h2 className="text-2xl text-white ml-20 font-bold">Books</h2>
        <div className="flex flex-row gap-3">
          <input
            type="text"
            placeholder="Search books..."
            value={searchInput}
            className="rounded-md px-2 py-2"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2  rounded-md border border-gray-300 "
          >
            <option value="All">All Categories</option>
            {[...new Set(books.map((b) => b.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/books/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add Book
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-1  gap-4 justify-items-center w-full max-w-6xl mx-auto">
        {filteredBooks.map((book) => (
          <li className="flex group" key={book.id}>
            <BookCard
              data={{
                id: book.id,
                Title: book.title,
                Author: book.author,
                ISBN: book.isbn,
                Category: book.category,
                "Total Copies": book.total_copies,
                "Available Copies": book.available_copies,
              }}
              key={book.id}
              onDelete={() => handleDelete(book.id)}
              onLog={() => handleLog(book.id)}
              onEdit={() => handleEdit(book.id)}
            />
            {/* <div className="options hidden group-hover:block">
              <p>Actions</p>
              <button onClick={() => handleLog(book.id)}>Check log</button>
              <br />
              <button onClick={() => handleDelete(book.id)}>Delete Book</button>
              <br />
              <button onClick={() => handleEdit(book.id)}>Edit</button>
            </div> */}
          </li>
        ))}
      </ul>
      <div className="pb-20"></div>

    </div>
  );
}

// import { Link } from "react-router-dom";
// // import BooksData from "../sample_data/useBooksData";
// import { useState } from "react";
// import Card from "../components/Card";
// // import axios from "axios";
// import { useBooksData } from "../sample_data/useBooksData";

// export default function Books() {
//   const [searchInput, setSearchInput] = useState("");
//   const books = useBooksData();

//   const filteredBooksData =
//     searchInput !== ""
//       ? books.filter(
//           (book) =>
//             book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
//             book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
//             book.isbn.includes(searchInput) ||
//             book.category.toLowerCase().includes(searchInput.toLowerCase())
//         )
//       : books;
//   return (
//     <div className="p-6 ">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Books</h2>

//         <input
//           type="text"
//           placeholder="Search books..."
//           value={searchInput}
//           onChange={(e) => {
//             setSearchInput(e.target.value);
//           }}
//         />
//         <Link
//           to="/books/add"
//           className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-500"
//         >
//           + Add Book
//         </Link>
//       </div>
//       <p>List of books will appear here.</p>
//       <div>
//         {/* <div className="grid gap-4">
//           {books.map((book) => ( */}
//         {/* // "id": 10, // "title": "Clean Code", // "author": "Robert C. Martin",
//         // "available_copies": 4, // "total_copies": 10, // "price": "12.00", //
//         "category": "Software Engineering", // "isbn": null */}
//         {/* <Card
//               key={book.id}
//               data={{
//                 title: book.title,
//                 author: book.author,
//                 category: book.category,
//                 isbn: book.isbn,
//                 total_copies: book.total_copies,
//                 available_copies: book.available_copies,
//               }}
//             />
//           ))} */}
//         {/* </div> */}
//         <ul className=" grid grid-flow-row justify-center  gap-2 ">
//           {filteredBooksData.map((book) => (
//             <Card
//               key={book.id}
//               data={{
//                 id:book.id,
//                 title: book.title,
//                 author: book.author,
//                 category: book.category,
//                 isbn: book.isbn,
//                 total_copies: book.total_copies,
//                 available_copies: book.available_copies,
//               }}
//             />
//             // <li className=" " key={book.id}>
//             //   <strong>title : </strong>
//             //   {book.title}
//             //   <br />
//             //   <strong>author : </strong>
//             //   {book.author}
//             //   <br />
//             //   <strong>isbn : </strong>
//             //   {book.isbn}
//             //   <br />
//             //   <strong>category : </strong>
//             //   {book.category}
//             //   <br />
//             //   <strong>total_copies : </strong> {book.total_copies}
//             //   <br />
//             //   <strong>available_copies : </strong> {book.available_copies}
//             // </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
