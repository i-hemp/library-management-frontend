import React from "react";

const StudentCard = ({ data, onEdit, onDelete, onLog }) => {
  const titleKey = data?.Name || "Unnamed";
  const firstLetter = titleKey.charAt(0).toUpperCase();

  const displayDetails = Object.keys(data).filter(
    (key) => key.toLowerCase() !== "id"
  );

  return (
    <div className="flex items-center bg-white rounded-xl shadow-md p-4 max-w-3xl">
      <div className="items-center flex justify-center w-16 h-16 rounded-full bg-gray-700 text-white text-2xl font-bold mr-6">
        {firstLetter}
      </div>

      <div className="flex grid grid-cols-2 gap-1 text-sm text-gray-700">
        {displayDetails.map((key, index) => (
          <div key={index} className="flex">
            <span className="font-semibold mr-1">{key}:</span>
            <span>{data[key]}</span>
          </div>
        ))}
      </div>

      <div className="ml-6 flex flex-col gap-2">
        <button
          className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={onLog}
        >
          Check Log
        </button>
        <button
          className="px-3 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
