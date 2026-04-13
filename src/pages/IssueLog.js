import API from "../api/axios";
import { useEffect, useState } from "react";
import Card from "./../components/Card";
import { useToast } from "../context/ToastContext";
const Issuelog = () => {
  const [dataIssued, setDataIssued] = useState([]);
  const { showToast } = useToast();
  useEffect(() => {
    API
      .get("/books/issue/logs")
      .then((res) => setDataIssued(res.data))
      .catch((err) => {
        console.error(err);
        showToast("Failed to fetch global issue logs", "error");
      });
  }, [showToast]);
  
  return (
    <div className="  pt-5 px-4 ">
      <ul>
        {dataIssued.map((item, index) => (
          <li key={index} className="">
            <Card key={index} 
            data={{
                "Book ID": item.book_id, 
                "Student ID": item.student_id,
                "Issued On":item.issue_date
            }}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Issuelog;
