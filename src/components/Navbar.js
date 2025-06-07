import { Link, useLocation } from "react-router-dom";
import img from "./../assets/new_images/library.png";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass = (path) =>
    ` border-b-2  ${
      currentPath === path ? "border-white" : "border-transparent"
    }`;
  return (
    <nav className="text-white  fixed top-0 left-0 right-0      justify-between bg-gradient-to-r to-[#19547b]  from-[#ffd89b] p-2 flex justify-end p-r-20px"
    >
      <img src={img} alt="home" className="w-7" />
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
