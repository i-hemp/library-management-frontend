// import picone from "./../assets/library_images/lib-pic-3.jpg";
import ImageScroller from "./ImageScroller";
import picone from "./../assets/new_images/eliza-ari-RLgRAhTD4ww-unsplash.jpg";

export default function Dashboard() {
  return (
    <div
      className="pt-20 px-4 justify-between flex flex-col w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${picone})`,
      }}
      // backgroundSize: "cover",
      // backgroundPosition: "center",
      // // height: "300px",
      // width: "100%"
    >
      <div className="text">
        <h2 className="text-7xl mt-20 p-2 gap-2 text-white  justify-center text-center ">
          Dashboard
        </h2>
        <p className="text-2xl   gap-2 text-white justify-center text-center ">
          Welcome ,Admin!
        </p>
      </div>

      {/* <ImageScroller></ImageScroller> */}
    </div>
  );
}

// https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sUV2zvNzjqbS/giphy.gif
//https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sUV2zvNzjqbS/giphy.gif')`
// style={{
//   backgroundImage: `url(',
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   height: "300px",
//   width: "100%",
// }}

// {/* <div

//   //top-[200px] left-0 w-full h-full bg-center bg-no-repeat
//   className="bg-center bg-no-repeat pt-[400px]"
//   style={{ backgroundImage: `url(${picone})` }}
// >
//   <div>
//   </div>
//   </div> */}
