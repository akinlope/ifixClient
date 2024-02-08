"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../helpes";

export default function Page() {
const router = useRouter()

  const [artisan, setArtisan] = useState(false);
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [no1, setNo1] = useState();
  const [no2, setNo2] = useState();
  // const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [homeAddress, setHomeAddress] = useState();
  const [city, setCity] = useState();
  const [localgvt, setLocalgvt] = useState();
  const [state, setState] = useState();
  const [profession, setProfession] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formatPhoneNumber = (phoneNumber) => {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Define the pattern for formatting (e.g., 08012345678 to 0801-234-5678)
    const pattern = /^(\d{4})(\d{3})(\d{4})$/;

    // Apply the pattern and add hyphens
    if (numericPhoneNumber.match(pattern)) {
      return numericPhoneNumber.replace(pattern, '$1-$2-$3');
    }

    // Return the original input if the pattern doesn't match
    return phoneNumber;
  };

  // Handle changes in the phone number inputs
  const handlePhoneNumber1Change = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setNo1(formattedNumber);
  };

  const handlePhoneNumber2Change = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setNo2(formattedNumber);
  };

  const updateBio = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);
    formData.append("artisan", artisan);
    formData.append("fullname", fullname);
    formData.append("phoneNumber1", no1);
    formData.append("phoneNumber2", no2);
    formData.append("homeAddress", homeAddress);
    formData.append("city", city);
    formData.append("localgvt", localgvt);
    formData.append("state", state);
    formData.append("profession", profession);
    formData.append("bio", bio);

    if (!email) return console.log("No email found");
    setSubmitting(true);
    console.log(artisan);
    try {
      const response = await axiosInstance.post("/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmitting(false)

      console.log(response.data);
      setArtisan("");
      setFullname("");
      setHomeAddress("");
      setCity("");
      setLocalgvt("");
      setNo1("");
      setNo2("");
      setProfession("");
      setState("");
      setBio("");
      setImage("")

      router.push("/")
    } catch (err) {
      // console.log(err);
      setSubmitting(false)
    }
  };

  return (
    <main>
      <div className=" my-2">
        <Navbar />
      </div>
      <form
        onSubmit={updateBio}
        className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Artisan Information
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-purple-900 font-bold">
            Are you an Artisan?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="artisan"
              value="yes"
              onChange={() => setArtisan(true)}
              checked={artisan}
              className="mr-2 focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
            />
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="no"
              name="artisan"
              value="no"
              onChange={() => setArtisan(false)}
              // checked={true}
              className="ml-8 mr-2 focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
            />
            <label htmlFor="no">No</label>
          </div>
        </div>

        {/* upload image */}
        <div className=" mb-4">
          <label
            htmlFor="fullname"
            className="block mb-2 text-purple-900 font-bold"
          >
            Select profile image
          </label>
          <input
            type="file"
            id="profileImage"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className="focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block mb-2 text-purple-900 font-bold"
          >
            Enter your fullname
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full rounded-md p-2 focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
            placeholder="Akinrimisi Tolulope"
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="primaryNumber"
              className="block mb-2 text-purple-900 font-bold"
            >
              Enter primary number
            </label>
            <input
              type="tel"
              id="primaryNumber"
              value={no1}
              onChange={handlePhoneNumber1Change}
              className="w-full rounded-md p-2 focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
              placeholder="e.g. 0801-234-5678"
              required
            />
          </div>
          <div>
            <label
              htmlFor="secondaryNumber"
              className="block mb-2 text-purple-900 font-bold"
            >
              Enter secondary number
            </label>
            <input
              type="tel"
              id="secondaryNumber"
              value={no2}
              onChange={handlePhoneNumber2Change}
              className="w-full rounded-md p-2 focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
              placeholder="e.g. 0808-765-4321"
            />
          </div>
        </div>
        {/* ADDRESS */}
        {/* <div className="mb-4">
          <label htmlFor="address" className="block mb-2">
            Enter Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="homeAddress"
            className="block mb-2 text-purple-900 font-bold"
          >
            Enter home address
          </label>
          <input
            type="text"
            id="homeAddress"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            className="w-full rounded-md p-2 focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200"
            placeholder="e.g. 7 Bode Thomas"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-purple-900 font-bold"
            >
              Enter city
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200 rounded-md p-2"
              placeholder="Lekki"
            />
          </div>
          <div>
            <label
              htmlFor="localGovtArea"
              className="block mb-2 text-purple-900 font-bold"
            >
              Enter Local government area
            </label>
            <input
              type="text"
              id="localGovtArea"
              value={localgvt}
              onChange={(e) => setLocalgvt(e.target.value)}
              className="w-full focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200 rounded-md p-2"
              placeholder="e.g. Eti-osa"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block mb-2 text-purple-900 font-bold"
          >
            Enter state
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200 rounded-md p-2"
            placeholder="e.g. Lagos"
          />
        </div>

        {artisan && (
          <>
            {/* Bio  needed */}
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block mb-2 text-purple-900 font-bold"
              >
                Update Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200 rounded-md p-2"
                rows="4"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>

            {/* profession */}
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block mb-2 text-purple-900 font-bold"
              >
                Your Profession
              </label>
              <input
                type="text"
                id="state"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full focus:border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-200 rounded-md p-2"
                placeholder="e.g. Plumber"
              />
            </div>
          </>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-900"
          >
            {submitting ? (
              <span>
                <Loading />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </form>
      {/* <form action="">
        <div>
          <p>Are you an Artisan?</p>
          <label htmlFor="yes">Yes </label>
          <input
            type="radio"
            id="yes"
            name="artisan"
            value="yes"
            onChange={()=> {setArtisan(true)}}
          />
          <label htmlFor="no">No </label>
          <input
            type="radio"
            id="no"
            name="artisan"
            value="no"
            checked
            onChange={()=> {setArtisan(false)}}
          />
        </div>

        <input
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          value={fullname}
          type="text"
          placeholder="Enter your fullname."
        />

        <input
          type="number"
          placeholder="Enter primary number e.g 08012345678"
          onChange={(e) => {
            setNo1(e.target.value);
          }}
          value={no1}
        />
        <input
          type="number"
          placeholder="Enter secondary number e.g 08087654321"
          onChange={(e) => {
            setNo2(e.target.value);
          }}
          value={no2}
        />

        <div>
          <p>Enter Address</p>
          <input
            type="text"
            placeholder="Enter home address e.g 7 Bode Thomas"
            onChange={(e) => {
              setHomeAddress(e.target.value);
            }}
            value={homeAddress}
          />
          <input type="text" 
          placeholder="Enter city" 
          onChange={(e) => {
            setCity(e.target.value)
          }} 
          value={city}
          />
          <input
            type="text"
            placeholder="Enter Local government area e.g Eti-osa"
            onChange={(e) => {
              setLocalgvt(e.target.value);
            }}
            value={localgvt}
          />
          <input
            type="text"
            placeholder="Enter state e.g Lagos"
            onChange={(e) => {
              setState(e.target.value);
            }}
            value={state}
          />
        </div>

        {artisan && (
          <div>
            <p>What is your profession or what you do?</p>
            <input
              type="text"
              placeholder="E.g Carpentry"
              onChange={(e) => {
                setProfession(e.target.value);
              }}
              value={profession}
            />
          </div>
        )}

        <button onClick={updateBio}>Update Bio</button>
      </form> */}
    </main>
  );
}
