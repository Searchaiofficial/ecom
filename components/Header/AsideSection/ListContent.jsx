import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ListContent = ({ parentCategory, items }) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState("");

  const handleClick = (value) => {
    const category = value.text.replace(/\s+/g, "-");
    const newPath = `/${parentCategory}/${currentCategory}/${category}`;
    router.push(newPath);
  };

  useEffect(() => {
    if (items.categoryHeading) {
      const category = items.categoryHeading.split(" ")[2]?.toLowerCase();
      if (
        category === "collections" ||
        category === "rooms" ||
        category === "styles" ||
        category === "colours"
      ) {
        setCurrentCategory(category || "");
      } else {
        setCurrentCategory("");
      }
    }
  }, [items.categoryHeading]);

  return (
    <>
      <ul className="space-y-1">
        {items.categoryData?.map((value) => (
          <li
            key={value.label}
            className="text-md font-bold p-2 cursor-pointer"
            onClick={() => handleClick(value)}
          >
            {value.image === undefined ? (
              <>{value.label}</>
            ) : (
              <>
                {/* <Image src={src} alt="image" width={50} height={50} /> */}
                <div className="flex  ">
                  <img
                    src={value.image}
                    alt={value.label}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="pl-4">{value.label}</p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListContent;
