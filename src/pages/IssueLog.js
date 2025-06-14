import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./../components/Card";
const Issuelog = () => {
  const [dataIssued, setDataIssued] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/books/issue/logs`)
      .then((res) => setDataIssued(res.data))
      .catch((err) => console.error(err));
  }, []);
  
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
