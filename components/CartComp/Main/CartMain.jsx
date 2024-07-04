"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomData } from "../../Features/Slices/roomSlice";
import {
  pickupType,
  schedularToogle,
  selectPickupOption,
  selectQuantity,
  selectSchedular,
  updateQuantity,
} from "../../Features/Slices/calculationSlice";
import { selecteddbItems, setDbItems } from "../../Features/Slices/cartSlice";
import Link from "next/link";
import axios from "axios";
import CartProduct from "./CartProduct";
import { ArrowRight, X } from "lucide-react";
import { getPinFromCoordinates } from "@/utils/getPinFromCoordinates";
import { upsertUserLocation } from "@/components/Features/api";
const CartMain = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(selecteddbItems);
  const roomData = useSelector(selectRoomData);
  const quantity = useSelector(selectQuantity);
  const [cartdata, setcartdata] = useState("");
  const [cartStatus, setCartStaus] = useState("");
  const [sideMenu, setSideMenu] = useState(false);
  const [pickup, setPickup] = useState("");
  const [schedular, setSchedular] = useState(false);

  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    // console.log(id);
  }

  const handlePickupType = (value) => {
    setPickup(value);
    // console.log(value);
    dispatch(pickupType(value));
  };

  const handleSchedular = (value) => {
    setSchedular(value);
    console.log(value);
    dispatch(schedularToogle(value));
  };



  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`,
        {
          params: {
            deviceId: id,
          },
        }
      );
      // console.log(response);
      if (response.status !== 200) {
        throw new Error("HTTP status " + response.status);
      }
      const data = response.data;
      setcartdata(data);
      setCartStaus("succeeded");
      dispatch(setDbItems(data));
    } catch (error) {
      // console.error("Error Fetching data from DB : ", error);
      setCartStaus("failed");
    }
  };

  useEffect(() => {
    setCartStaus("loading");
    fetchData();
  }, []);

  console.log(cartdata)

  let totalPrice = 0;

  if (cartStatus === "succeeded" && selectedItems) {
    totalPrice = selectedItems.items.reduce((total, item) => {
      // const serviceTotalCost = item.selectedServices.reduce(
      //   (serviceTotal, service) => serviceTotal + parseFloat(service.cost),
      //   0
      // );
      // const accessoriesTotalCost = item.selectedAccessories.reduce(
      //   (accessoryTotal, accessory) => accessoryTotal + parseFloat(accessory.totalPrice),
      //   0
      // );
      const itemTotalPrice = (item.productId.totalPrice) * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  }
  let SumtotalPrice = 0;

  if (cartStatus === "succeeded" && selectedItems) {
    SumtotalPrice = selectedItems.items.reduce((total, item) => {
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

  let totalServicesPrice = 0;

  if (cartStatus === "succeeded" && selectedItems) {
    totalServicesPrice = selectedItems.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) => serviceTotal + parseFloat(service.cost * service.quantity),
        0
      );
      return (total + serviceTotalCost);
    }, 0);
  }

  console.log(selectedItems)

  console.log(totalServicesPrice)

  let totalAccessoryPrice = 0;

  if (cartStatus === "succeeded" && selectedItems) {
    totalAccessoryPrice = selectedItems.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedAccessories.reduce(
        (serviceTotal, service) => serviceTotal + parseFloat(service.perUnitPrice * service.quantity),
        0
      );
      return total + serviceTotalCost;
    }, 0);
  }

  console.log(totalAccessoryPrice)

  //delete items from DB
  const postUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart`;
  const postData = {
    deviceId: id,
    productId: roomData._id,
    quantity: quantity,
  };

  const quantityCart = useSelector(selectQuantity);

  //delete handle function
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

        await fetchData();
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

  const handleAccessoriesIncrease = (productId, accessoryId, quantity) => {
    let Quant = quantity + 1
    console.log(Quant)
    updateAccessoryQuantity(productId, accessoryId, Quant)
  }
  const handleAccessoriesDecrease = (productId, accessoryId, quantity) => {
    let Quant = quantity - 1
    console.log(Quant)
    if (Quant >= 1) {
      updateAccessoryQuantity(productId, accessoryId, Quant)
    }

  }

  function handleItemIncr(productId, quantity) {
    let quant = quantity + 1;
    updateQuantityInDatabase(productId, quant);
  }

  function handleItemDecr(productId, quantity) {
    let quant = quantity - 1;
    if (quant >= 1) {
      handleItemDelete(productId);
    }
    updateQuantityInDatabase(productId, quant);
  }

  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userPincode, setUserPincode] = useState(null);

  useEffect(() => {
    localStorage?.getItem("userCoordinates") &&
      setUserCoordinates(JSON.parse(localStorage.getItem("userCoordinates")));
  }, []);

  useEffect(() => {
    if (localStorage?.getItem("userPincode")) {
      setUserPincode(localStorage.getItem("userPincode"));
    } else if (userCoordinates) {
      getPinFromCoordinates(userCoordinates.lat, userCoordinates.lng).then(
        (data) => {
          if (data) {
            setUserPincode(data);
            localStorage.setItem("userPincode", data);

            const deviceId = localStorage.getItem("deviceId");

            upsertUserLocation({
              deviceId,
              pincode: pin,
              lat: userCoordinates.lat,
              lng: userCoordinates.lng,
            })
              .then(() => {
                console.log("User location saved");
              })
              .catch((error) => {
                console.error(`Error saving user location: ${error.message}`);
              });
          }
        }
      );
    }
  }, [userCoordinates]);

  return (
    <>
      {sideMenu && (
        <>
          <div
            initial={
              typeof window !== "undefined" &&
              window.innerWidth <= 800 && { x: 300, opacity: 0 }
            }
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: "just" }}
            className="fixed inset-0 flex flex-col px-[8px] overflow-y-hidden bg-white z-[100000] md:hidden"
          >
            <div className="flex justify-between items-center py-[5px] w-full h-fit mb-4">
              <div className=" flex items-center justify-start ">
                <div className="mainlogo">
                  <Link href="/">
                    <Image
                      src="/images/ayatriologo.webp"
                      alt="logo"
                      width={300}
                      height={40}
                      priority
                      className="p-2  sm:w-44"
                    />
                  </Link>
                </div>
              </div>

              <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer md:hidden">
                <X onClick={() => setSideMenu(false)} />
              </div>
            </div>
            <div className="flex flex-col p-2">
              <h1 className="text-lg font-bold">
                How would you like to check out?
              </h1>
              <ul className="list-disc">
                <h3 className="text-[18px] font-bold mt-2 mb-2">
                  Join Ayatrio Family for free
                </h3>
                <div className="ml-8">
                  <li>Get instant benefits</li>
                  <li>Keep track of your orders</li>
                  <li>Save time during checkout</li>
                </div>
              </ul>
              <Link
                href={"#"}
                className=" border-2 border-black  h-10 mt-20  w-[98%] rounded-full flex items-center font-bold justify-center  text-black"
              >
                Log in or sign up
              </Link>
              <hr className="border border-black" />
              <Link
                href={{
                  pathname: "/checkout/pin",
                  query: { search: "rooms" },
                }}
                className="border-2 h-10 w-[98%] text-white bg-black font-bold rounded-full flex items-center justify-center border-black"
              >
                Continue as guest
              </Link>
            </div>

            {/* <div className="flex"> */}

            {/* </div> */}
          </div>
        </>
      )}

      <div className=" px-[20px] lg:px-[67px] pt-[6rem] pb-[3rem] ">
        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10">
          <div className="lg:col-span-8 col-span-1">
            {/* <!-- parent div --> */}
            <div className="py-2 ">
              {/* <!-- header section --> */}
              <div className="flex justify-between items-center lg:mb-10 mb-5 ">
                <h1 className=" text-[#111111] leading-[1.33] tracking-tight text-xl font-semibold mb-6">
                  Shopping Details
                </h1>
                <div className="cursor-pointer hover:bg-gray-400 box-border rounded-xl">
                  <svg
                    focusable="false"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className=""
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.5 12c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zm5.0039 0c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5.6716-1.5 1.5-1.5 1.5.6716 1.5 1.5zM17 13.5c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5z"
                    ></path>
                  </svg>
                </div>
              </div>
              {/* <!-- Address pin  --> */}
              <div className="flex h-11 w-48">
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="cart-ingka-svg-icon"
                  aria-hidden="true"
                >
                  <path d="M12.0001 11.2157c1.1046 0 2-.8954 2-2s-.8954-2-2-2c-1.1045 0-2 .8954-2 2s.8955 2 2 2z"></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0001 21.3736c3.7444-2.5044 7.4025-6.5319 7.4025-11.288 0-4.0031-3.4051-7.4606-7.4121-7.4606-4.0108 0-7.3928 3.4614-7.3928 7.4606 0 4.7571 3.6584 8.7823 7.4024 11.288zm-5.4024-11.288c0-2.9193 2.511-5.4606 5.3928-5.4606 2.8856 0 5.4121 2.5452 5.4121 5.4606 0 3.6054-2.69 6.7393-5.4025 8.8443-2.7125-2.105-5.4024-5.2389-5.4024-8.8443z"
                  ></path>
                  <path d="M14.0001 9.2157c0 1.1046-.8954 2-2 2-1.1045 0-2-.8954-2-2s.8955-2 2-2c1.1046 0 2 .8954 2 2z"></path>
                </svg>
                {userPincode ? (
                  <p className=" ml-3 w-full font-[300] text-[15.5px]">
                    Your pincode: <span className="underline">{userPincode}</span>
                  </p>
                ) : null}
              </div>

              {/* <!-- order text --> */}
              <div className="tracking-wide font-[700] text-[1.09rem] leading-6 mb-4">
                How would you like to receive your order?
              </div>
              {/* <!-- Take option  --> */}
              <div className="flex flex-row gap-5">
                {/* <!-- delivery  --> */}
                <div
                  onClick={() => {
                    handlePickupType("delivery");
                  }}
                  className={`cursor-pointer box-border  border-[1.5px] ${pickup === "delivery" ? "border-black" : "border-[#e5e5e5]"
                    } h-24 w-[50%]`}
                >
                  <div className="flex px-6 py-5 h-24 items-center">
                    <div className="pr-5">
                      <svg
                        focusable="false"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="cart-ingka-svg-icon"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1 4h15v3h3.0246l3.9793 5.6848V18h-2.6567c-.4218 1.3056-1.6473 2.25-3.0933 2.25-1.446 0-2.6715-.9444-3.0932-2.25h-3.9044c-.4217 1.3056-1.6472 2.25-3.0932 2.25S4.4916 19.3056 4.0698 18H1V4zm3.0698 12c.4218-1.3056 1.6473-2.25 3.0933-2.25 1.446 0 2.6715.9444 3.0932 2.25H14V6H3v10h1.0698zM16 14.0007a3.24 3.24 0 0 1 1.2539-.2507c1.446 0 2.6715.9444 3.0933 2.25h.6567v-2.6848L17.9833 9H16v5.0007zM7.163 15.75c-.6903 0-1.25.5596-1.25 1.25s.5597 1.25 1.25 1.25c.6904 0 1.25-.5596 1.25-1.25s-.5596-1.25-1.25-1.25zm10.0909 0c-.6904 0-1.25.5596-1.25 1.25s.5596 1.25 1.25 1.25 1.25-.5596 1.25-1.25-.5596-1.25-1.25-1.25z"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-[700] text-[1rem] leading-[1.571rem]">
                      Delivery
                    </div>
                  </div>
                </div>
                {/* <!-- collect --> */}
                <div
                  onClick={() => {
                    handlePickupType("collect");
                  }}
                  className={`cursor-pointer box-border border-[1.5px] ${pickup === "collect" ? "border-black" : "border-[#e5e5e5]"
                    } h-24 w-[50%]`}
                >
                  <div className="flex px-6 py-5 h-24 items-center">
                    <div className="pr-5">
                      <svg
                        focusable="false"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="cart-ingka-svg-icon"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21 4H1v16h15V10H6v8H3V6h16v7.1707c-1.1652.4118-2 1.5231-2 2.8293v3c0 1.6569 1.3431 3 3 3s3-1.3431 3-3v-3c0-1.3062-.8348-2.4175-2-2.8293V4zM8 18h2v-6H8v6zm6 0h-2v-6h2v6zm5-2c0-.5523.4477-1 1-1s1 .4477 1 1v3c0 .5523-.4477 1-1 1s-1-.4477-1-1v-3z"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-[700] text-[1rem] leading-[1.571rem]">
                      Collect
                    </div>
                  </div>
                </div>
              </div>
              {/*  code */}
              {cartStatus === "loading" && <p>Loading...</p>}
              {cartStatus === "failed" && <p>Error loading data from DB.</p>}
              {cartStatus === "succeeded" && cartdata ? (
                cartdata.items.map((item, index) => {
                  return (
                    <CartProduct
                      cartItem={item}
                      key={index}
                      cartStatus={cartStatus}
                      id={id}
                      setCartStaus={setCartStaus}
                      handleItemDecr={handleItemDecr}
                      handleItemIncr={handleItemIncr}
                      handleItemDelete={handleItemDelete}
                      handleServiceIncrease={handleServiceIncrease}
                      handleServiceDecrease={handleServiceDecrease}
                      handleAccessoriesIncrease={handleAccessoriesIncrease}
                      handleAccessoriesDecrease={handleAccessoriesDecrease}
                    />
                  );
                })
              ) : (
                <>
                  <div className="p-10">
                    <h1 className="text-2xl font-bold">No Item added</h1>
                    <p>
                      No data is available here. Please add some item in cart
                      page
                    </p>
                    <div className="box-border font-bold border-2 bg-sky-800 text-white p-4 rounded-lg h-20 w-[40%] flex items-center justify-between">
                      <a className=" font-[700] text-xl  " href="/">
                        Continue Shopping
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="">{/* CART1 */}</div>
          </div>

          {cartStatus === "loading" && <p>Loading...</p>}
          {cartStatus === "failed" && <p>Error loading data from DB.</p>}
          {cartStatus === "succeeded" && cartdata && (
            <div className="lg:col-span-4  bg-white  border-gray-300 rounded-lg  overflow-hidden pt-[0.6rem]  text-black ">
              <h2 className="text-[16px] pb-3 font-bold ">Order summary</h2>
              <div className="flex items-center justify-between  border-slate-500 pb-3 ">
                <span className="text-[#767677]">Products price </span>
                <div className="text-black font-[700]">
                  <div className="flex items-center">
                    <Image
                      src="/icons/indianrupeesicon.svg"
                      width={18}
                      height={18}
                      alt="rupees"
                      className="mr-1"
                      loading="lazy"

                    />
                    {totalPrice}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between  border-slate-500 pb-3 ">
                <span className="text-[#767677]">Services price </span>
                <div className="text-black font-[700]">
                  <div className="flex items-center">
                    <Image
                      src="/icons/indianrupeesicon.svg"
                      width={18}
                      height={18}
                      alt="rupees"
                      className="mr-1"
                      loading="lazy"

                    />
                    {totalServicesPrice}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between  border-slate-500 pb-3 ">
                <span className="text-[#767677]">Accessories price </span>
                <div className="text-black font-[700]">
                  <div className="flex items-center">
                    <Image
                      src="/icons/indianrupeesicon.svg"
                      width={18}
                      height={18}
                      alt="rupees"
                      className="mr-1"
                      loading="lazy"

                    />
                    {totalAccessoryPrice}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <span className="text-[#767677]">Delivery charge </span>
                <span>-</span>
              </div>
              <p className="text-xs text-[#767677] border-b-2 lg:border-b-4 border-black pb-6">
                calculated on distance and weight
              </p>
              <div className="flex items-center justify-between pb-4 mt-2">
                <span className="text-black text-[14px] font-semibold">
                  Subtotal{" "}
                </span>
                <span className="font-[700] text-black text-2xl">
                  <div className="flex items-center">
                    <Image
                      src="/icons/indianrupeesicon.svg"
                      width={20}
                      height={20}
                      alt="rupees"
                      className="mr-1"
                      loading="lazy"

                    />
                    {SumtotalPrice}
                  </div>
                </span>
              </div>
              <div className="flex items-center justify-between pb-4">
                <span className="text-black">Total weight </span>
                <span className="text-black">1.9 kg</span>
              </div>
              <div
                onClick={() => handleSchedular(!schedular)}
                className={`border border-[1.5px] p-[20px] w-[100%] h-auto ${schedular ? "border-black" : "border-[#e5e5e5]"
                  }`}
              >
                <p className="text-black font-[600] ">
                  Make the most of delivery charges
                </p>
                <p className="text-[#757575] text-[12px] pt-[5px]">
                  The current delivery price of your order is Rs. 99 for up to 5
                  kg.
                </p>
              </div>

              <button
                className="border  rounded-[64px] lg:rounded-none text-[14px] border-slate-500 p-5 text-white font-[700] w-[100%] h-[56px] lg:h-28  my-5 flex items-center justify-center lg:justify-between lg:text-xl bg-[#007b34] hover:bg-[#013fa3]"
                onClick={() => setSideMenu(true)}
              >
                Continue to checkout
                <div className=" hidden lg:flex w-10 h-10  items-center rounded-3xl bg-white ">
                  <ArrowRight className="translate-x-2 text-black" />
                </div>
              </button>
              {/* <div className="flex items-center justify-between py-4 font-bold">
            <span>Total </span>
            <span>$1000</span>
          </div> */}

              {/* <div className=" fixed h-full w-screen lg:hidden bg-black/50  backdrop:blur-sm top-0 right-0"></div> */}

              {/* <Link
            href="#"
            className="bg-slate-200 text-slate-900 rounded-lg py-2 px-4 font-normal"
          >
            Continue to Payment
          </Link> */}

              <div className="flex gap-4  items-center font-bold mt-14">
                <span>
                  <svg
                    focusable="false"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="cart-ingka-svg-icon"
                    aria-hidden="true"
                  >
                    <path d="M19.205 5.599c.9541.954 1.4145 2.2788 1.4191 3.6137 0 3.0657-2.2028 5.7259-4.1367 7.5015-1.2156 1.1161-2.5544 2.1393-3.9813 2.9729L12 20.001v-2.3516c.6699-.4304 1.9095-1.2834 3.1347-2.4084 1.8786-1.7247 3.4884-3.8702 3.4894-6.0264-.0037-.849-.2644-1.6326-.8333-2.2015-1.1036-1.1035-2.9413-1.0999-4.0445.0014l-1.7517 1.7448-1.7461-1.7462c-1.1165-1.1164-2.9267-1.1164-4.0431 0-1.6837 1.6837-.5313 4.4136.6406 6.0155.3487.4768.7386.9326 1.1472 1.3617L8 11.9982l2 .0057-.017 6-6-.0171.0056-2 2.7743.0079c-.5387-.5472-1.0629-1.1451-1.5311-1.7852-1.0375-1.4183-1.8594-3.1249-1.8597-4.9957-.0025-1.2512.3936-2.5894 1.419-3.6149 1.8976-1.8975 4.974-1.8975 6.8716 0l.3347.3347.336-.3347c1.8728-1.8722 4.9989-1.8727 6.8716 0z"></path>
                  </svg>
                </span>
                <div className="text-black  underline">
                  60 days and additional 30-day returns with Ayatrio Family
                </div>
              </div>

              <div className="flex gap-4  items-center font-bold mt-4">
                <span className="">
                  <svg
                    focusable="false"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="cart-ingka-svg-icon"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 3C9.7909 3 8 4.7909 8 7v4H5v11h14V11h-3V7c0-2.2091-1.7909-4-4-4zm2 8V7c0-1.1046-.8954-2-2-2s-2 .8954-2 2v4h4zm-7 9v-7h10v7H7z"
                    ></path>
                  </svg>
                </span>
                <div className=" text-black  underline">
                  Secure shopping with SSL data encryption
                </div>
              </div>
            </div>
          )}
        </div>

        {sideMenu && (
          <div className=" fixed h-full w-screen  bg-black/50  backdrop:blur-sm top-0 left-0">
            <section className="text-black bg-white flex-col absolute right-0 top-0 h-screen p-8 gap-8 z-50  w-[35%] flex ">
              <div className="flex items-end justify-end">
                <button
                  className="text-3xl mt-0 mb-8 cursor-pointer  "
                  onClick={() => setSideMenu(false)}
                >
                  X
                </button>
              </div>
              <h1 className="text-3xl font-bold">
                How would you like to check out?
              </h1>
              <ul className="list-disc">
                <h3 className="text-xl font-bold mt-5">
                  Join Ayatrio Family for free
                </h3>
                <div className="ml-8">
                  <li>Get instant benefits</li>
                  <li>Keep track of your orders</li>
                  <li>Save time during checkout</li>
                </div>
              </ul>
              <Link
                href={"#"}
                className="border-2 h-20 w-[98%] rounded-full flex items-center font-bold justify-center border-black  text-black"
              >
                Log in or sign up
              </Link>
              <hr className="border border-black" />
              <Link
                href={{
                  pathname: "/checkout/pin",
                  query: { search: "rooms" },
                }}
                className="border-2 h-20 w-[98%] text-white bg-black font-bold rounded-full flex items-center justify-center border-black  text-black"
              >
                Continue as guest
              </Link>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default CartMain;
