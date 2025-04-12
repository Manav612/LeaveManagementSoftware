// import React from "react";
// import { format } from "date-fns";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export const LeaveNotification = ({ leave, onChatOpen }) => {
//   // Format dates for display
//   const startDate = new Date(leave.startDate);
//   const endDate = new Date(leave.endDate);
//   const user = useAuth();

//   const handleStatusChange = async (id, status) => {
//     try {
//       const res = await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/leaves/update/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       if (res.status === 200) {
//         alert("Leave approved successfully");
//       }
//     } catch (error) {
//       console.error("Error updating leave status:", error);
//     }
//   };

//   return (
//     <div className="p-4 transition-shadow rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="font-medium text-gray-800">
//             {leave.employee?.name || "Employee"}
//           </h3>
//           <p className="text-sm text-gray-600">
//             {format(startDate, "MMM dd")} - {format(endDate, "MMM dd, yyyy")}
//           </p>
//           <p className="mt-1 text-sm text-gray-600">
//             <span className="font-medium">Reason:</span> {leave.reason}
//           </p>
//         </div>
//         <div className="flex flex-col gap-2">
//           <span
//             className={`text-sm font-medium px-2 py-1 rounded-full text-center ${
//               leave.status === "Approved"
//                 ? "bg-green-100 text-green-800"
//                 : leave.status === "Rejected"
//                 ? "bg-red-100 text-red-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {leave.status}
//           </span>
//           {leave.status === "Talk to HOD" && (
//             <>
//               <button
//                 onClick={() => onChatOpen(leave._id)}
//                 className="text-sm bg-[#006A71] text-white px-3 py-1 rounded-full hover:bg-[#004a4f] transition-colors flex items-center justify-center gap-1"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-4 h-4"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Chat
//               </button>
//               <button
//                 onClick={() => handleStatusChange(leave._id, "Approved")}
//                 className="flex-1 bg-[#006A71] hover:bg-[#005359] text-white py-2 rounded-lg text-sm font-semibold transition-all"
//               >
//                 Approve
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const LeaveNotification = ({ leave: initialLeave, onChatOpen }) => {
  // Use state to track the current leave status
  const [leave, setLeave] = useState(initialLeave);

  // Format dates for display
  const startDate = new Date(leave.startDate);
  const endDate = new Date(leave.endDate);
  const user = useAuth();

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/leaves/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (res.status === 200) {
        // Update the local state to reflect the new status
        setLeave({ ...leave, status });
        alert("Leave approved successfully");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <div className="p-4 transition-shadow rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-800">
            {leave.employee?.name || "Employee"}
          </h3>
          <p className="text-sm text-gray-600">
            {format(startDate, "MMM dd")} - {format(endDate, "MMM dd, yyyy")}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">Reason:</span> {leave.reason}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full text-center ${
              leave.status === "Approved"
                ? "bg-green-100 text-green-800"
                : leave.status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {leave.status}
          </span>
          {leave.status === "Talk to HOD" && (
            <>
              <button
                onClick={() => onChatOpen(leave._id)}
                className="text-sm bg-[#006A71] text-white px-3 py-1 rounded-full hover:bg-[#004a4f] transition-colors flex items-center justify-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Chat
              </button>
              <button
                onClick={() => handleStatusChange(leave._id, "Approved")}
                className="flex-1 bg-[#006A71] hover:bg-[#005359] text-white py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
