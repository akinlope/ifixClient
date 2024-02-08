"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults";
import toast from "react-hot-toast";
// import for react-icon
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
//  import component
import UserInformation from "../components/UserInformation";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../helpes";


export default function home() {
  const [userExist, setUserExist] = useState(false);
  const [email, setEmail] = useState("");
  const [uname, setUname] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [data, setData] = useState([]);
  const [individual, setIndividual] = useState();
  const [loader, setLoader] = useState(false);


  // console.log(individual);

  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("uname")) {
      // console.log(true);
      setEmail(localStorage.getItem("email"));
      setUname(localStorage.getItem("uname"));
      setUserExist(true);
    }
  }, []);

  const search = async (e) => {
    e.preventDefault();
    console.log("clicked");

    if (searchTxt.length === 0) {
      return toast.error("Search field can't be empty");
    }
    try {
      setLoader(true);
      console.log("a");
      const response = await axiosInstance.get("/search",{
        params: { profession: searchTxt, email: email },
      });
      console.log("b");
      console.log(response);

      if (
        response.data?.message === "Profession not found within your vicinity"
      ) {
        setData("Profession not found within your vicinity");
        setSearchTxt("");
        console.log("Profession not found within your vicinity");
        setLoader(false);
      } else if (response.status === 200) {
        setData(response.data?.filteredUsers || []);
        console.log(typeof response.data?.filteredUsers);
        setSearchTxt("");
        setLoader(false);
      } else {
        console.log("Unhandled response status:", response.status);
        setSearchTxt("");
        setLoader(false);
        // Handle other status codes if needed
      }

      setLoader(false);
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        console.log("No user found");
        setData("Profession not found");
        setLoader(false);
      } else if (err.response && err.response.status === 404) {
        setData("No person found within your city and local government area.");
        setSearchTxt("");
        setLoader(false);
      }else if(err?.response?.data?.error === "Please Login"){
        toast.error("Please login!");
        setLoader(false)
      } else {
        console.log("Error occurred:", err.message);
        // Handle other types of errors
        setLoader(false);
      }
    }
  };

  // console.log(data);

  return (
    <main className="h-screen flex flex-col p-5">
      <div className=" my-2">
        <Navbar />
      </div>
      {userExist && (
        <div className="text-txt px-5">
          Welcome: <span className="text-purple-900 font-bold">{uname}</span>
        </div>
      )}

      <div className="flex flex-1">
        {/* Search */}
        <div className="w-1/3 p-5">
          <div className="flex items-center border-2 border-purple-500 rounded-md">
            <div
              className=" p-3 cursor-pointer text-purple-900 text-lg"
              onClick={search}
            >
              <IoSearch />
            </div>
            <input
              value={searchTxt}
              placeholder="Search by profession. E.g plumber"
              type="text"
              className="focus:outline-none p-2 w-full"
              onChange={(e) => {
                setSearchTxt(e.target.value);
              }}
            />
          </div>
          {/* <span className="loader"></span> */}
        </div>

        {/* Search Result info */}
        <div className="w-1/3 p-5">
          {data.length > 0 && !loader && (
            <div className="h-full">
              <SearchResults datas={data} individualInfo={setIndividual} />
            </div>
          )}

          {loader && (
            <div className="flex justify-center items-center h-full">
              <span className=" loader"></span>
            </div>
          )}
          
          {!loader && data.length <= 0 && (
            <div className="flex justify-center items-center h-full">
              {
                <span className=" font-bold text-2xl text-slate-300 flex">
                  <span className=" flex items-center pr-2">
                    <FaArrowLeft />
                  </span>
                  Please Search for a Professsion
                </span>
              }
            </div>
          )}
        </div>

        {/* User full information */}
        <div className="w-1/3 p-5">
          {individual && <UserInformation individual={individual} />}
        </div>
      </div>
    </main>
  );
}
