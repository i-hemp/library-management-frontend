import { Link } from "react-router-dom";
import imgone from "./../assets/new_images/issueBodmin-library-008.jpg";
const IssueOrReturn = () => {
  return (
    <div
      style={{ backgroundImage: `url(${imgone})` }}
      className="min-h-screen flex items-center justify-center gap-20 bg-cover bg-center bg-no-repeat px-4 py-20"
    >
      <Link
        to="/issue"
        className="bg-blue-600 text-white text-2xl font-bold px-10 py-4 rounded-lg hover:bg-blue-700"
      >
        Issue a Book
      </Link>
      <Link
        to="/return"
        className="bg-green-600 text-white text-2xl font-bold px-10 py-4 rounded-lg hover:bg-green-700"
      >
        Return a Book
      </Link>
    </div>
  );
};

export default IssueOrReturn;
