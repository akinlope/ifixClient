"use client";
import React from "react";
import Image from "next/image";

export default function UserInformation({ individual }) {
  // console.log("image url ",individual.image);
  return (
    <div>
      {/* images */}
      <div className=" flex justify-center">
        {/* <div className="h-40 w-40 rounded-full bg-slate-700 mb-5"> */}
        <Image
          className=" w-3/6 h-3/6 rounded-lg"
          src={individual.image}
          alt="User image"
          width={100}
          height={100}
        />
        {/* </div> */}
      </div>
      {/* user informations */}
      <div className=" p-2">
        <div className=" text-txt">
          Fullname:{" "}
          <span className=" text-purple-900 font-bold">
            {individual.fullname}
          </span>
        </div>
        <div className=" text-txt">
          Mobile Number:{" "}
          <span className=" text-purple-900 font-bold">
            {individual.phoneNumber[0]}, {individual.phoneNumber[0]}
          </span>
        </div>
        <div className=" text-txt">
          Address:{" "}
          <span className=" text-purple-900 font-bold">{`${individual.address?.homeAddress}, ${individual.address?.city},
                    ${individual.address?.localgvt}, ${individual.address?.state}`}</span>
        </div>
        <div className=" text-txt">
          Profession:{" "}
          <span className=" text-purple-900 font-bold">
            {individual.profession}
          </span>
        </div>
      </div>
    </div>
  );
}
