import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import IssueLog from "./IssueLog";
import API from "../api/axios";
import Card from "../components/Card";
import { useToast } from "../context/ToastContext";

const DetailPage = () => {
  const { id } = useParams();
  const [issueLog, setIssueLog] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    API
      .get(`/books/issue/logs/${id}`)
      .then((res) => {
        setIssueLog(res.data);
      })
      .catch((err) => {
        console.error(err);
        showToast("Failed to fetch student issue history", "error");
      });
  }, [id, showToast]);

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
