import { Link } from "react-router-dom";
import StudentsData from "../sample_data/StudentsData";
import { useState } from "react";

export default function Students() {
  const [searchInput, setSearchInput] = useState("");
  const filteredStudentsData =
    searchInput !== ""
      ? StudentsData.filter(
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
            student.phone.toLowerCase().includes(searchInput.toLowerCase()) ||
            student.email.toLowerCase().includes(searchInput.toLowerCase())
        )
      : StudentsData;
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
      <ul className=" grid grid-flow-row justify-center  gap-2 ">
        {filteredStudentsData.map((student) => (
          <li key={student.id} className="rounded-md p-4 bg-blue-100 border-3 ">
            <strong>name : </strong> {student.name}
            <br />
            <strong>roll_number : </strong> {student.roll_number}
            <br />
            <strong>department : </strong> {student.department}
            <br />
            <strong>semester : </strong> {student.semester}
            <br />
            <strong>phone : </strong> {student.phone}
            <br />
            <strong>email : </strong> {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
