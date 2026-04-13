import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Card from "../components/Card";
import API from "../api/axios";
import picone from "./../assets/new_images/ben-wicks-Z-Q3OB3KVqs-unsplash.jpg";
import BookCard from "../components/BookCard";
import { useToast } from "../context/ToastContext";
import { CardSkeleton } from "../components/Skeleton";

export default function Books() {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);
// must
  // eslint-disable-next-line no-unused-vars
  const [issueLog, setIssueLog] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    API
      .get("/books/all")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to fetch books", "error");
        setLoading(false);
      });
  }, [showToast]);

  const handleLog = (book_id) => {
    navigate(`/booklog/${book_id}`);
  };

  const handleEdit = (book_id) => {
    navigate(`/booksedit/${book_id}`);
  };

  const handleDelete = (book_id) => {
    API
      .get(`/books/issue/logs/book/${book_id}`)
      .then((res) => {
        setIssueLog(res.data);
        if (res.data.length === 0) {
          API
            .delete(`/books/${book_id}`)
            .then(() => {
              showToast("Book deleted successfully");
              setBooks(books.filter((b) => b.id !== book_id));
            })
            .catch((err) => {
              console.log(err);
              showToast("Error deleting book", "error");
            });
        } else {
          showToast("Book has active issue logs, cannot delete!", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("Error checking issue logs", "error");
      });
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
      <div className="flex pb-5 flex-row items-center justify-between gap-60" style={{width:"100%"}}>
        <h2 className="text-2xl text-white ml-5 font-bold">Books</h2>
        <div className="flex">
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
            className="px-3 py-2 mr-5 rounded-md border border-gray-300 "
          >
            <option value="All">All Categories</option>
            {[...new Set(books.map((b) => b.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const headers = ["ID", "Title", "Author", "ISBN", "Category", "Available", "Total"];
              const csvData = filteredBooks.map(b => 
                [b.id, b.title, b.author, b.isbn, b.category, b.available_copies, b.total_copies].join(",")
              );
              const blob = new Blob([[headers.join(","), ...csvData].join("\n")], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `books_export_${new Date().toLocaleDateString()}.csv`;
              a.click();
            }}
            className="flex items-center gap-2 bg-blue-600/50 hover:bg-blue-600 text-white px-4 py-2 rounded border border-blue-400/50 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <Link
            to="/books/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 shadow-lg shadow-green-900/20"
          >
            + Add Book
          </Link>
        </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center mx-auto w-full max-w-7xl px-4">
        {loading ? (
          Array(6).fill(0).map((_, i) => <li key={i}><CardSkeleton /></li>)
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li className="flex group w-full" key={book.id}>
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
            </li>
          ))
        ) : (
          <p className="text-white text-xl col-span-full">No books found matching your search.</p>
        )}
      </ul>
      <div className="pb-20"></div>

    </div>
  );
}
