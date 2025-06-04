import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";
import img7 from "../assets/images/img7.jpg";

export default function ImageScroller() {
  const images = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <div className="w-full overflow-hidden">
      <div className="p-3 flex animate-scroll whitespace-nowrap">
        {images.concat(images).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`gallery-${index}`}
            className="w-64 h-40 object-cover mx-2 rounded-sm transition-transform hover:scale-110 "
          />
        ))}
      </div>
    </div>
  );
}
//     <div className="overflow-hidden whitespace-nowrap w-full bg-gray-100 py-4">
//       <div
//         className="{
//   background-color: #333;
//   overflow: auto;
//   white-space: nowrap;
//   p 10px"
//       >
//         {images.concat(images).map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Slide ${index + 1}`}
//             width={600}
//             height={400}
//             className="w-64 h-40 rounded-lg shadow-md"
//           />
//         ))}
//       </div>
//     </div>
