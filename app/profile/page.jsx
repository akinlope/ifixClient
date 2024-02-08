"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../helpes";

export default function Page() {
  const [email, setEmail] = useState("");
  const [myInfo, setMyInfo] = useState();

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    if (getEmail === "") {
      return toast.error("Error fetching your profile.");
    } else {
      {
        setEmail(getEmail), console.log(getEmail);
        fetchProfile(getEmail);
      }
    }
  }, []);

  const fetchProfile = async (email) => {
    try {
      console.log("This is email from frontend: ", email);
      const res = await axiosInstance.get("/profile", {
        params: { email },
      });
      setMyInfo(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (<>
      <div className=" my-2">
        <Navbar />
      </div>
    <div className="flex flex-1">
      <div className="w-2/5">
        {/* Image */}
        {myInfo && (
          <div className=" p-2">
            <img
              className=" h-full w-full rounded-xl"
              src={myInfo.image}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="w-3/5 flex flex-col">
        {/* Information */}
        <div className="flex-1 p-4">
          {myInfo && (
            <div>
              <div className=" text-5xl font-medium text-purple-900">
                {myInfo.fullname}
              </div>
              <div className=" flex items-center text-purple-900 text-xl mt-10">
                <div className=" pr-2 text-base">
                  <FaPhoneAlt />
                </div>
                {`${myInfo.phoneNumber[0]}, ${myInfo.phoneNumber[1]}`}
              </div>
              <div className=" text-xl font-medium text-purple-900 flex items-center gap-2"> <IoMdMail /> {myInfo.email}</div>
              <div className=" text-xl font-medium text-purple-900 flex items-center gap-2">
              <FaLocationDot />
                {`${myInfo.address.homeAddress}, ${myInfo.address.city}, ${myInfo.address.localgvt}, ${myInfo.address.state}`}
              </div>
              <div className=" mt-10">{myInfo.profession}</div>
              <div className=" mt-10">{myInfo.bio}</div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

// import React from 'react'

// export default function page() {
//   return (
//     <div className=' flex flex-1'>
//         <div className=' w-2/5  bg-purple-700'>image</div>
//         <div className=' w-3/5'> information</div>
//     </div>
//   )
// }
