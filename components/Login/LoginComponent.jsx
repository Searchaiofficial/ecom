"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
const LoginComponent = () => {
  const router = useRouter();

  const checkUser = async () => {
    try {
      const token = Cookies.get("jwt");
      console.log(token);
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.isAuthenticated) {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   checkUser();
  // }, []);

  const handleGoogleLogin = async () => {
    try {
      window.open(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`,
        "_self"
      );
    } catch (error) {
      console.error("Error initiating Google OAuth:", error);
    }
  };
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <>
      <div className="flex lg:flex-wrap flex-wrap-reverse justify-around w-full">
        <div className="flex p-8 w-[430px]">
          <div className="w-full">
            <div className="img__con111 sm:block flex items-center justify-center">
              <Image
                src="/images/logo/ayatriologo.png"
                width={200}
                height={100}
                alt="Ayatrio"
                className="w-48 m-2"
              />
            </div>

            <div className="mt-[50px] w-full">
              <h1 className="text-lg font-semibold text-black">
                Be Part a Ayatrio membership today. It's free to join? Get the
                details.
              </h1>

              <ul className="list-disc p-5 ">
                <li className="py-1 text-base">
                  Follow your online orders, in-store buys, and access your
                  purchase history and e-receipts{" "}
                </li>
                <li className="py-1 text-base">
                  Join community for live, Member-only Interior design events{" "}
                </li>
                <li className="py-1 text-base">
                  Access to Ayatrio Family offers
                </li>
                <li className="py-1 text-base">
                  Create your personal wishlist
                </li>
              </ul>
              <p className="text-base pt-1 mb-[15px]">
                ... and a whole lot more!
              </p>
              <div className="flex flex-row gap-2">
                <div className="  flex flex-col gap-2 w-6/12">
                  <Image
                    className="rounded-md"
                    width={200}
                    height={256}
                    src="/images/login/login1.jpg"
                  />
                  <Image
                    className="rounded-md"
                    width={200}
                    height={256}
                    src="/images/login/login3.jpg"
                  />
                </div>
                <div className="  flex flex-col gap-2 w-6/12">
                  <Image
                    className="rounded-md"
                    width={200}
                    height={240}
                    src="/images/login/login2.jpg"
                  />
                  <Image
                    className="rounded-md"
                    width={200}
                    height={240}
                    src="/images/login/login4.jpg"
                  />
                </div>
              </div>
            </div>
            <div className="text-[10px] mt-[50px]">
              {" "}
              <p>Ayatrio.com - Cookie Policy and Privacy Policy</p>
              <p> © Inter Ayatrio Systems B.V. 1999-2024</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-[430px]">
          <div className="flex pt-[150px] sm:px-[50px] px-[20px]">
            <div className="bg-white">
              <div className="mt-[30px] mb-[10px] w-full">
                <h3 className="text-black text-3xl leading-10 font-semibold">
                  Wellcome to ayatrio family profile
                </h3>
              </div>

              <div className="sm:block flex pt-[30px]">
                <button
                  onClick={handleGoogleLogin}
                  className="border-2 text-black border-solid  w-[100%] sm:h-14 h-8 gap-[5px] rounded-full  transition duration-300 font-semibold flex items-center justify-center mb-[15px]"
                >
                  <Image
                    src="/icons/googlelogin.svg"
                    width={20}
                    height={20}
                    alt="up"
                  />
                  {/* <Google className="mr-2" /> */}
                  Login with Google
                </button>
              </div>
              <div className="gflbutton">
                <div className="BzWZlf sm:block flex items-center justify-center">
                  <button
                    onClick={toggleFormVisibility}
                    className="border-2 text-black border-solid  w-[100%] sm:h-14 h-8 rounded-full font-semibold transition duration-300 flex items-center justify-center "
                  >
                    Login with Business
                  </button>
                </div>
              </div>
              {isFormVisible && (
                <div id="signInForm">
                  <form action="">
                    <div className="w-full h-8"></div>
                    <div className="relative mb-1">
                      <h4 className="font-bold ">Business Information</h4>
                    </div>
                    <div className="w-full">
                      <div className="w-full">
                        <label className="block mb-1" htmlFor="">
                          Legal Business name
                        </label>
                        <input
                          className="h-10 w-full border border-black"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full">
                        <label className="block mb-1" htmlFor="">
                          GSTIN
                        </label>
                        <input
                          className="h-10 w-full border border-black"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="w-full">
                        <label className="block mb-1" htmlFor="">
                          Industry segment (Optional)
                        </label>
                        <input
                          className="h-10 w-full border border-black"
                          type="text"
                        />
                      </div>
                    </div>
                  </form>
                  <div className="sm:block flex justify-center mt-5 mb-5items-center">
                    <button className="text-white bg-black text-lg rounded-full font-semibold py-3 px-4 flex items-center justify-center sm:w-3/5 w-52">
                      Login
                    </button>
                  </div>
                </div>
              )}

              <div className="terms flex flex-row gap-3 mt-4 mb-10">
                <input type="checkbox" className=" w-[30px] h-[30px] " />
                <span className="mtp text-xs">
                  By continuing, you agree to Ayatrio's{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    data-test-id="tos"
                    href="/_/_/policy/terms-of-service/"
                  >
                    Terms of Service
                  </a>
                  ,{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    data-test-id="privacy"
                    href="/_/_/policy/privacy-policy/"
                  >
                    Privacy policy
                  </a>{" "}
                  including{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    data-test-id="privacy"
                  >
                    {" "}
                    Cookie Use{" "}
                  </a>
                  .{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
