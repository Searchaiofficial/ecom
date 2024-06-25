"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData } from "../Features/Slices/roomSlice";
import { selectQuantity, updateQuantity } from "../Features/Slices/calculationSlice";
import { setDbItems } from "../Features/Slices/cartSlice";
import Link from "next/link";
import axios from "axios";
import Emptycart from "./EmptyCart";
import CartProduct from "./Main/CartProduct";

const AddCart = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.rooms.selectedActivity);
  const roomData = useSelector(selectRoomData);
  console.log(roomData);
  const quantity = useSelector(selectQuantity);
  const [cartdata, setcartdata] = useState("");
  const [cartStatus, setCartStaus] = useState("");
  const dbItems = useSelector((state) => state.cart.dbItems);

  let id;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("deviceId");
    console.log(id);
  }
  const fetchData = async () => {
    try {
      setCartStaus("loading");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          params: {
            deviceId: id,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("HTTP status " + response.status);
      }
      const data = response.data;
      setcartdata(data);
      setCartStaus("succeeded");
      console.log(data)
      dispatch(setDbItems(data));
    } catch (error) {
      setCartStaus("failed");
    }
  };

  useEffect(() => {

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated cartdata", cartdata);
    console.log("Updated cartStatus", cartStatus);
  }, [cartdata, cartStatus]);

  let totalPrice = 0;
  let quantities = 0;


  let totalServicesPrice = 0;

  if (cartStatus === "succeeded" && cartdata) {
    totalServicesPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) => serviceTotal + parseFloat(service.cost * service.quantity),
        0
      );
      return (total + serviceTotalCost);
    }, 0);
  }

  console.log(cartdata)

  console.log(totalServicesPrice)

  let totalAccessoryPrice = 0;

  if (cartStatus === "succeeded" && cartdata) {
    totalAccessoryPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedAccessories.reduce(
        (serviceTotal, service) => serviceTotal + parseFloat(service.perUnitPrice * service.quantity),
        0
      );
      return total + serviceTotalCost;
    }, 0);
  }

  console.log(totalAccessoryPrice)


  let SumtotalPrice = 0;

  if (cartStatus === "succeeded" && cartdata) {
    SumtotalPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) => serviceTotal + parseFloat(service.cost * service?.quantity),
        0
      );
      const accessoriesTotalCost = item.selectedAccessories.reduce(
        (accessoryTotal, accessory) => accessoryTotal + parseFloat(accessory.totalPrice * accessory?.quantity),
        0
      );
      const itemTotalPrice = (item.productId.totalPrice + serviceTotalCost + accessoriesTotalCost) * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  }

  if (cartStatus === "succeeded" && cartdata && cartdata.items) {
    totalPrice = cartdata.items.reduce((total, item) => {
      return total + (item?.productId?.totalPrice || 0) * (item?.quantity || 0);
    }, 0);
    quantities = cartdata.items.reduce((total, item) => {
      return total + (item?.quantity || 0);
    }, 0);
  }



  const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;
  const postData = {
    deviceId: id,
    productId: roomData._id,
    quantity: quantity,
  };

  const quantityCart = useSelector(selectQuantity);

  const handleDelete = async (itemid) => {
    console.log(itemid);
    try {
      const response = await axios.delete(postUrl, {
        params: {
          owner: id,
          productId: itemid,
        },
      });

      console.log(response.data)

      if (response.status !== 200) {
        console.error("HTTP status", response.status);
      }

      const updatedItems = cartdata.items.filter(
        (item) => item.productId._id !== itemid
      );

      // Check if there are no items left
      if (updatedItems.length === 0) {
        // If no items left, update state to indicate an empty cart
        setcartdata(null); // or set to an empty object depending on your state structure
      } else {
        // If items are left, update the state with remaining items
        setcartdata((prevstate) => ({
          ...prevstate,
          items: updatedItems,
        }));
      }

      dispatch(setDbItems(response.data));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  console.log(cartdata);

  const handleItemDelete = async (productId) => {
    console.log(productId)
    console.log(id)
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          params: {
            owner: id,
            productId: productId,
          },
        }
      );
      console.log(response.data)
      if (response.status === 200) {
        setCartStaus("succeeded");
        fetchData();
        // dispatch(setDbItems(response.data));
        dispatch(setDbItems(response.data));
      }
    } catch (error) {
      setCartStaus("failed");
      console.error("Error while deleting product:", error);
    }
  };

  async function updateQuantityInDatabase(productId, quantity) {
    const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;
    const postData = {
      deviceId: id,
      productId: productId,
      quantity: quantity,
    };
    try {
      const response = await axios.put(postUrl, postData);
      if (response.status === 200) {
        fetchData();
        setCartStaus("succeeded");
      }

      // Reload cart data after updating quantity in the database
    } catch (error) {
      // setloading("failed");
      setCartStaus("failed");
      console.error("Error updating quantity in database:", error);
    }
  }

  function handleItemIncr(productId, quantity) {
    let quant = quantity + 1;
    updateQuantityInDatabase(productId, quant);
  }

  function handleItemDecr(productId, quantity) {
    let quant = quantity - 1;
    if (quant < 1) {
      handleItemDelete(productId);
    }
    updateQuantityInDatabase(productId, quant);
  }

  const updateServiceQuantity = async (productId, serviceId, Quant) => {
    const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/service/quantity`;
    const postData = {
      deviceId: id,
      productId: productId,
      serviceId: serviceId,
      quantity: Quant,
    };

    try {
      const response = await axios.post(postUrl, postData);
      if (response.status === 200) {
        fetchData();
        setCartStaus("succeeded");
      }
      // Reload cart data after updating quantity in the database
    } catch (error) {
      // setloading("failed");
      setCartStaus("failed");
      console.error("Error updating quantity in database:", error);
    }
  }

  const handleServiceIncrease = (productId, serviceId, quantity) => {

    let Quant = quantity + 1
    updateServiceQuantity(productId, serviceId, Quant)
  }

  const handleServiceDecrease = (productId, serviceId, quantity) => {
    let Quant = quantity - 1
    if (Quant > 0) {
      updateServiceQuantity(productId, serviceId, Quant)
    }
  }

  const updateAccessoryQuantity = async (productId, accessoryId, Quant) => {
    const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/accessory/quantity`;
    const postData = {
      deviceId: id,
      productId: productId,
      accessoryId: accessoryId,
      quantity: Quant,
    };
    console.log(postData)
    try {
      const response = await axios.post(postUrl, postData);
      console.log(response.data)
      if (response.status === 200) {

        fetchData();
        // setcartdata(response.data)
        setCartStaus("succeeded");
      }
      // Reload cart data after updating quantity in the database
    } catch (error) {
      // setloading("failed");
      setCartStaus("failed");
      console.error("Error updating quantity in database:", error);
    }
  }


  const handleAccessoriesIncrease = (productId, accessoryId, quantity) => {
    let Quant = quantity + 1
    console.log(Quant)
    updateAccessoryQuantity(productId, accessoryId, Quant)
  }
  const handleAccessoriesDecrease = (productId, accessoryId, quantity) => {
    let Quant = quantity - 1
    console.log(Quant)
    if (Quant > 1) {
      updateAccessoryQuantity(productId, accessoryId, Quant)
    }

  }

  return (
    <div className="px-[67px]">
      <div className="main-cart flex  sm:flex-row flex-col justify-between gap-10  sm:items-start items-center min-h-screen relative top-32 pb-20">
        {cartStatus === "loading" && <p>Loading...</p>}
        {cartStatus === "failed" && <p>Error loading data from DB.</p>}
        {cartStatus === "succeeded" && cartdata ? (
          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-6">Bag</h1>
            {cartdata && cartdata.items && cartdata.items.map((item) => (
              <CartProduct
                cartItem={item}
                handleItemDelete={handleItemDelete}
                handleItemIncr={handleItemIncr}
                handleItemDecr={handleItemDecr}
                handleServiceIncrease={handleServiceIncrease}
                handleServiceDecrease={handleServiceDecrease}
                handleAccessoriesIncrease={handleAccessoriesIncrease}
                handleAccessoriesDecrease={handleAccessoriesDecrease}

              />
            ))}

          </div>
        ) : (
          <>
            {/* <p>No data is available here. Please add some item in cart page.</p> */}
            <Emptycart />
          </>
        )}
        {cartStatus === "succeeded" && cartdata && (
          <div className="right-cart flex flex-col sm:w-1/3 w-[90vw] p-4 ">
            <h1 className="text-xl font-semibold mb-6">
              Order Summary
            </h1>
            <div className="subtotal flex justify-between items-center mb-3 opacity-70">
              <div className="text-base">Product price</div>
              <div className="text-base font-bold flex">
                <Image
                  src="/icons/indianrupeesicon.svg"
                  width={20}
                  height={20}
                  alt="rupees"
                />
                {totalPrice}
              </div>
            </div>
            <div className="subtotal flex justify-between items-center mb-3 opacity-70">
              <div className="text-base">Services price</div>
              <div className="text-base font-bold flex">
                <Image
                  src="/icons/indianrupeesicon.svg"
                  width={20}
                  height={20}
                  alt="rupees"
                />
                {totalServicesPrice}
              </div>
            </div>
            <div className="subtotal flex justify-between items-center mb-3 opacity-70">
              <div className="text-base">Accessories price</div>
              <div className="text-base font-bold flex">
                <Image
                  src="/icons/indianrupeesicon.svg"
                  width={20}
                  height={20}
                  alt="rupees"
                />
                {totalAccessoryPrice}
              </div>
            </div>
            <div className="deliveryCharges flex justify-between items-center mb-4 opacity-70">
              <div className="text-base">Delivery Charges</div>
              <div className="text-base font-bold flex">
                {/* <Image
                  src="/icons/indianrupeesicon.svg"
                  width={18}
                  height={18}
                  alt="rupees"
                /> */}
                <span>-</span>
              </div>
            </div>
            <hr className="my-4 border-black border-[1px]" />
            <div className="total flex justify-between items-center mb-6">
              <div className="text-lg font-semibold">
                Total
              </div>
              <div className="text-3xl font-semibold flex">
                <Image
                  src="/icons/indianrupeesicon.svg"
                  width={25}
                  height={25}
                  alt="rupees"
                />
                {SumtotalPrice}
              </div>
            </div>
            <div className="text-sm mb-4">Quantity: {quantities}</div>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "cart",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white w-full sm:w-[40vw] sm:h-14 h-9 rounded-full hover:bg-gray-900 transition duration-300">
                Guest Checkout
              </button>
            </Link>
            <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "cart",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white w-full sm:w-[40vw] sm:h-14 h-9 rounded-full hover:bg-gray-900 transition duration-300">
                Member Checkout
              </button>
            </Link>
          </div>

        )}
      </div>
      <div className="middle-cart">
        {selectedItems && Object.values(selectedItems).map((item) => (
          <div key={item.id} className="cartitem flex mb-6 border-b pb-4">
            <div className="img w-48 h-48 mr-8">
              <img
                src={item?.image}
                className="w-full h-full object-cover rounded-md"
                alt={item?.title}
              />
            </div>
            <div className="cartContent flex flex-col justify-between">
              <div className="mainright">
                <div className="leftContent flex flex-col">
                  <h2 className="sm:text-xl text-lg sm:font-semibold font-medium  mb-2">
                    {item?.title}
                  </h2>
                  <h3 className="text-gray-600">{item?.category}</h3>
                </div>
                <div className="flex rightContent sm:text-xl text-lg sm:font-semibold font-medium">
                  <Image
                    src="/icons/indianrupeesicon.svg"
                    width={20}
                    height={15}
                    alt="rupees"
                    className=""
                  />{item?.price}
                </div>
                <div className="icons flex items-center space-x-2 mt-4 justify-around">
                  <img
                    src="/icons/delete-icon.svg"
                    alt="delete"
                    className="w-6 h-6 hover:text-slate-500 cursor-pointer "
                  />
                  <img
                    src="/icons/info.svg"
                    alt="broken heart"
                    className="text-red-700 hover:text-red-500 cursor-pointer w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCart;
