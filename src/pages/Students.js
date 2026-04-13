import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import picone from "./../assets/new_images/pexels-adnan-yahya-abdo-alward-1797136-7273787.jpg"
import StudentCard from "../components/StudentCard";
import { useToast } from "../context/ToastContext";
import { CardSkeleton } from "../components/Skeleton";

export default function Students() {
  const [searchInput, setSearchInput] = useState("");
  const [students, setStudents] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    API
      .get("/students/all")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to fetch students", "error");
        setLoading(false);
      });
  }, [showToast]);

  const handleLog = (student_id) => {
    navigate(`/logdetails/${student_id}`);
  };

  const handleEdit = (student_id) => {
    navigate(`/studentsedit/${student_id}`);
  };

  const handleDelete = (student_id) => {
    API
      .get(`/books/issue/logs/${student_id}`)
      .then((res) => {
        if (res.data.length === 0) {
          API
            .delete(`/students/${student_id}`)
            .then(() => {
              showToast("Student deleted successfully");
              setStudents(students.filter((s) => s.id !== student_id));
            })
            .catch((err) => {
              console.log(err);
              showToast("Error deleting student", "error");
            });
        } else {
          showToast("Student has active issue logs, cannot delete!", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        showToast("Error checking issue logs", "error");
      });
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
      <div className="flex pb-5 flex-row items-center justify-between gap-60" style={{width:"100%"}}>
        <h2 className="text-2xl text-white ml-5 font-bold">Students</h2>
        <div className="flex">
        <div className="flex flex-row gap-3 mr-5">
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const headers = ["ID", "Name", "Roll Number", "Department", "Semester", "Phone", "Email"];
              const csvData = filteredStudents.map(s => 
                [s.id, s.name, s.roll_number, s.department, s.semester, s.phone, s.email].join(",")
              );
              const blob = new Blob([[headers.join(","), ...csvData].join("\n")], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `students_export_${new Date().toLocaleDateString()}.csv`;
              a.click();
            }}
            className="flex items-center gap-2 bg-blue-600/50 hover:bg-blue-600 text-white px-4 py-2 rounded border border-blue-400/50 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <Link
            to="/students/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 shadow-lg shadow-green-900/20"
          >
            + Add Student
          </Link>
        </div>
        </div>

      </div>

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center mx-auto w-full max-w-7xl px-4">
        {loading ? (
          Array(6).fill(0).map((_, i) => <li key={i}><CardSkeleton /></li>)
        ) : filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <li className="flex group w-full" key={student.id}>
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
          ))
        ) : (
          <p className="text-white text-xl col-span-full">No students found matching your search.</p>
        )}
      </ul>
      <div className="pb-20"></div>
    </div>
  );
}
