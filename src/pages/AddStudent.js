import axios from "axios";
import React, { useState } from "react";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/students", {
        roll_number: rollNumber,
        name:name,
        department:department,
        semester:semester,
        phone:phone,
        email:email,
      });

      console.log("Student added:", res.data);
      alert("Student added successfully!");

      // Clear form
      setName("");
      setRollNumber("");
      setDepartment("");
      setSemester("");
      setPhone("");
      setEmail("");
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          
          onChange={(e) => setSemester(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
        >
          Save Student
        </button>
      </form>
    </div>
  );
}
