import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import picone from "./../assets/new_images/pexels-adnan-yahya-abdo-alward-1797136-7273787.jpg"
import StudentCard from "../components/StudentCard";

export default function Students() {
  const [searchInput, setSearchInput] = useState("");
  const [students, setStudents] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/students/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLog = (student_id) => {
    navigate(`/logdetails/${student_id}`);
  };

  const handleEdit = (student_id) => {
    navigate(`/studentsedit/${student_id}`);
  };

  const handleDelete = (student_id) => {
    axios
      .get(`http://localhost:5001/api/books/issue/logs/${student_id}`)
      .then((res) => {
        if (res.data.length === 0) {
          axios
            .delete(`http://localhost:5001/api/students/${student_id}`)
            .then(() => {
              alert("Student deleted successfully");
              setStudents(students.filter((s) => s.id !== student_id));
            })
            .catch((err) => console.log(err));
        } else {
          alert("Student has issue logs, can't delete!");
        }
      })
      .catch((err) => console.log(err));
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      student.id.toString().includes(searchInput);

    const matchesDept =
      departmentFilter === "All" || student.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div
      className="flex flex-col items-center pt-20 px-4 w-full min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${picone})` }}
    >
      <div className="flex pb-5 flex-row items-center justify-between gap-60">
        <h2 className="text-2xl text-white ml-20 font-bold">Students</h2>
        <div className="flex flex-row gap-3">
          <input
            type="text"
            placeholder="Search students..."
            value={searchInput}
            className="rounded-md px-2 py-2"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300"
          >
            <option value="All">All Departments</option>
            {[...new Set(students.map((s) => s.department))].map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/students/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add Student
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-1 gap-4 justify-items-center w-full max-w-6xl mx-auto">
        {filteredStudents.map((student) => (
          <li className="flex group" key={student.id}>
            <StudentCard
              data={{
                id: student.id,
                Name: student.name,
                Email: student.email,
                Department: student.department,
              }}
              onDelete={() => handleDelete(student.id)}
              onLog={() => handleLog(student.id)}
              onEdit={() => handleEdit(student.id)}
            />
          </li>
        ))}
      </ul>
      <div className="pb-20"></div>
    </div>
  );
}
