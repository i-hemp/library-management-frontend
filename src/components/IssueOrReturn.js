import { Link } from "react-router-dom";

const IssueOrReturn = () => {
  return (
    <div className="flex p-20 gap-20 fixed top-15 left-0 w-full h-full bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IgNriMcNZRDD0swTbS/giphy.gif')] bg-cover bg-center bg-no-repeat">
      <Link
        to="/issue"
        className="w-fit h-fit bg-blue-600 text-white text-2xl font-bold px-10 py-4  cursor-pointer rounded-lg  hover:bg-blue-700 "
      >
        Issue a Book
      </Link>
      <Link
        to="/return"
        className="w-fit h-fit bg-green-600 text-white text-2xl font-bold px-10 py-4 cursor-pointer rounded-lg  hover:bg-green-700 "
      >
        Return a Book
      </Link>
    </div>
  );
  //   return (

  //     <div>
  //       <div>Issue a Book </div>
  //       <div>Return a Book </div>
  //     </div>
  //   );
};

export default IssueOrReturn;
