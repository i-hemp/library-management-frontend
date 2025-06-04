export default function BookCard({ data }) {
  return (
    <div className="rounded-md p-4 bg-blue-100 border-3 ">
      {Object.entries(data).map(([key, value]) => (
        <p >
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );
}
