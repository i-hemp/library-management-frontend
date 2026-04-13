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
    <div className="flex bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-full transition-all hover:shadow-xl">
      {/* Left side: Letter Icon */}
      <div className="flex flex-col items-center justify-center w-24 bg-gray-50 flex-shrink-0 border-r border-gray-100 p-4">
        <div 
          className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-inner"
          title={titleKey}
        >
          {firstLetter}
        </div>
      </div>

      {/* Center: Details */}
      <div className="flex-1 p-5 min-w-0">
        <h3 className="text-lg font-bold text-indigo-900 mb-3 border-b pb-1 truncate" title={titleKey}>
          {titleKey}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
          {displayDetails.filter(key => key !== 'Title' && key !== 'Name').map((key, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter shrink-0 w-24">
                {key}
              </span>
              <span className="text-sm text-gray-800 break-words line-clamp-2" title={data[key]}>
                {data[key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex flex-col justify-center gap-2 p-4 bg-gray-50 border-l border-gray-100 min-w-[120px]">
        {!onReturn && !onIssue && (
          <>
            <button
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200 transition-colors"
              onClick={onLog}
            >
              Logs
            </button>
            <button
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-200 transition-colors"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 transition-colors"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
        {onReturn && (
          <button
            className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md transition-all active:scale-95"
            onClick={() => handleStudentReturn(data.id)}
          >
            Return
          </button>
        )}
        {onIssue && (
          <button
            className="w-full px-3 py-2 text-sm font-bold rounded-lg bg-orange-500 text-white hover:bg-orange-600 shadow-md transition-all active:scale-95"
            onClick={(e) => handleIssueBook(e, data.id)}
          >
            Issue
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
