import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserModal() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState)=> !prevState);
  };

  return (
    <div className="relative inline-block">
      {/* Button to open the modal */}
      <button
        className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-4 px-4 rounded-full"
        onClick={toggleModal}
      >
        <FaUser />
      </button>

      {/* The modal */}
      {isModalOpen && (
        <div className="absolute top-0 right-0 mt-12 mr-4 bg-white rounded-lg shadow-lg w-36">
          {/* Adjusted container width (w-60) */}
          <div className="p-2">
            <div className="flex flex-col">
              <div onClick={()=> {router.push("/profile")}} className="text-txt hover:text-purple-900 font-bold cursor-pointer w-full p-2">
                View Profile
              </div>
              <div className="text-txt hover:text-purple-900 font-bold cursor-pointer w-full p-2" onClick={()=>{router.push("/updatebio")}}>
                Update Profile
              </div>
              <div onClick={()=> {
                localStorage.clear(); window.location.reload()
              }} className="text-txt hover:text-red-500 font-bold cursor-pointer w-full p-2">
                SignOut
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



// import React, { useState } from "react";
// import { FaUser } from "react-icons/fa";

// export default function UserModal() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Button to open the modal */}
//       <button
//         className="bg-purple-500 hover:bg-purple-800 text-white font-bold py-4 px-4 rounded-full"
//         onClick={toggleModal}
//       >
//         <FaUser />
//       </button>

//       {/* The modal */}
//       {isModalOpen && (
//         <div className="absolute top-0 right-0 mt-12 mr-4 bg-white rounded-lg shadow-lg">
//           <div className="p-2">
//             <div className="flex flex-col">
//               {/* Adjusted CSS classes for width */}
//               <div className="text-txt hover:text-purple-900 font-bold cursor-pointer w-full py-2 px-4">
//                 View Profile
//               </div>
//               <div className="text-txt hover:text-purple-900 font-bold cursor-pointer w-full py-2 px-4">
//                 Update Profile
//               </div>
//               <div className="text-txt hover:text-red-500 font-bold cursor-pointer w-full py-2 px-4">
//                 SignOut
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useState } from "react";
// // rect icon import
// import { FaUser } from "react-icons/fa";

// export default function UserModal() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Button to open the modal */}
//       <button
//         className=" bg-purple-500 hover:bg-purple-800 text-white font-bold py-4 px-4 rounded-full"
//         onClick={toggleModal}
//       >
//         <FaUser />
//       </button>

//       {/* The modal */}
//       {isModalOpen && (
//         <div className="absolute top-0 right-0 mt-12 mr-4 bg-white rounded-lg shadow-lg">
//           <div className="p-2">
//             <div>
//               <div className=" text-txt hover:text-purple-900 font-bold cursor-pointer">
//                 View Profile
//               </div>
//               <div className=" text-txt hover:text-purple-900 font-bold cursor-pointer">
//                 Update Profile
//               </div>
//               <div className=" text-txt hover:text-red-500 font-bold cursor-pointer">
//                 SignOut
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
