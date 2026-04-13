import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useToast } from "../context/ToastContext";
import picone from "./../assets/new_images/ben-wicks-Z-Q3OB3KVqs-unsplash.jpg";

export default function Fines() {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = () => {
    setLoading(true);
    API.get("/books/fines/all")
      .then((res) => {
        setFines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        showToast("Failed to fetch fines", "error");
        setLoading(false);
      });
  };

  const handlePay = (id) => {
    API.post(`/books/fines/pay/${id}`)
      .then(() => {
        showToast("Fine marked as paid");
        fetchFines();
      })
      .catch((err) => {
        console.error(err);
        showToast("Error updating fine", "error");
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className="flex flex-col items-center pt-20 px-4 w-full min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${picone})` }}
    >
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Fine <span className="text-orange-400">Management</span>
          </h2>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
            <span className="text-gray-300 text-sm">Total Outstanding: </span>
            <span className="text-white text-xl font-bold">
              ${fines.filter(f => f.fine_status === 'pending').reduce((acc, curr) => acc + parseFloat(curr.fine_amount), 0).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <table className="w-full text-left text-white">
            <thead className="bg-white/10 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400">Loading fine data...</td>
                </tr>
              ) : fines.length > 0 ? (
                fines.map((fine) => (
                  <tr key={fine.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{fine.student_name}</div>
                      <div className="text-xs text-gray-400">{fine.roll_number}</div>
                    </td>
                    <td className="px-6 py-4 truncate max-w-xs">{fine.book_title}</td>
                    <td className="px-6 py-4 text-sm font-mono">{formatDate(fine.due_date)}</td>
                    <td className="px-6 py-4 font-bold text-orange-400">${parseFloat(fine.fine_amount).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        fine.fine_status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {fine.fine_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {fine.fine_status === 'pending' && (
                        <button
                          onClick={() => handlePay(fine.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition-all transform active:scale-95"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-400 italic">No fine history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pb-20"></div>
    </div>
  );
}
