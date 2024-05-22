"use client";

import { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults";
import toast from "react-hot-toast";
import TextTransition, { presets } from "react-text-transition";
// import for react-icon
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
//  import component
import UserInformation from "../components/UserInformation";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../helpes";

const TEXT = [
  "Welcome",
  "Bienvenido",
  "ẹkáàbọ̀",
  "Nnọọ",
  "Bienvenu",
  "Sannu da zuwa",
];

export default function Home() {
  const [userExist, setUserExist] = useState(false);
  const [email, setEmail] = useState("");
  const [uname, setUname] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [data, setData] = useState([]);
  const [individual, setIndividual] = useState();
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const textPosition = setInterval(
      () => setIndex((index) => index + 1),
      5000
    );
    return () => clearInterval(textPosition);
  }, []);

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

    if (searchTxt.trim().length <= 3)
      return toast.error("Profession not valid");
    if (searchCity.trim().length <= 3) return toast.error("City not valid");

    try {
      setLoader(true);
      const response = await axiosInstance.get("/search", {
        params: { profession: searchTxt, email: email, city: searchCity },
      });
      if (response?.status === 200) {
        setLoader(false);
        return setData(response?.data?.filteredByCity);
      }
    } catch (err) {
      setLoader(false);
      if(err?.response?.status == 404){
        return setData(err?.response?.data?.error);
      }
    }
  };

  return (
    <main className="h-screen flex flex-col p-5">
      <div className=" my-2">
        <Navbar />
      </div>
      {userExist && (
        <div className=" px-5 mt-10 -mb-2 flex gap-2 items-center text-purple-500 font-semibold">
          <TextTransition springConfig={presets.wobbly}>
            {TEXT[index % TEXT.length]}
          </TextTransition>
          <div className=" font-bold text-lg">
            <FaRegFaceSmileBeam />
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Search */}
        <div className="w-1/3 p-5">
          {/* <div className=" border-2 rounded-md"> */}
          {/* <div
              className=" p-3 cursor-pointer text-purple-900 text-lg"
              onClick={search}
            >
              <IoSearch />
            </div> */}
          <input
            value={searchTxt}
            placeholder="Profession. E.g plumber"
            type="text"
            className=" w-full border-slate-300 border-2 rounded p-2 focus:outline-none focus:border-purple-400"
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
            required
          />{" "}
          <br />
          <input
            value={searchCity}
            placeholder="Enter city E.g  "
            type="text"
            className=" w-full border-slate-300 border-2 rounded p-2 focus:outline-none focus:border-purple-400 mt-2"
            onChange={(e) => {
              setSearchCity(e.target.value);
            }}
            required
          />
          <div className=" w-full">
            <button
              className=" bg-purple-500 hover:bg-purple-900 w-full p-2 text-white font-semibold mt-2 rounded"
              onClick={search}
            >
              SEARCH
            </button>
          </div>
          {/* </div> */}
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
