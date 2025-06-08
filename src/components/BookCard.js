import React from "react";

const BookCard = ({
  data,
  onEdit = () => {},
  onDelete = () => {},
  onLog = () => {},
  onReturn = false,
  onIssue = false,
  handleStudentReturn = () => {},
  handleIssueBook = () => {},
}) => {
  const titleKey = data?.Title || data?.Name || "Unnamed";
  const firstLetter = titleKey.charAt(0).toUpperCase();

  const displayDetails = Object.keys(data).filter(
    (key) => key.toLowerCase() !== "id"
  );

  return (
    <div className="flex items-center bg-white rounded-xl shadow-md p-4 w-full max-w-3xl">
      <div
        className="flex justify-center items-center w-16 h-16 rounded-full bg-gray-500 text-white text-2xl font-bold mr-6 shrink-0"
        title={titleKey}
      >
        {firstLetter}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-1 text-sm text-gray-700">
        {displayDetails.map((key, index) => (
          <div key={index} className="flex overflow-hidden">
            <span className="font-semibold mr-1 whitespace-nowrap">{key}:</span>
            <span className="truncate max-w-[180px] block" title={data[key]}>
              {data[key]}
            </span>
          </div>
        ))}
      </div>

      {!onReturn && !onIssue &&(
        <div className="ml-6 flex flex-col gap-2 shrink-0">
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
      )}
      {onReturn && (
        <button
          className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleStudentReturn(data.id)}
        >
          Return Book
        </button>
      )}
      {onIssue && (
        <button
          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
          onClick={(e) => handleIssueBook(e,data.id)}
        >
          Issue Book
        </button>
      )}
    </div>
  );
};

export default BookCard;
