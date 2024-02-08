import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import UserModal from "./UserModal";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const navigate = useRouter();
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("uname")) {
      setShowBtn(false);
    }
  }, []);
  return (
    <div className=" flex mx-20 justify-between">
      <Logo />

      {showBtn ? (
        <div className=" flex justify-center py-5">
          <button
            onClick={() => {
              navigate.push("/login");
            }}
            className=" p-2 px-5 rounded-lg font-bold bg-gradient-to-r from-purple-900 to-purple-700 text-center text-white"
          >
            Login
          </button>
        </div>
      ) : (
        <UserModal />
      )}
    </div>
  );
}
