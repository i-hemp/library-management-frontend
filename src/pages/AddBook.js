export default function AddBook() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <form className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Title" className="p-2 border rounded" />
        <input type="text" placeholder="Author" className="p-2 border rounded" />
        <input type="text" placeholder="ISBN" className="p-2 border rounded" />
        <input type="text" placeholder="Category" className="p-2 border rounded" />
        <input type="number" placeholder="Number of Copies" className="p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-2">
          Save Book
        </button>
      </form>
    </div>
  );
}
