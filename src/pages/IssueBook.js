import React, { useState } from "react";

const IssueBook = () => {
  const [bookInput, setBookInput] = useState("");
  const find_book = (e) => {
    e.preventDefault()
    console.log(bookInput);
  };

  return (
    <div className="grid grid-flow-row gap-4 text-2xl p-6">
      <p>Looking for which book ?</p>
      <div className="rounded-md p-4 bg-green-100 border-3 w-fit h-fit ">
        <form onSubmit={find_book} className="flex gap-4 p-4">
          <label className="p-2">Book name :</label>
          <input
            type="text"
            placeholder=" Book name "
            className="p-2 rounded-sm  outline-none"
            value={bookInput}
            onChange={(e) => setBookInput(e.target.value)}
            name="book-name"
          />
          <button type="submit" className="bg-grey-700 ">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;
