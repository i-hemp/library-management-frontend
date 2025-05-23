import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-500 text-white p-4 flex justify-between">
      <h1 className="text-xl  font-bold">📚 College Library</h1>
      <div className="gap-2 flex ">
        <Link className="hover:bg-gray-100 hover:text-gray-600 rounded-md" to="/">Dashboard</Link>
        <Link className="hover:bg-gray-100 hover:text-gray-600 rounded-md" to="/books">Books</Link>
        <Link className="hover:bg-gray-100 hover:text-gray-600 rounded-md" to="/students">Students</Link>
        <Link className="hover:bg-gray-100 hover:text-gray-600 rounded-md" to="/issue-return">Issue/Return</Link>
      </div>
    </nav>
  );
}

export default Navbar;
