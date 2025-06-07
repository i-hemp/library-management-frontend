import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

const BookIssueLog = () => {
  const [dataIssued, setDataIssued] = useState([]);
const {id}=useParams()
console.log(id);

  useEffect(() => {

    axios
    
      .get(`http://localhost:5001/api/books/issue/logs/book/${id}`)
      .then((res) => setDataIssued(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="text-gray-400 pt-20 px-4 ">
      <ul>
        {dataIssued.map((item, index) => (
          <li key={index} className="p-2">
            <Card
              data={{
                "Book ID": item.book_id,
                "Student ID": item.student_id,
                "Issued On": item.issue_date,
                "Returned On": item.return_date || "Not Returned",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookIssueLog;
