import { Link } from "react-router-dom";
import StudentsData from "../sample_data/StudentsData";

export default function Students() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Students</h2>
        <Link
          to="/students/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add Student
        </Link>
      </div>
      <p>List of students will appear here.</p>
      <ul className=" grid grid-flow-row justify-center  gap-2 ">
        {StudentsData.map((student) => (
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
