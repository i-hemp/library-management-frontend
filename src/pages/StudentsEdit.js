import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentInfo, setStudentInfo] = useState({
    name: "",
    roll_number: "",
    department: "",
    semester: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/api/students/${id}`)
      .then((res) => setStudentInfo(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studentInfo);

    axios
      .put(`${process.env.BACKEND_URL}/api/students/${id}`, studentInfo)
      .then(() => {
        alert("Student updated successfully\n You can close window..!");

        handleCancel();
        window.location.reload();
      })
      .catch((err) => console.error("Update failed:", err));
  };
  const handleCancel = () => {
    window.close();
    navigate("/students");
    
  };
  return (
    <div className="ml-8 mt-10 p-10 pt-20 px-4 ">
      <h2 className="text-xl font-bold mb-4">Edit Student Info</h2>
      <form onSubmit={handleSubmit} className="p-4">
        {[
          { label: "Name", name: "name" },
          { label: "Roll Number", name: "roll_number" },
          { label: "Department", name: "department" },
          { label: "Semester", name: "semester" },
          { label: "Phone", name: "phone" },
          { label: "Email", name: "email" },
        ].map((field) => (
          <div key={field.name} className="gap-2 p-2">
            <label className=" mb-1 font-medium">{field.label + " : "}</label>
            <input
              type="text"
              name={field.name}
              value={studentInfo[field.name] || ""}
              onChange={handleChange}
              className="p-2 border-gray-200 border rounded-sm"
              required
            />
          </div>
        ))}
        <div className="p-4 gap-2">
          <button
            type="submit"
            className="px-5 py-2 rounded hover:bg-green-700 hover:text-white"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded hover:bg-red-700 hover:text-white"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentsEdit;
