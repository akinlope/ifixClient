import React from "react";
import Image from "next/image";

export default function SearchResults({ datas, individualInfo, arrow }) {
  // console.log(datas);

  if (typeof datas === "string") {
    return (
      <div className=" flex items-center text-lg text-purple-900 font-bold justify-center h-full ">
        {datas}
      </div>
    );
  }

  const userInformation = (data) => {
    // console.log(data);
    individualInfo(data);
    // const id = datas._id;
    // console.log(id);
  };
  return (
    <div>
      {datas.map((data) => {
        return (
          <div
            className=" mt-5 rounded-md shadow-md p-2 cursor-pointer hover:shadow-lg bg-white"
            key={data._id}
          >
            <div onClick={() => userInformation(data)} className=" flex">
              {/* img */}
              <div className=" items-center flex mx-2">
                <Image
                  className=" w-9 h-9 rounded-full bg-pink-600"
                  src={data.image}
                  alt="Result image"
                />
              </div>
              {/* informations */}
              <div>
                <div className=" text-txt">
                  Fullname:{" "}
                  <span className=" text-purple-900 font-bold text-base">
                    {data.fullname}
                  </span>
                </div>
                <div className=" text-txt">
                  Address:{" "}
                  <span className=" text-purple-900 font-bold text-base">
                    {data.address?.homeAddress}, {data.address?.city},{" "}
                    {data.address?.localgvt}, {data.address?.state}
                  </span>
                </div>
              </div>
            </div>
            {/* <div>Fullname: {data.fullname}</div>
            <div>Email address: {data.email}</div>
            <div>
              Address: {data.address?.homeAddress}, {data.address?.city},{" "}
              {data.address?.localgvt}, {data.address?.state}
            </div>
            <div>
              Phone number: {data.phoneNumber[0]}, {data.phoneNumber[1]}
            </div>
            <div>Profession: {data.profession}</div> */}
          </div>
        );
      })}
    </div>
  );
}
