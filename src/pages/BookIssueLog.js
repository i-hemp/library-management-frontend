import API from "../api/axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const BookIssueLog = () => {
  const [dataIssued, setDataIssued] = useState([]);
  const { id } = useParams();
  const { showToast } = useToast();
  console.log(id);

  useEffect(() => {
    API
      .get(`/books/issue/logs/book/${id}`)
      .then((res) => setDataIssued(res.data))
      .catch((err) => {
        console.error(err);
        showToast("Failed to fetch issue logs", "error");
      });
  }, [id, showToast]);

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
