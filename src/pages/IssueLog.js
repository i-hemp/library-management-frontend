import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./../components/Card";
const Issuelog = () => {
  const [dataIssued, setDataIssued] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/api/books/issue/logs`)
      .then((res) => setDataIssued(res.data))
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <div className="text-gray-400  pt-20 px-4 ">
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
