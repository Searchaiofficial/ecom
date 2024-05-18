"use client";
import React, { useEffect, useState } from "react";
import "@/components/Product/styles.css";
import Tabproduct from "@/components/Product/TabsProducts";
import axios from "axios";
import { allSelectedData } from "@/components/Features/Slices/virtualDataSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectedFilteredProduct } from "@/components/Features/Slices/FilteredProduct";

import {
  selectOfferProducts,
  selectOfferProductsStatus,
} from "@/components/Features/Slices/offerProductsSlice";

import {
  selectDemandTypeProducts,
  selectDemandTypeProductsStatus,
} from "@/components/Features/Slices/demandTypeProductsSlice";

// const hideheader=
const ProductPage = ({ params }) => {
  const [type, setType] = useState(
    params.cat.replace(/-/g, " ")
    // params.cat.replace(/percent-/g, "% ")
  );
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Offers
  let offerProduct = useSelector(selectOfferProducts);
  let offerProductData = offerProduct;
  const offerProductStatus = useSelector(selectOfferProductsStatus);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedOfferCategory, setSelectedOfferCategory] = useState("");
  let offerCategory;
  console.log("offerProduct", offerProductData);
  if (params.parentCategory === "offers" && offerProductData.length > 0) {
    offerCategory = offerProductData.map((product) => product.category);
    if (offerCategory.length > 0) offerCategory = [...new Set(offerCategory)];

    if (selectedOfferCategory) {
      offerProductData = offerProductData.filter(
        (product) => product.category === selectedOfferCategory
      );
    }
  }

  useEffect(() => {
    offerProductData = offerProduct;
  }, [type]);
  // if(params.parentCategory === "offers" && offerProductData.length > 0 && selectedOfferCategory) {
  //   offerProductData = offerProductData.filter((product) => product.category === selectedOfferCategory);
  // }

  useEffect(() => {
    if (offerProductData.length === 0) offerProductData = offerProductData;
  }, [type]);

  // DemandType
  const demandTypeProduct = useSelector(selectDemandTypeProducts);
  const demandTypeProductStatus = useSelector(selectDemandTypeProductsStatus);

  const dispatch = useDispatch();
  const filteredProductData = useSelector(selectedFilteredProduct);

  let parentCategoryVar = params.parentCategory;
  const x = useSelector(allSelectedData);

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

  const [category, setCategory] = useState({});

  useEffect(() => {
    if (params.parentCategory === "offers") {
      if (params.cat === "all") {
        setType("highest");
      }
    }
  }, []);

  useEffect(() => {
    if (params.parentCategory === "offers") {
      const encodedType = encodeURI(type);
      dispatch({
        type: "FETCH_PRODUCTS_FROM_OFFER",
        payload: encodedType,
      });

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllOffers`;
      const fetchAllOfferAndProducts = async () => {
        const response = await axios.get(url);
        setAllTypes(response.data.map((item) => item.type));
      };

      fetchAllOfferAndProducts();
    } else if (params.parentCategory === "demandtype") {
      const encodedType = encodeURI(type);
      dispatch({
        type: "FETCH_PRODUCTS_FROM_DEMAND_TYPE",
        payload: encodedType,
      });

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllDemandTypes`;
      const fetchAllDemandType = async () => {
        const response = await axios.get(url);
        setAllTypes(response.data.map((item) => item.type));
      };
      fetchAllDemandType();
    } else if (params.parentCategory === "virtualexperience") {
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
      if (!category.name) {
        const fetchCategoryData = async () => {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${params.parentCategory}`;
          const response = await axios.get(apiUrl, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setCategory(response.data);
        };
        fetchCategoryData();
      }
      dispatch({
        type: "FETCH_FILTER_PRODUCTS",
        payload: {
          parentCategoryVar: params.parentCategory.replace(/-/g, " "),
          cat: type,
        },
      });
    }
  }, [params.parentCategory, params.cat, type]);

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
    <>
       {/* ( */}
        <div>
          <Tabproduct
            filteredProductData={
              params.parentCategory === "virtualexperience"
                ? filteredProducts
                : params.parentCategory === "offers"
                ? offerProductData
                : params.parentCategory === "demandtype"
                ? demandTypeProduct
                : filteredProductData
            }
            heading={
              params.parentCategory === "offers"
                ? type === "highest"
                  ? "Highest Offer"
                  : type
                : params.parentCategory === "demandtype"
                ? type
                : category.name
            }
            description={category?.description}
            subCategory={category?.subcategories}
            allTypes={allTypes}
            parentCategory={params.parentCategory}
            offerCategory={offerCategory}
            setType={setType}
            setSelectedOfferCategory={setSelectedOfferCategory}
          />
        </div>
      {/* ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl">No Products Found</h1>
        </div>
      )} */}
    </>
  );
};

export default ProductPage;
