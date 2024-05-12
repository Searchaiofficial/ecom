import React, { useEffect, useState } from "react";
import ListContent from "./ListContent";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Displaybox = (props) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState("");

  const handleClick = (value) => {
    // const category = value.replace(/\s+/g, "-").toLowerCase();
    const category = encodeURIComponent(value.toLowerCase());
    const newPath = `/${props.parentCategory}/${currentCategory}/${category}`;
    router.push(newPath);
    props.setAsideCategory(null);
  };

  useEffect(() => {
    if (props.data.name) {
      const category = encodeURIComponent(
        props.data.name.toLowerCase()
      );
      setCurrentCategory(category);
    }
  }, [props.data.name]);

  return (
    <main className="w-full p-4 noto-sans-200">
      <h1 className="text-xl mb-4 font-semibold w-full">
        {props.data?.name}
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {props.data?.subcategories && props.data.subcategories.length > 0 ? (
          props.data.subcategories.map((item) => (
            <div
              className="flex gap-4 p-2 items-center cursor-pointer hover:bg-zinc-200"
              onClick={() => handleClick(item.name)}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={100}
                height={100}
                className="w-[50px] h-[50px] bg-gray-200"
              />
              <h2 className=" text-lg font-medium">{item.name}</h2>
            </div>
            // <div>
            //    <ListContent parentCategory={parentCategory} items={item} />
            //  </div>
          ))
        ) : (
          <p className="text-lg text-center font-medium">No data available</p>
        )}
      </div>
    </main>
  );
};

export default Displaybox;
