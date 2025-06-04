import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import IssueOrReturn from "./components/IssueOrReturn";
import IssueBook from "./pages/IssueBook";
import IssueReturn from "./pages/IssueReturn";
import ImageScroller from "./pages/ImageScroller";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-grey-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/issue-return" element={<IssueOrReturn />} />
          <Route path="/issue" element={<IssueBook />} />
          <Route path="/return" element={<IssueReturn />} />
          <Route path="/images" element={<ImageScroller />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
