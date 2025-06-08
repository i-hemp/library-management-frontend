import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
// import IssueOrReturn from "./components/IssueOrReturn";
import IssueBook from "./pages/IssueBook";
import IssueReturn from "./pages/IssueReturn";
import Details from "./pages/Details";
import ImageScroller from "./pages/ImageScroller";
import StudentsEdit from "./pages/StudentsEdit";
import BookIssueLog from "./pages/BookIssueLog";
import BooksEdit from "./pages/BooksEdit";
import BookCard from "./components/BookCard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-grey-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/booklog/:id" element={<BookIssueLog />} />
          <Route path="/booksedit/:id" element={<BooksEdit />} />
          <Route path="/students" element={<Students />} />
          <Route path="/studentsedit/:id" element={<StudentsEdit />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/issue" element={<IssueBook />} />
          <Route path="/return" element={<IssueReturn />} />
          <Route path="/issue" element={<IssueBook />} />
          <Route path="/return" element={<IssueReturn />} />
          <Route path="/images" element={<ImageScroller />} />
          <Route path="/logdetails/:id" element={<Details />} />
          <Route path="/test" element={<BookCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
