"use client";
import axios from "axios";
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
// import { CiLock } from "react-icons/ci";
import toast from "react-hot-toast";
import { IoEyeOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import Loading from "../components/Loading";
import { axiosInstance } from "../helpes";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [logging, setLogging] = useState(false);

  const validateEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail){
      return true
    } else {
      return false
    }
  }

  const login = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(email)){return toast.error("Email is not valid");}
    console.log("first")
    
    // console.log(process.env.NEXT_PUBLIC_BASE_URL);
    // if(isValidEmail){
    //   return console.log("Email is correct");
    // }else {
    //   return console.log("email is not correct")
    // }

    const data = { email, password };
    setLogging(true);
    try {
      const response = await axiosInstance.post("/login", data);
      // console.log(process.env.NEXT_PUBLIC_BASE_URL);
      // if(response.status === 401) return console.log("Incorrect login details");

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
        toast.error("Invalid Email");
        console.log("this is is ");
      }
      if (err?.response?.data === "Incorrect password."){
        toast.error("Wrong password");
      }
        
      setLogging(false);
    }
  };
  return (
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
  );
}

{
  /* <main>
      <div className=" w-screen h-screen flex justify-center items-center">
        <form action="" className=" bg-slate-100 rounded">
          <p className=" p-5">Google Api </p>
          <p className=" w-full border border-b"></p>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className=" w-full border rounded-md mt-4 p-2"
            type="emial"
            placeholder="Enter Email..."
          />{" "}
          <br />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=" w-full border rounded-md mt-4 p-2"
            type="password"
            placeholder="Enter password"
          />{" "}
          <br />
          <div className=" w-full justify-center flex">
            <button
              onClick={login}
              className=" my-4 rounded-md border p-2 hover:bg-green-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main> */
}
