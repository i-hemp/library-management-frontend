import { Link, useNavigate } from "react-router-dom";
// import StudentsData from "../sample_data/StudentsData";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Students() {
  const [searchInput, setSearchInput] = useState("");
  const [students, setStudents] = useState([]);
  const [issueLog, setIssueLog] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/students/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleLog = (student_id) => {
    console.log(student_id);
    navigate(`/logdetails/${student_id}`);

    // axios
    //   .get(`http://localhost:5001/api/books/issue/logs/${student_id}`)
    //   .then((res) => {
    //     setIssueLog(res.data);
    //     console.log(res.data.length);

    //     console.log(issueLog);
    //   })
    //   .catch((err) => console.error(err));
  };
  const filteredStudentsData =
    searchInput !== ""
      ? students.filter(
          (student) =>
            student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            student.roll_number
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            student.department
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            student.semester
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            student.phone.includes(searchInput) ||
            student.email.toLowerCase().includes(searchInput.toLowerCase())
        )
      : students;

  const navigate = useNavigate();
  const handleDelete = (student_id) => {
    // e.preventDefault()
    console.log(student_id);

    //check any logs
    // useEffect(()=>{

    axios
      .get(`http://localhost:5001/api/books/issue/logs/${student_id}`)
      .then((res) => setIssueLog(res.data))
      .catch((err) => console.log(err));
    // },[student_id])
    console.log(issueLog.length);
    console.log(issueLog);
    if (issueLog.length === 0) {
      try {
        axios.delete(`http://localhost:5001/api/students/${student_id}`);
        alert("Success");
        // window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Student have book issue logs!!!");
    }
  };

  const handleEdit=(id)=>{
    navigate(`/studentsedit/${id}`)
     
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Students</h2>
        <input
          type="text"
          placeholder="Search students..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link
          to="/students/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add Student
        </Link>
      </div>
      <p>List of students will appear here.</p>
      {/* <div className="grid gap-4">
        {filteredStudentsData.map((student) => (
          
        ))}
      </div> */}
      <ul className=" grid grid-flow-row justify-center  gap-2 ">
        {filteredStudentsData.map((student) => (
          <li className="flex " key={student.id}>
            <Card
              data={{
                id: student.id,
                Student: student.name,
                "Roll Number": student.roll_number,
                Department: student.department,
                Semester: student.semester,
                Phone: student.phone,
                Email: student.email,
              }}
            />
            <div className="options">
              <p>Actions</p>
              <button onClick={() => handleLog(student.id)}>Check log</button>
              <br />
              <button onClick={() => handleDelete(student.id)}>
                Delete Student
              </button><br/>
              <button onClick={()=>{handleEdit(student.id)}}>Edit</button>
            </div>
          </li>
          //   <li key={student.id} className="rounded-md p-4 bg-blue-100 border-3 ">
          //     <strong>name : </strong> {student.name}
          //     <br />
          //     <strong>roll_number : </strong> {student.roll_number}
          //     <br />
          //     <strong>department : </strong> {student.department}
          //     <br />
          //     <strong>semester : </strong> {student.semester}
          //     <br />
          //     <strong>phone : </strong> {student.phone}
          //     <br />
          //     <strong>email : </strong> {student.email}
          //   </li>
        ))}
      </ul>
      <div style={{ flex: 1 }}>
        <h3>Issue Logs</h3>
        {issueLog.length > 0 ? (
          <ul>
            {issueLog.map((log, i) => (
              <li key={i}>
                Book ID: {log.book_id}, Issue Date: {log.issue_date}, Return
                Date: {log.return_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No issue logs available</p>
        )}
      </div>
    </div>
  );
}
