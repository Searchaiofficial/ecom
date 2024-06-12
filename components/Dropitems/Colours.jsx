"use client";
import bnw from "@/public/images/Dropitemsimg/bnw.png";
import blue from "@/public/images/Dropitemsimg/blue.png";
import green from "@/public/images/Dropitemsimg/green.png";
import gray from "@/public/images/Dropitemsimg/gray.png";
import pink from "@/public/images/Dropitemsimg/pink.webp";
import "./style.css";
import Image from "next/image";
import { useRouter } from "next/navigation";x

const colours = [
  {
    name: "Black & White",
    image: bnw,
  },
  {
    name: "Blue",
    image: blue,
  },
  {
    name: "Green",
    image: green,
  },
  {
    name: "Gray",
    image: gray,
  },
  {
    name: "Pink",
    image: pink,
  },
];

const Colours = ({ props }) => {
  // let heading=props.heading..;
  const router = useRouter();
  // const handleClick=(color)=>{
  //     router.push("/products/"+color+"/"+heading+"/"+props.parentCategory)
  //   }
  return (
    <div className="filter_item space-y-10">
      <h4 className="filter_heading gray-text">Shop by Colour</h4>
      <div className="filter_content">
        <ul className="filter_content_list">
          {colours.map((color) => (
            // <li className="color_item" onClick={()=>handleClick(color)}>
            <li className="color_item">
              <Image
                className="color_photo"
                src={color.image}
                alt={color.name}
                width={80}
                height={80}
              />
              <a href="#"> {color.name} </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="gray-text cursor-pointer">8 More</p>
      <p>All Colours</p>
    </div>
  );
};

export default Colours;
