import { useState } from "react";

const IssueReturn = () => {
  const [bookInput, setBookInput] = useState("");
  const verifyReturn =(e)=>{
    e.preventDefault()
    console.log(bookInput);
    
    
  }
  return (
    <div className="">
      <form onSubmit={verifyReturn}>
        <label>Book name: </label>
        <input
          type="text"
          placeholder="Book-name"
          value={bookInput}
          onChange={(e) => setBookInput(e.target.value)}
          name="book-name"
          className="book-name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IssueReturn;
