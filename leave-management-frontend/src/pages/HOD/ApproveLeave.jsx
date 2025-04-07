// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import Loader from "../../components/Loader";

// const ApproveLeave = () => {
//   const { user } = useAuth();
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/department-leaves`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         console.log("----  leave reqq  ----", response.data);

//         setLeaveRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching leave requests:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveRequests();
//   }, [user]);

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/leaves/update/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setLeaveRequests((prev) =>
//         prev.map((leave) => (leave._id === id ? { ...leave, status } : leave))
//       );
//     } catch (error) {
//       console.error("Error updating leave status:", error);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-[#006A71] mb-4">
//         Manage Leave Requests
//       </h1>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Employee</th>
//             <th className="p-2 border">Dates</th>
//             <th className="p-2 border">Reason</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaveRequests.map((leave) => (
//             <tr key={leave._id} className="text-center border">
//               <td className="p-2 border">
//                 {leave.employee?.name} ({leave.employee?.department})
//               </td>
//               <td className="p-2 border">
//                 {leave.startDate.slice(0, 10)} to {leave.endDate.slice(0, 10)}
//               </td>
//               <td className="p-2 border">{leave.reason}</td>
//               <td className="p-2 border">{leave.status}</td>
//               <td className="p-2 border">
//                 {leave.status === "Pending" && (
//                   <>
//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded mr-2"
//                       onClick={() => handleStatusChange(leave._id, "Approved")}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                       onClick={() =>
//                         handleStatusChange(leave._id, "Talk to HOD")
//                       }
//                     >
//                       Talk to HOD
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApproveLeave;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import Loader from "../../components/Loader";

// const ApproveLeave = () => {
//   const { user } = useAuth();
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     if (!user) return;

//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/department-leaves`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         setLeaveRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching leave requests:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveRequests();
//   }, [user]);

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/leaves/update/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setLeaveRequests((prev) =>
//         prev.map((leave) => (leave._id === id ? { ...leave, status } : leave))
//       );
//     } catch (error) {
//       console.error("Error updating leave status:", error);
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-[#F2EFE7] p-6 md:p-10">
//       <h1 className="text-3xl font-bold text-[#006A71] mb-8 text-center">
//         Manage Leave Requests
//       </h1>

//       {leaveRequests.length === 0 ? (
//         <p className="text-center text-gray-700">No leave requests found.</p>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {leaveRequests.map((leave) => {
//             const isExpanded = expanded[leave._id];
//             const showToggle = leave.reason.length > 100;
//             const displayReason = isExpanded
//               ? leave.reason
//               : leave.reason.slice(0, 100);

//             return (
//               <div
//                 key={leave._id}
//                 className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
//               >
//                 <p className="text-[#006A71] font-semibold text-lg mb-2">
//                   {leave.employee?.name}
//                 </p>
//                 <p className="text-sm text-gray-600 mb-1">
//                   Department:{" "}
//                   <span className="font-medium">
//                     {leave.employee?.department}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-2">
//                   <strong>From:</strong> {leave.startDate.slice(0, 10)} <br />
//                   <strong>To:</strong> {leave.endDate.slice(0, 10)}
//                 </p>
//                 <div className="mb-3">
//                   <p className="text-[#006A71] font-medium">Reason:</p>
//                   <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
//                     {displayReason}
//                     {showToggle && (
//                       <span
//                         className="text-[#48A6A7] cursor-pointer ml-1 font-medium"
//                         onClick={() => toggleExpand(leave._id)}
//                       >
//                         {isExpanded ? "...Read less" : "...Read more"}
//                       </span>
//                     )}
//                   </p>
//                 </div>
//                 <p
//                   className={`text-sm font-semibold mb-4 ${
//                     leave.status === "Approved"
//                       ? "text-green-600"
//                       : leave.status === "Pending"
//                       ? "text-yellow-500"
//                       : "text-orange-500"
//                   }`}
//                 >
//                   Status: {leave.status}
//                 </p>
//                 {leave.status === "Pending" && (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleStatusChange(leave._id, "Approved")}
//                       className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleStatusChange(leave._id, "Talk to HOD")
//                       }
//                       className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
//                     >
//                       Talk to HOD
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApproveLeave;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const ApproveLeave = () => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    if (!user) return;

    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leaves/department-leaves`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setLeaveRequests(response.data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/leaves/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setLeaveRequests((prev) =>
        prev.map((leave) => (leave._id === id ? { ...leave, status } : leave))
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-[#ffffff] p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center text-[#006A71] mb-10 drop-shadow">
        Manage Leave Requests
      </h1>

      {leaveRequests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No leave requests yet.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {leaveRequests.map((leave) => {
            const isExpanded = expanded[leave._id];
            const showToggle = leave.reason.length > 100;
            const displayReason = isExpanded
              ? leave.reason
              : leave.reason.slice(0, 100);

            return (
              <div
                key={leave._id}
                className="bg-white/60 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl p-6 transition-all hover:scale-[1.015] hover:shadow-2xl"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-[#006A71]">
                    {leave.employee?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {leave.employee?.department}
                  </p>
                </div>

                <div className="mb-3 text-sm text-gray-700">
                  <strong>From:</strong> {leave.startDate.slice(0, 10)} <br />
                  <strong>To:</strong> {leave.endDate.slice(0, 10)}
                </div>

                <div className="mb-4">
                  <p className="text-[#006A71] font-medium mb-1">Reason:</p>
                  <p className="text-gray-800 text-sm leading-relaxed break-words">
                    {displayReason}
                    {showToggle && (
                      <span
                        onClick={() => toggleExpand(leave._id)}
                        className="ml-2 text-[#48A6A7] cursor-pointer font-semibold hover:underline"
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </span>
                    )}
                  </p>
                </div>

                <p
                  className={`text-sm font-semibold mb-5 ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Pending"
                      ? "text-yellow-500"
                      : "text-orange-500"
                  }`}
                >
                  Status: {leave.status}
                </p>

                {leave.status === "Pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(leave._id, "Approved")}
                      className="flex-1 bg-[#006A71] hover:bg-[#005359] text-white py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(leave._id, "Talk to HOD")
                      }
                      className="flex-1 bg-[#FF4C29] hover:bg-[#d94121] text-white py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      Talk to HOD
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApproveLeave;
