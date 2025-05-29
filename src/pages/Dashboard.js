import picone from "./../assets/library_images/lib-pic-3.jpg";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-7xl  p-2 gap-2 text-gray-700  justify-center text-center ">
        Dashboard
      </h2>
      <p className="text-2xl   gap-2 text-gray-700 justify-center text-center ">
        Welcome to the Library Management System!
      </p>
      <div
        //top-[200px] left-0 w-full h-full bg-center bg-no-repeat
        className="bg-center bg-no-repeat pt-[400px]"
        style={{ backgroundImage: `url(${picone})` }}
      ></div>
    </div>
  );
}

// https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sUV2zvNzjqbS/giphy.gif
//
// style={{
//   backgroundImage: `url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sUV2zvNzjqbS/giphy.gif')`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   height: "300px",
//   width: "100%",
// }}
