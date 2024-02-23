"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
// react icons imports
import {
  FaUser,
  FaRegEyeSlash,
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Loading from "../components/Loading";
import { axiosInstance } from "../helpes";
import { Layout } from "../components/Layout";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [logging, setLogging] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      return true;
    } else {
      return false;
    }
  };

  const login = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return toast.error("Email is not valid");
    if(password.length < 8) return toast.error("Password cannot be lesser than 8-characters")


    const data = { email, password };
    setLogging(true);
    try {
      const response = await axiosInstance.post("/login", data);
    
      if (response.data?.success === true) {
        setEmail("");
        setPassword("");
        localStorage.setItem("uname", response.data?.username);
        localStorage.setItem("email", response.data?.email);
        router.push("/");
        setLogging(false);
      }
    } catch (err) {
      if (err?.response?.data === "Invalid email.") {
        setLogging(false);
        return toast.error("Oops! Email is not registered :(");
      }
      if (err?.response?.data === "Incorrect password.") {
        setLogging(false)
        return toast.error("Wrong password");
      }

      setLogging(false);
    }
  };
  return (
    <Layout>
      <main className=" flex items-center justify-center h-screen">
        <div className=" ">
          {/* form div */}
          <div className=" rounded-2xl flex justify-center p-5">
            {/* information section */}
            <div className=" bg-gradient-to-r from-purple-700 to-purple-600 p-5  rounded-l-2xl shadow-lg relative">
              <div className=" text-center font-bold text-white text-4xl mt-10 ">
                IFIX
              </div>
              <div className=" text-center text-white pt-2">
                Smarter.Better.Faster
              </div>
              <div className=" mt-10 text-white ">
                Simplifying the process of getting services.{" "}
              </div>

              <div className=" flex justify-between inset-x-0 bottom-0 absolute p-2">
                <div className=" text-white text-xs">www.ifix.com</div>
                <div className=" flex justify-between text-white">
                  <div className=" mx-1 cursor-pointer">
                    <FaXTwitter />
                  </div>
                  <div className=" mx-1 cursor-pointer">
                    <FaInstagram />
                  </div>
                  <div className=" mx-1 cursor-pointer">
                    <FaLinkedin />
                  </div>
                </div>
                <div className=" text-white text-xs">&copy; Copyright 2023</div>
              </div>
            </div>
            {/* login section */}
            <div className=" p-5 rounded-r-xl shadow-lg">
              <p className=" text-txt text-4xl font-bold mt-10">Login</p>
              <p className=" text-txt text-sm mt-2">
                Welcome to{" "}
                <span className=" text-purple-600 font-bold">iFix</span>! Please
                enter your email and password to login.
              </p>
              <div className=" mt-10">
                <label className=" text-sm text-txt" htmlFor="">
                  Email
                </label>
                <div className=" flex items-center p-2 border-txt border-2 rounded-md mb-5">
                  <FaUser />
                  <input
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    className=" focus:outline-none pl-2 w-full"
                    placeholder="example@example.com"
                  />
                </div>

                <label className=" text-sm text-txt " htmlFor="">
                  Password
                </label>
                <div className=" flex items-center p-2 border-txt border-2 rounded-md mb-5">
                  <FaLock />
                  <input
                    type={viewPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    className=" focus:outline-none px-2 w-full"
                    placeholder="*******************"
                  />
                  {viewPassword ? (
                    <span
                      className=" cursor-pointer"
                      onClick={() => {
                        setViewPassword(!viewPassword);
                      }}
                    >
                      <IoEyeOutline />
                    </span>
                  ) : (
                    <span
                      className=" cursor-pointer"
                      onClick={() => {
                        setViewPassword(!viewPassword);
                      }}
                    >
                      <FaRegEyeSlash />
                    </span>
                  )}
                </div>

                <div className=" flex justify-between">
                  <div>
                    <input type="checkbox" className=" accent-purple-700" />{" "}
                    <span className=" text-sm text-txt">Remember Me</span>
                  </div>
                  {/* not a member register */}
                  <div className=" text-sm text-purple-900 font-semibold cursor-pointer">
                    Forgot Password
                  </div>
                </div>

                <div className=" text-sm mt-5 text-txt">
                  Not yet a member?{" "}
                  <span
                    onClick={() => {
                      router.push("/register");
                    }}
                    className=" text-purple-900 font-bold cursor-pointer"
                  >
                    Register
                  </span>
                </div>

                {/* button */}
                <div className=" flex justify-center py-5">
                  <button
                    onClick={login}
                    className=" p-2 px-5 rounded-lg font-bold bg-gradient-to-r from-purple-900 to-purple-700 text-center text-white"
                  >
                    {logging ? (
                      <span>
                        {" "}
                        <Loading />
                      </span>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </div>

                <div className=" h-[2px] bg-slate-200 rounded-lg"></div>

                {/* login with google  */}
                <span>Login with Google </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}