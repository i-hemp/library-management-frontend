export default function AddStudent() {
  return (
    <div className=" p-6 max-w-xl flex flex-col justify-center items-center text-center ">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <form className="grid grid-cols-1 gap-4">
        <input type="text" placeholder="Name" className="p-2 border rounded" />
        <input type="text" placeholder="Roll Number" className="p-2 border rounded" />
        <input type="text" placeholder="Department" className="p-2 border rounded" />
        <input type="text" placeholder="Semester" className="p-2 border rounded" />
        <input type="tel" placeholder="Phone" className="p-2 border rounded" />
        <input type="email" placeholder="Email" className="p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Student
        </button>
      </form>
    </div>
  );
}
