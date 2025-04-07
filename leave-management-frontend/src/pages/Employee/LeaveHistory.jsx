import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LeaveHistory = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leaves/my-leaves`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, [user]);

  const handleChatWithHOD = (leaveId) => {
    // Navigate to dashboard with the leave ID
    navigate(`/dashboard?leaveId=${leaveId}&action=chat`);
  };

  const getStatusBadge = (status, leaveId) => {
    const colorMap = {
      Approved: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      "Talk to HOD": "bg-orange-100 text-orange-700",
    };

    return (
      <div className="flex items-center gap-2">
        <span
          className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
            colorMap[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>

        {status === "Talk to HOD" && (
          <button
            onClick={() => handleChatWithHOD(leaveId)}
            className="bg-[#006A71] text-white px-3 py-1 text-sm rounded-full font-medium hover:bg-[#004a4f] transition-colors"
          >
            Chat with HOD
          </button>
        )}
      </div>
    );
  };

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // const getStatusBadge = (status) => {
  //   const colorMap = {
  //     Approved: "bg-green-100 text-green-700",
  //     Pending: "bg-yellow-100 text-yellow-700",
  //     "Talk to HOD": "bg-orange-100 text-orange-700",
  //   };

  //   return (
  //     <span
  //       className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
  //         colorMap[status] || "bg-gray-100 text-gray-700"
  //       }`}
  //     >
  //       {status}
  //     </span>
  //   );
  // };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F2EFE7] px-4 sm:px-6 lg:px-16 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold text-[#006A71] text-center mb-10"
      >
        Your Leave History
      </motion.h1>

      {leaves.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No leave records found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaves.map((leave, index) => {
            const isExpanded = expandedCards[leave._id];
            return (
              <motion.div
                key={leave._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.05)] p-6 border border-gray-100 flex flex-col justify-between"
              >
                <h2 className="text-lg font-semibold text-[#006A71] mb-2">
                  Reason
                </h2>
                <p
                  className={`text-gray-700 text-sm whitespace-pre-wrap break-words transition-all ${
                    isExpanded ? "" : "line-clamp-4"
                  }`}
                >
                  {leave.reason}
                </p>
                {leave.reason.length > 150 && (
                  <button
                    onClick={() => toggleExpand(leave._id)}
                    className="text-[#48A6A7] text-sm mt-1 hover:underline self-start"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">End:</span>{" "}
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4">
                  {getStatusBadge(leave.status, leave._id)}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;
