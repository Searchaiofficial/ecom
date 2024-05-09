"use client";
import React, { useEffect, useState } from "react";
import Products from "../../../components/Product/Products";
import "@/components/Product/styles.css";
import Measure from "@/components/Product/meausrement";
import Tabproduct from "@/components/Product/TabsProducts";
import axios from "axios";
import { allSelectedData } from "@/components/Features/Slices/virtualDataSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectedFilteredProduct } from "@/components/Features/Slices/FilteredProduct";
// const hideheader=
const ProductPage = ({ params }) => {
  console.log({ params });
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const filteredProductData = useSelector(selectedFilteredProduct);
  console.log(filteredProductData);

  let parentCategoryVar = params.parentCategory;
  const x = useSelector(allSelectedData);
  console.log(x);

  const isNumericString = (str) => /^\d+$/.test(str);

  // Remove entries with titles that are numeric strings
  const filteredRooms = Object.entries(x.room)
    .filter(([roomId, isSelected]) => isSelected && !isNumericString(roomId))
    .map(([roomId]) => ({ title: roomId }));
  const filteredStyle = Object.entries(x.style)
    .filter(([styleId, isSelected]) => isSelected && !isNumericString(styleId))
    .map(([styleId]) => ({ title: styleId }));
  const filteredSubcategory = Object.entries(x.subcategory)
    .filter(
      ([productId, isSelected]) => isSelected && !isNumericString(productId)
    )
    .map(([productId]) => ({ title: productId }));
  const filteredColors = Object.entries(x.color)
    .filter(([color, isSelected]) => isSelected && !isNumericString(color))
    .map(([color]) => ({ title: color }));

  const transformedData = {
    category: x.category.category,
    rooms: filteredRooms,
    style: filteredStyle,
    subcategory: filteredSubcategory,
    price: [{ Label: x.budget.toString() }],
    colors: filteredColors,
  };
  const router = useRouter();
  const requestData = JSON.stringify({ transformedData });

  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    if (params.parentCategory === "virtualexperience") {
      if (x.length > 0) {
        router.push("/virtualexperience/category");
      }
      const fetchVeProducts = async () => {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getVEFilter`;
          const response = await axios.post(apiUrl, x, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setFilteredProducts(response.data); // Save the filtered products in state
        } catch (error) {
          console.error("Error fetching filtered products:", error);
        }
      };
      fetchVeProducts();
      console.log("ve products");
    } else {
      const fetchCategoryDescription = async () => {
        console.log("Category: data", params.parentCategory);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryDescription/${params.parentCategory}`;
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCategoryDescription(response.data);
      };
      fetchCategoryDescription();
      dispatch({
        type: "FETCH_FILTER_PRODUCTS",
        payload: {
          parentCategoryVar: params.parentCategory,
          cat: params.cat,
        },
      });
      // }
    }
  }, [params.parentCategory, params.cat]);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsFilterVisible(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* {isFilterVisible && <Header />} */}
      {/* <Products
        filteredProductData={filteredProductData}
        heading={x?.category?.category}
      /> */}
      <Tabproduct
        filteredProductData={
          params.parentCategory === "virtualexperience"
            ? filteredProducts
            : filteredProductData
        }
        // heading={x?.category?.category}
        heading={params.heading}
        categoryName={params.parentCategory}
        description={categoryDescription}
        param={params.parentCategory}
      />
      {/* <Measure filteredProductData={filteredProductData} /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductPage;
