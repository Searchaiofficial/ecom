"use client"
import React, { act, useEffect, useState } from "react";
import "@/components/Product/styles.css";
import Tabproduct from "@/components/Product/TabsProducts";
import axios from "axios";
import { allSelectedData } from "@/components/Features/Slices/virtualDataSlice";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredProductCurrentPage, selectTotalPages, selectedFilteredProduct, setFilteredProductCurrentPage } from "@/components/Features/Slices/FilteredProduct";
import {
  selectOfferProductCurrentPage,
  selectOfferProducts,
  selectOfferProductsStatus,
  selectOfferTotalPages,
  selectofferProductItemsPerPage,
  setOfferProductCurrentPage,
} from "@/components/Features/Slices/offerProductsSlice";
import {
  selectDemandTypeProducts,
  selectDemandTypeProductsStatus,
} from "@/components/Features/Slices/demandTypeProductsSlice";

const ProductPage = ({ params }) => {
  // const [parentCategory, setParentCategory] = useState(params.parentCategory.replace(/-/g, " "))
  const parentCategory = params.parentCategory.replace(/-/g, " ")
  // console.log(parentCategory.replace(/-/g, " "))
  let queryString;
  if (typeof window !== "undefined") {
    queryString = window.location.search;
  }

  // const [products, setProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const queryParams = {};
    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }
    return queryParams;
  };
  const queryParams = parseQueryString(queryString);
  const demandtype = queryParams?.demandtype;

  const pathname = usePathname();
  const [type, setType] = useState(params.cat.replace(/-/g, " "));
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const currentPage = useSelector(selectFilteredProductCurrentPage)

  let offerProduct = useSelector(selectOfferProducts);
  console.log(offerProduct.length)
  let offerProductData = offerProduct;
  const [allTypes, setAllTypes] = useState([]);
  const [selectedOfferCategory, setSelectedOfferCategory] = useState("");
  let offerCategory;
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


  useEffect(() => {
    if (offerProductData.length === 0) offerProductData = offerProductData;
  }, [type]);

  let demandTypeProduct = useSelector(selectDemandTypeProducts);
  const dispatch = useDispatch();
  let filteredProductData = useSelector(selectedFilteredProduct);

  console.log(filteredProductData?.length)


  let parentCategoryVar = parentCategory;
  const x = useSelector(allSelectedData);

  const isNumericString = (str) => /^\d+$/.test(str);

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
    if (parentCategory === "offers") {
      if (params.cat === "all") {
        setType("all");
      }
    }
  }, []);

  const handleSetItem = (label) => {
    const newItem = { label: label, href: pathname };
    sessionStorage.setItem("navigationItem", JSON.stringify(newItem));
  };




  useEffect(() => {
    if (parentCategory === "offers") {
      handleSetItem("Offers");
      const encodedType = encodeURI(type);
      dispatch({
        type: "FETCH_PRODUCTS_FROM_OFFER",
        payload: encodedType
      });



      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllOffers`;
      const fetchAllOfferAndProducts = async () => {
        const response = await axios.get(url);
        setAllTypes(response.data.map((item) => item.type));
      };

      fetchAllOfferAndProducts();
    } else if (parentCategory === "demandtype") {
      handleSetItem("Demand Type");
      const encodedType = encodeURI(type);
      dispatch({
        type: "FETCH_PRODUCTS_FROM_DEMAND_TYPE",
        payload: encodedType
      });

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllDemandTypes`;
      const fetchAllDemandType = async () => {
        const response = await axios.get(url);
        setAllTypes(response.data.map((item) => item.type));
      };
      fetchAllDemandType();
    } else if (parentCategory === "virtualexperience") {
      handleSetItem("Free Sample");
      if (x.length > 0) {
        router.push("/virtualexperience");
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
    } else if (params.heading === "category" && type === "all") {
      handleSetItem("Products");
      dispatch({
        type: "FETCH_FILTER_PRODUCTS",
        payload: {
          heading: params.heading,
          parentCategoryVar: parentCategory,
        },
      });
      if (!category.name) {
        const fetchCategoryData = async () => {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${parentCategory}`;
          const response = await axios.get(apiUrl, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setCategory(response.data);
        };
        fetchCategoryData();
      }
    } else {
      handleSetItem("Products");
      if (!category.name) {
        const fetchCategoryData = async () => {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getCategoryByName/${parentCategory}`;
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
          parentCategoryVar: parentCategory,
          cat: type,
        },
      });
    }
  }, [parentCategory, params.cat, type]);

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

  if (queryParams) {
    if (queryParams.demandtype) {
      if (offerProductData.length > 0)
        offerProductData = offerProductData?.filter(
          (product) =>
            product.demandtype.toLowerCase() === demandtype.toLowerCase()
        );
      if (filteredProductData.length > 0)
        filteredProductData = filteredProductData?.filter(
          (product) =>
            product.demandtype.toLowerCase() === demandtype.toLowerCase()
        );
      if (demandTypeProduct.length > 0)
        demandTypeProduct = demandTypeProduct?.filter(
          (product) =>
            product.demandtype.toLowerCase() === demandtype.toLowerCase()
        );
    }
    if (queryParams.offer) {
      if (offerProductData.length > 0)
        offerProductData = offerProductData?.filter(
          (product) =>
            product.offer.toLowerCase() === offer.toLowerCase()
        );
      if (filteredProductData.length > 0)
        filteredProductData = filteredProductData?.filter(
          (product) =>
            product.offer.toLowerCase() === offer.toLowerCase()
        );
      if (demandTypeProduct.length > 0)
        demandTypeProduct = demandTypeProduct?.filter(
          (product) =>
            product.offer.toLowerCase() === offer.toLowerCase()
        );
    }
  }

  // useEffect(() => {
  //   // Example: Dispatch initial action to fetch filtered products
  //   dispatch({
  //     type: "FETCH_FILTER_PRODUCTS",
  //     payload: {
  //       heading: params.heading,
  //       parentCategoryVar: params.parentCategory.replace(/-/g, " "),
  //       cat: params.cat,
  //     },
  //   });
  // }, [dispatch]);

  const totalPages = useSelector(selectTotalPages)
  const totalPagesOffer = useSelector(selectOfferTotalPages)

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    console.log(parentCategory)
    if (parentCategory === "offers") {
      dispatch(setOfferProductCurrentPage(pageNumber));
      handleSetItem("Offers");
      const encodedType = encodeURI(type);
      dispatch({
        type: "FETCH_PRODUCTS_FROM_OFFER",
        payload: encodedType
      });
    }

    dispatch(setFilteredProductCurrentPage(pageNumber));
    dispatch({
      type: "FETCH_FILTER_PRODUCTS",
      payload: {
        heading: "category",
        parentCategoryVar: params.parentCategory.replace(/-/g, " "),
      },
    });
  };

  // const currentItems = filteredProductData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // console.log(filteredProductData.length)
  // const newFilteredData = filteredProductData.filter(product => product.subcategory !== "Accessories ")
  // console.log(newFilteredData.length)

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
              ? type === "all"
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
          currentPage={currentPage}
          totalPages={params.parentCategory === "offers"
            ? totalPagesOffer
            : totalPages
          }
          onPageChange={handlePageChange}
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
