"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";

import { FcOk } from "react-icons/fc";

import { useRouter } from "next/navigation";

import { updateFormData, selectFormData } from "../Features/Slices/formSlice";

import { selecteddbItems, setDbItems } from "../Features/Slices/cartSlice";
import { BASE_URL } from "@/constants/base-url";
import { useSearchParams } from "next/navigation";
import {
  selectFreeSampleItems,
  setFreeSamples,
} from "../Features/Slices/freeSampleSlice";

const Details = () => {
  const dispatch = useDispatch();
  const [CartData, setCartData] = useState([]);
  const [DeliverCost, setDeliveryCost] = useState(99);
  const [STORE_MAP_DATA, SET_STORE_MAP_DATA] = useState([]);
  const [nearestDistance, setNearestDistance] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [userPincode, setUserPincode] = useState(null);
  const [form, setForm] = useState({});
  const [isDeliveryLoading, setIsDeliveryLoading] = useState(true);

  const [cartdata, setcartdata] = useState("");

  const searchParams = useSearchParams();

  const isFreeSample = searchParams.get("freeSamples") === "true";
  const freeSamples = useSelector(selectFreeSampleItems);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("deviceId");
      setDeviceId(id);
    }
  }, []);

  const fetchFreeSamples = async () => {
    if (!deviceId) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/freeSampling`,
        {
          params: {
            deviceId,
          },
        }
      );

      const data = response.data;
      dispatch(setFreeSamples(data));
    } catch (error) {
      console.error("Error Fetching samples from DB : ", error);
    }
  };

  useEffect(() => {
    if (deviceId && isFreeSample) {
      fetchFreeSamples();
    }
  }, [isFreeSample, deviceId]);

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
      const data = response.data; // Extract JSON from the response
      // console.log("response from DB", data);

      setcartdata(data);
      // console.log("response from DB", cartdata);
      // console.log("cartStatus", cartStatus);
      dispatch(setDbItems(data));
      // console.log("this is data from redux (db)", dbItems);
    } catch (error) {
      console.error("Error Fetching data from DB : ", error);
    }
  };

  useEffect(() => {
    if (deviceId && !isFreeSample) {
      fetchData();
    }
  }, [deviceId, isFreeSample]);

  const fetchMapData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mapPlaces`
      );
      console.log(response.data);
      SET_STORE_MAP_DATA(response.data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const fetchDistances = async () => {
    try {
      const distances = await Promise.all(
        STORE_MAP_DATA?.map(async (store) => {
          const origins = !!form.postal ? form.postal : userPincode;
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/distance`,
            {
              params: {
                origins: origins,
                destinations: store.pincode,
              },
            }
          );

          const distanceText = response.data.rows[0].elements[0].distance.text;
          const distanceValue =
            response.data.rows[0].elements[0].distance.value;
          return {
            id: store.id,
            name: store.name,
            address: store.address,
            pincode: store.pincode,
            distanceText: distanceText,
            distanceValue: distanceValue,
          };
        })
      );

      distances.sort((a, b) => a.distanceValue - b.distanceValue);

      console.log("Distances sorted by ascending order:");
      const distance = (distances[0].distanceValue / 1000).toFixed(1);
      setNearestDistance(distance);
      // FetchCost()

      // localStorage.setItem("nearestStore", JSON.stringify(distances[0]));

      // localStorage?.setItem("nearestStore", JSON.stringify({
      //   nearestStore: distances[0],
      //   userPincode
      // }));
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "nearestStore",
          JSON.stringify({
            nearestStore: distances[0],
            userPincode,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching distances:", error);
    }
  };

  const FetchCost = async (distance) => {
    setIsDeliveryLoading(true);
    if (nearestDistance === null) return;
    const responce = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calculateShippingDetails/${distance}`
    );
    setDeliveryCost(responce.data.charge);
    setDeliveryPrice(responce.data.charge);
    console.log(responce.data.charge);
    setIsDeliveryLoading(false);
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  useEffect(() => {
    if (STORE_MAP_DATA) {
      fetchDistances();
    }
  }, [STORE_MAP_DATA, userPincode, form.postal]);

  useEffect(() => {
    if (nearestDistance !== null) {
      FetchCost(nearestDistance);
    }
  }, [nearestDistance]);

  // const deliveryPrice = useSelector(selectDeliveryPrice);

  console.log(deliveryPrice);
  console.log(cartdata);

  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    console.log(id);
  }

  // console.log("Card Data", cartdata)
  console.log("Fetched Card Data", CartData);
  console.log(deliveryPrice);

  let totalPrice = 0;
  // if (cartdata && cartdata.items) {
  //   totalPrice = cartdata.items.reduce(
  //     (total, item) => total + item.productId.totalPrice * item.quantity,
  //     0
  //   );
  // }

  if (cartdata && cartdata.items) {
    totalPrice = cartdata.items.reduce((total, item) => {
      // const serviceTotalCost = item.selectedServices.reduce(
      //   (serviceTotal, service) => serviceTotal + parseFloat(service.cost),
      //   0
      // );
      const itemTotalPrice = item.price * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  }
  // if (CartData && CartData.items) {
  //   totalPrice = CartData.items.reduce(
  //     (total, item) => total + item.productId.totalPrice * item.quantity,
  //     0
  //   );
  // }

  console.log(totalPrice);
  let totalServicesPrice = 0;

  if (cartdata) {
    totalServicesPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) =>
          serviceTotal + parseFloat(service.cost * service.quantity),
        0
      );
      return total + serviceTotalCost;
    }, 0);
  }

  console.log(cartdata);

  console.log(totalServicesPrice);

  let totalAccessoryPrice = 0;

  if (cartdata) {
    totalAccessoryPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedAccessories.reduce(
        (serviceTotal, service) =>
          serviceTotal + parseFloat(service.perUnitPrice * service.quantity),
        0
      );
      return total + serviceTotalCost;
    }, 0);
  }

  console.log(totalAccessoryPrice);

  let SumtotalPrice = 0;

  if (cartdata) {
    SumtotalPrice = cartdata.items.reduce((total, item) => {
      const serviceTotalCost = item.selectedServices.reduce(
        (serviceTotal, service) =>
          serviceTotal + parseFloat(service.cost * service?.quantity),
        0
      );
      const accessoriesTotalCost = item.selectedAccessories.reduce(
        (accessoryTotal, accessory) =>
          accessoryTotal +
          parseFloat(accessory.totalPrice * accessory?.quantity),
        0
      );
      const itemTotalPrice =
        (item.price + serviceTotalCost + accessoriesTotalCost) * item.quantity;
      return total + itemTotalPrice;
    }, 0);
  }

  // console.log(cartdata);

  //--------------------xx--------------xx---------
  const router = useRouter();

  const [selected, setSelected] = useState(null);
  const formData = useSelector(selectFormData);
  // console.log(formData);
  let selecteddate = formData.selectedDate;
  let selectedtime = formData.selectedTime;

  // const deviceId = cartdata?.owner;
  const cartId = cartdata?._id;

  const [postalValidation, setPostalValidation] = React.useState("");
  const [numberValidation, setNumberValidation] = React.useState("");

  function handlefunc(event) {
    const { name, value } = event.target;

    if (name === "postal") {
      // Validate postal code
      const postalCode = parseInt(value, 10);

      if (isNaN(postalCode) || postalCode < 100000 || postalCode > 999999) {
        setPostalValidation("invalid");
      } else {
        setPostalValidation("valid");
      }
    } else if (name === "number") {
      // Validate mobile number
      const mobileNumber = parseInt(value, 10);

      if (isNaN(mobileNumber) || mobileNumber.toString().length !== 10) {
        setNumberValidation("invalid");
      } else {
        setNumberValidation("valid");
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  console.log(form);

  const updatedForm = {
    ...form,
    selectedDate: selecteddate,
    selectedTime: selectedtime,
  };
  console.log(updatedForm);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleData = async (event) => {
    event.preventDefault();

    // Check validation before submitting the form
    if (postalValidation !== "valid" || numberValidation !== "valid") {
      return;
    }

    if (isDeliveryLoading || deliveryPrice === null) {
      return;
    }

    const id = localStorage.getItem("deviceId");

    dispatch(updateFormData(updatedForm));
    console.log("form-dispatch", updatedForm);
    console.log("deviceId", deviceId);
    console.log("cartId", cartId);

    const address = {
      firstName: updatedForm.first,
      lastName: updatedForm.last,
      address: updatedForm.address,
      postalCode: updatedForm.postal,
      city: updatedForm.local,
      country: updatedForm.country,
      state: updatedForm.state,
      email: updatedForm.email,
      phone: updatedForm.number,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            deviceId: id,
            cartId,
            isFreeSample,
            freeSampleCartId: freeSamples?._id,
          }),
        }
      );

      if (response.ok && isFreeSample && deliveryPrice === 0) {
        return router.push("/freesamplesuccess");
      }

      if (response.ok) {
        const data = await response.json();
        // console.log("Dataaaa", data);

        // if the API response is 200

        const paymentResponse = await axios.request({
          method: "POST",
          url: `${apiBaseUrl}/api/makepayment`,
          data: {
            amount: isFreeSample
              ? deliveryPrice * 100
              : (SumtotalPrice + deliveryPrice) * 100,
            callbackUrl: isFreeSample
              ? `${BASE_URL}/freesamplesuccess`
              : `${BASE_URL}/success`,
            redirectUrl: isFreeSample
              ? `${BASE_URL}/freesamplesuccess`
              : `${BASE_URL}/success`,
          },
        });

        const redirectUrl =
          paymentResponse.data.data.data.instrumentResponse.redirectInfo.url;

        router.push(redirectUrl);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      // Handle fetch or JSON parsing errors
      console.error("Error:", error);
    }
  };

  const [userCoordinates, setUserCoordinates] = useState(null);
  const [location, setLocation] = useState(null);

  const getDataFromCoordinates = async (lat, lng) => {
    const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const rapidApiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;

    const options = {
      method: "GET",
      url: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode",
      params: {
        location: `${lat},${lng}`,
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": rapidApiHost,
      },
    };

    try {
      console.log(lat);
      const response = await axios.request(options);
      setLocation(response.data.results[0].address);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage?.getItem("userCoordinates") &&
      setUserCoordinates(JSON.parse(localStorage.getItem("userCoordinates")));
  }, []);

  useEffect(() => {
    if (userCoordinates) {
      console.log(userCoordinates);
      getDataFromCoordinates(userCoordinates.lat, userCoordinates.lng);
    }
    if (localStorage?.getItem("userPincode")) {
      setUserPincode(localStorage.getItem("userPincode"));
      setForm((prev) => ({
        ...prev,
        postal: localStorage.getItem("userPincode"),
      }));
    } else if (userCoordinates) {
      getPinFromCoordinates(userCoordinates.lat, userCoordinates.lng).then(
        (data) => {
          if (data) {
            setUserPincode(data);
            setForm((prev) => ({
              ...prev,
              postal: data,
            }));
            localStorage.setItem("userPincode", data);
          }
        }
      );
    }
  }, [userCoordinates]);

  return (
    <>
      <div className=" px-2 lg:px-20 lg:py-16">
        <div className="grid lg:grid-cols-12 lg:gap-10 border-b-2">
          <div className="lg:col-span-8 lg:order-1 order-2 ">
            {/* <!-- parent div --> */}
            <div className=" py-2 ml-2 lg:ml-12 lg:mr-14 mr-2">
              {/* <!-- header section --> */}
              <div className="">
                <div className="bg-white  w-full mx-auto ">
                  <div className="flex justify-between items-center  mb-4">
                    <div className="flex items-center  ">
                      <span>
                        <FcOk size={40} />
                      </span>
                      <h3 className="text-lg font-bold ">
                        Collect information
                      </h3>
                    </div>
                    <div className=" text-md underline">Edit</div>
                  </div>
                  <div className="mb-2">
                    <h3 className="text-md font-bold ">
                      Delivered to pick-up location via parcel at
                    </h3>
                    <p className="text-sm text-gray-700">{location}</p>
                  </div>
                  {/* <div className="mb-2">
                    <h3 className="text-md font-bold ">
                      Estimated Pick-up Date
                    </h3>
                    <p className="text-sm text-gray-700">
                      24.3.2024 11:00 AM - 5:00 PM
                    </p>
                  </div> */}
                </div>
              </div>

              {/*devivery PIN CODE  */}
              <div className="w-full">
                <h3 className="text-md font-bold my-4">Billing address</h3>
                <form onSubmit={handleData}>
                  <div className="flex  lg:flex-row w-full   ">
                    <div className="mb-4 mr-4 flex-1 ">
                      <label
                        htmlFor="first"
                        className="block text-md text-gray-700 mb-1"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="first"
                        name="first"
                        onChange={handlefunc}
                        className=" border w-full  border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="mb-4 flex-1">
                      <label
                        htmlFor="last"
                        className="block text-md text-gray-700 mb-1"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="last"
                        name="last"
                        onChange={handlefunc}
                        className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-md text-gray-700 mb-1 "
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={handlefunc}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="postal"
                      className="block text-md text-gray-700 mb-1"
                    >
                      Pin code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="postal"
                      name="postal"
                      pattern="[0-9]*"
                      onChange={handlefunc}
                      max={999999}
                      min={100000}
                      value={form.postal}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="local"
                      className="block text-md text-gray-700 mb-1"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="local"
                      name="local"
                      onChange={handlefunc}
                      value={form.local}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="country"
                      className="block text-md text-gray-700 mb-1"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={form.country}
                      onChange={handlefunc}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="state"
                      className="block text-md text-gray-700 mb-1"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={form.state}
                      onChange={handlefunc}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-md text-gray-700 mb-1"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handlefunc}
                      value={form.email}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* <div className="mb-4">
                    <label
                      htmlFor="pan"
                      className="block text-md text-gray-700 mb-1"
                    >
                      Pan<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pan"
                      name="pan"
                      onChange={handlefunc}
                      value={form.pan}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div> */}

                  <div className="mb-4">
                    <label
                      htmlFor="number"
                      className="block text-md text-gray-700 mb-1"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="number"
                      name="number"
                      onChange={handlefunc}
                      className="w-full border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className=" pt-6 lg:pt-10">
                    {/* <Link href={"/payment"}> */}
                    <button
                      type="submit"
                      // onClick={() => setIsPaymentModalOpen(true)}
                      className="bg-[#0058a3] text-white flex justify-center items-center border-solid border border-gray-300 p-8 h-12 rounded-full my-4 text-md font-bold w-full m-auto"
                    >
                      Continue to payment{" "}
                    </button>
                    {/* </Link> */}
                  </div>
                </form>
              </div>
            </div>

            <div className="">{/* CART1 */}</div>
          </div>
          <div className=" lg:order-2 order-1  lg:col-span-4  bg-white  border-gray-300 rounded-lg  overflow-hidden  p-3 lg:p-6  text-slate-600 ">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">Your Order</h3>
              <Link href={"/cart"} className="underline">
                {" "}
                Edit
              </Link>
            </div>
            <div className="flex">
              <div className="flex my-4">
                {isFreeSample && freeSamples?.products.length > 0
                  ? freeSamples.products.map((item, index) => (
                      <Image
                        loading="lazy"
                        key={index}
                        src={item.images[0]}
                        width={249}
                        height={249}
                        alt={item.productTitle}
                        className="w-20 h-20 mr-4"
                      />
                    ))
                  : isFreeSample && (
                      <div className="text-lg text-gray-500 font-bold ">
                        {cartdata !== null ? "" : "Empty cart"}
                      </div>
                    )}

                {!isFreeSample &&
                cartdata &&
                cartdata.items &&
                cartdata.items.length > 0
                  ? cartdata.items.map((item, index) => (
                      <Image
                        loading="lazy"
                        key={index}
                        src={item.productId.images[0]}
                        width={249}
                        height={249}
                        alt={item.name}
                        className="w-20 h-20 mr-4"
                      />
                    ))
                  : !isFreeSample && (
                      <div className="text-lg text-gray-500 font-bold ">
                        {cartdata !== null ? "" : "Empty cart"}
                      </div>
                    )}
              </div>
              <div className="flex my-4">
                {
                  // cartdata &&
                  //   cartdata.freeSamples.length > 0 &&
                  //   cartdata.freeSamples.map((item, index) => {
                  //     return (
                  //       <div>
                  //         <Image
                  //           loading="lazy"
                  //           src={item.images[0]}
                  //           width={249}
                  //           height={249}
                  //           alt={""}
                  //           className="w-20 h-20 mr-5"
                  //         />
                  //         {/* <p className="mt-[2px] text-[12px]  font-semibold">(Sample)</p> */}
                  //       </div>
                  //     );
                  //   })
                }
              </div>
            </div>
            <h2 className="text-xl pb-3 font-bold">Order summary</h2>
            <div className="flex items-center justify-between  border-slate-500 pb-6 ">
              <span className="text-black">Products price </span>
              <div className=" text-black font-[700]">
                <div className="flex items-center">
                  <Image
                    loading="lazy"
                    src="/icons/indianrupeesicon.svg"
                    width={18}
                    height={18}
                    alt="rupees"
                    className="mr-1"
                  />
                  {isFreeSample ? 0 : totalPrice}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between  border-slate-500 pb-6 ">
              <span className="text-black">Services price </span>
              <div className=" text-black font-[700]">
                <div className="flex items-center">
                  <Image
                    loading="lazy"
                    src="/icons/indianrupeesicon.svg"
                    width={18}
                    height={18}
                    alt="rupees"
                    className="mr-1"
                  />
                  {isFreeSample ? 0 : totalServicesPrice}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between  border-slate-500 pb-6 ">
              <span className="text-black">Accessories price </span>
              <div className=" text-black font-[700]">
                <div className="flex items-center">
                  <Image
                    loading="lazy"
                    src="/icons/indianrupeesicon.svg"
                    width={18}
                    height={18}
                    alt="rupees"
                    className="mr-1"
                  />
                  {isFreeSample ? 0 : totalAccessoryPrice}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <span className="text-black">Delivery charge </span>
              <div className="text-black">
                <div className="flex items-center">
                  <Image
                    loading="lazy"
                    src="/icons/indianrupeesicon.svg"
                    width={18}
                    height={18}
                    alt="rupees"
                    className="mr-1"
                  />
                  {deliveryPrice === null ? (
                    <span className="text-xs">Calculating...</span>
                  ) : deliveryPrice === 0 ? (
                    <span className="text-xs">Free Delivery</span>
                  ) : (
                    deliveryPrice
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-[#767677] border-b-2 lg:border-b-4 border-black pb-6">
              calculated on distance and weight
            </p>
            <div className="flex items-center justify-between pb-4 mt-2">
              <span className="text-black">Subtotal </span>
              <div className="font-[700] text-black text-2xl">
                <div className="flex items-center">
                  <Image
                    loading="lazy"
                    src="/icons/indianrupeesicon.svg"
                    width={20}
                    height={20}
                    alt="rupees"
                    className="mr-1"
                  />
                  {isFreeSample ? deliveryPrice : SumtotalPrice + deliveryPrice}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pb-4">
              <span className="text-black">Total weight </span>
              <span className="text-black font-[700]">1.9 kg</span>
            </div>
            <div className="border border-slate-500 p-[10px] lg:p-[20px] w-[100%] lg:w-[100%] h-auto">
              <p className="text-black font-[600] ">
                Make the most of delivery charges
              </p>
              <p className="text-[#757575] text-[12px] pt-[5px]">
                The current delivery price of your order is Rs. 99 for up to 5
                kg.
              </p>
            </div>
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
            <div className="flex gap-4  items-center font-bold mt-5 lg:mt-14">
              <span>
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  class="cart-ingka-svg-icon"
                  aria-hidden="true"
                >
                  <path d="M19.205 5.599c.9541.954 1.4145 2.2788 1.4191 3.6137 0 3.0657-2.2028 5.7259-4.1367 7.5015-1.2156 1.1161-2.5544 2.1393-3.9813 2.9729L12 20.001v-2.3516c.6699-.4304 1.9095-1.2834 3.1347-2.4084 1.8786-1.7247 3.4884-3.8702 3.4894-6.0264-.0037-.849-.2644-1.6326-.8333-2.2015-1.1036-1.1035-2.9413-1.0999-4.0445.0014l-1.7517 1.7448-1.7461-1.7462c-1.1165-1.1164-2.9267-1.1164-4.0431 0-1.6837 1.6837-.5313 4.4136.6406 6.0155.3487.4768.7386.9326 1.1472 1.3617L8 11.9982l2 .0057-.017 6-6-.0171.0056-2 2.7743.0079c-.5387-.5472-1.0629-1.1451-1.5311-1.7852-1.0375-1.4183-1.8594-3.1249-1.8597-4.9957-.0025-1.2512.3936-2.5894 1.419-3.6149 1.8976-1.8975 4.974-1.8975 6.8716 0l.3347.3347.336-.3347c1.8728-1.8722 4.9989-1.8727 6.8716 0z"></path>
                </svg>
              </span>
              <div className="text-black underline">
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
                  class="cart-ingka-svg-icon"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3C9.7909 3 8 4.7909 8 7v4H5v11h14V11h-3V7c0-2.2091-1.7909-4-4-4zm2 8V7c0-1.1046-.8954-2-2-2s-2 .8954-2 2v4h4zm-7 9v-7h10v7H7z"
                  ></path>
                </svg>
              </span>
              <div className="text-black underline">
                Secure shopping with SSL data encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
