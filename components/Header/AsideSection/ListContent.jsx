import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ListContent = ({ parentCategory, items }) => {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState('');

  const handleClick = (value) => {
    const newPath = `/${parentCategory}/${currentCategory}/${value.text}`;
    router.push(newPath);
  };

  useEffect(() => {
    if (items.categoryHeading) {
      const category = items.categoryHeading.split(' ')[2]?.toLowerCase();
      if (category === 'collections' || category === 'rooms' || category === 'styles' || category === 'colours') {
        setCurrentCategory(category || '');
      } else {
        setCurrentCategory('');
      }
    }
  }, [items.categoryHeading]);

  return (
    <>
      <ul className="space-y-1">
        {items.categoryData.map((value) => (
          <li key={value.id} className="text-md font-bold p-2" onClick={() => handleClick(value)}>
            {value.image === undefined ? (
              <>{value.text}</>
            ) : (
              <>
                {/* <Image src={src} alt="image" width={50} height={50} /> */}
                <div className="flex  ">
                  <img
                    src={value.image}
                    alt="pic"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="pl-4">{value.text}</p>
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
