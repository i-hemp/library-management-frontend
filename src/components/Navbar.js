import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass = (path) =>
    ` border-b-2  ${
      currentPath === path ? "border-white" : "border-transparent"
    }`;
  return (
    <nav className="bg-gray-500 text-white p-2 flex justify-end p-r-20px">
      <div className="gap-3 flex ">
        <Link className={linkClass("/")} to="/">
          Dashboard
        </Link>
        <Link className={linkClass("/books")} to="/books">
          Books
        </Link>
        <Link className={linkClass("/students")} to="/students">
          Students
        </Link>
        <Link className={linkClass("/issue-return")} to="/issue-return">
          Issue/Return
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

// <h1 className="text-xl  font-bold"></h1>
