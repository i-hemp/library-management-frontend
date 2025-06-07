import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import IssueLog from "./IssueLog";
import axios from "axios";
import Card from "../components/Card";

const DetailPage = () => {
  const { id } = useParams();
  const [issueLog, setIssueLog] = useState([]);

  // const handleLog = (student_id) => {
  //     console.log(student_id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/books/issue/logs/${id}`)
      .then((res) => {
        setIssueLog(res.data);
        // console.log(issueLog);
      })
      .catch((err) => console.error(err));
  }, [id, issueLog]);

  return (
    <div className="p-4  pt-20 px-4 ">
      <h2>Detail Page</h2>
      <p>Showing details for ID: {id}</p>
      <ul>
        {issueLog.map((item, index) => (
          <li key={index} className="">
            <Card
              key={index}
              data={{
                "Book ID": item.book_id,
                "Student ID": item.student_id,
                "Issued On": item.issue_date,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailPage;
