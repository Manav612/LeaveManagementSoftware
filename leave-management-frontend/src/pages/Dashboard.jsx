// import React, { useContext, useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import Loader from "../components/Loader";
// import { motion } from "framer-motion";

// const Dashboard = () => {
//   const { user } = useAuth();

//   const [leaveStats, setLeaveStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return; // Prevent API call if user is null

//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/statistics`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         setLeaveStats(response.data);
//       } catch (error) {
//         console.error("Error fetching leave stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [user]);

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-[#F2EFE7] p-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-[#006A71] text-center mb-6"
//       >
//         Welcome, {user.name}!
//       </motion.h1>

//       {/* Employee Dashboard */}
//       {user.role === "employee" && leaveStats && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white shadow-lg p-6 rounded-lg text-center"
//         >
//           <h2 className="text-xl font-semibold text-[#48A6A7] mb-4">
//             Your Leave Summary
//           </h2>
//           <p className="text-lg text-gray-700">
//             Total Leaves Taken: <strong>{leaveStats.totalLeaves}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Pending Approvals: <strong>{leaveStats.pendingLeaves}</strong>
//           </p>
//         </motion.div>
//       )}

//       {/* HOD Dashboard */}
//       {user.role === "hod" && leaveStats && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white shadow-lg p-6 rounded-lg text-center"
//         >
//           <h2 className="text-xl font-semibold text-[#48A6A7] mb-4">
//             Team Leave Overview
//           </h2>
//           <p className="text-lg text-gray-700">
//             Total Requests: <strong>{leaveStats.totalRequests}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Approved Leaves: <strong>{leaveStats.approvedLeaves}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Pending Requests: <strong>{leaveStats.pendingRequests}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Rejected Leaves: <strong>{leaveStats.rejectedLeaves}</strong>
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useContext, useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Loader from "../components/Loader";
// import { motion } from "framer-motion";

// // New Chat component
// const ChatUI = ({ leaveId, user, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [leaveDetails, setLeaveDetails] = useState(null);

//   useEffect(() => {
//     const fetchLeaveAndMessages = async () => {
//       try {
//         // Fetch the leave details
//         const leaveResponse = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/${leaveId}`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         setLeaveDetails(leaveResponse.data);

//         // Fetch messages for this leave
//         const messagesResponse = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/messages/${leaveId}`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         setMessages(messagesResponse.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveAndMessages();
//   }, [leaveId, user.token]);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/messages`,
//         {
//           leaveId,
//           content: newMessage,
//         },
//         {
//           headers: { Authorization: `Bearer ${user.token}` },
//         }
//       );
//       console.log("---- msg response   -----", response.data);
//       setMessages([...messages, response.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-[#006A71]">
//           Discussion about your leave
//         </h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           Close
//         </button>
//       </div>

//       {leaveDetails && (
//         <div className="bg-gray-50 p-3 rounded-lg mb-4">
//           <p className="font-medium text-gray-700">Leave Details:</p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">From:</span>{" "}
//             {new Date(leaveDetails.startDate).toLocaleDateString()}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">To:</span>{" "}
//             {new Date(leaveDetails.endDate).toLocaleDateString()}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Reason:</span> {leaveDetails.reason}
//           </p>
//         </div>
//       )}

//       <div className="h-80 overflow-y-auto mb-4 p-3 border rounded-lg">
//         {messages.length === 0 ? (
//           <p className="text-center text-gray-500 my-10">
//             No messages yet. Start the conversation!
//           </p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`mb-3 max-w-[80%] ${
//                 msg.sender === user._id
//                   ? "ml-auto bg-[#006A71] text-white"
//                   : "bg-gray-100 text-gray-800"
//               } p-3 rounded-lg`}
//             >
//               <p className="text-sm">{msg.content}</p>
//               <p className="text-xs mt-1 opacity-70">
//                 {new Date(msg.createdAt).toLocaleTimeString()}
//               </p>
//             </div>
//           ))
//         )}
//       </div>

//       <form onSubmit={sendMessage} className="flex gap-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71]"
//         />
//         <button
//           type="submit"
//           className="bg-[#006A71] text-white px-4 py-2 rounded-lg hover:bg-[#004a4f] transition-colors"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const { user } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [leaveStats, setLeaveStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showChat, setShowChat] = useState(false);
//   const [activeChatLeaveId, setActiveChatLeaveId] = useState(null);

//   // Parse query parameters
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const leaveId = queryParams.get("leaveId");
//     const action = queryParams.get("action");

//     if (leaveId && action === "chat") {
//       setActiveChatLeaveId(leaveId);
//       setShowChat(true);

//       // Clear the URL parameters after processing
//       navigate("/dashboard", { replace: true });
//     }
//   }, [location, navigate]);

//   useEffect(() => {
//     if (!user) return; // Prevent API call if user is null

//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/statistics`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         console.log("---- dash stats ----->", response.data);

//         setLeaveStats(response.data);
//       } catch (error) {
//         console.error("Error fetching leave stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [user]);

//   const closeChat = () => {
//     setShowChat(false);
//     setActiveChatLeaveId(null);
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-[#F2EFE7] p-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-[#006A71] text-center mb-6"
//       >
//         Welcome, {user.name}!
//       </motion.h1>

//       {/* Show Chat UI if needed */}
//       {showChat && activeChatLeaveId && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <ChatUI leaveId={activeChatLeaveId} user={user} onClose={closeChat} />
//         </motion.div>
//       )}

//       {/* Employee Dashboard */}
//       {user.role === "employee" && leaveStats && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white shadow-lg p-6 rounded-lg text-center"
//         >
//           <h2 className="text-xl font-semibold text-[#48A6A7] mb-4">
//             Your Leave Summary
//           </h2>
//           <p className="text-lg text-gray-700">
//             Total Leaves Taken: <strong>{leaveStats.totalLeaves}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Pending Approvals: <strong>{leaveStats.pendingLeaves}</strong>
//           </p>
//         </motion.div>
//       )}

//       {/* HOD Dashboard */}
//       {user.role === "hod" && leaveStats && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white shadow-lg p-6 rounded-lg text-center"
//         >
//           <h2 className="text-xl font-semibold text-[#48A6A7] mb-4">
//             Team Leave Overview
//           </h2>
//           <p className="text-lg text-gray-700">
//             Total Requests: <strong>{leaveStats.totalRequests}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Approved Leaves: <strong>{leaveStats.approvedLeaves}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Pending Requests: <strong>{leaveStats.pendingRequests}</strong>
//           </p>
//           <p className="text-lg text-gray-700">
//             Rejected Leaves: <strong>{leaveStats.rejectedLeaves}</strong>
//           </p>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { ChatComponent } from "../components/Chat";
import { LeaveNotification } from "../components/HodNotificationDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [leaveStats, setLeaveStats] = useState(null);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [activeChatLeaveId, setActiveChatLeaveId] = useState(null);

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const leaveId = queryParams.get("leaveId");
    const action = queryParams.get("action");

    if (leaveId && action === "chat") {
      setActiveChatLeaveId(leaveId);
      setShowChat(true);

      // Clear the URL parameters after processing
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!user) return; // Prevent API call if user is null

    const fetchData = async () => {
      try {
        // Fetch stats
        const statsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leaves/statistics`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setLeaveStats(statsResponse.data);

        // For HOD, fetch pending leave requests
        if (user.role === "hod") {
          const leavesResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/leaves/pending`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setPendingLeaves(leavesResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) return; // Prevent API call if user is null

    const fetchData = async () => {
      try {
        setLoading(true);

        // For HOD, fetch pending leave requests
        if (user.role === "hod") {
          // Fetch statistics
          const statsResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/leaves/statistics`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setLeaveStats(statsResponse.data);

          // Fetch department leaves (including pending ones)
          const leavesResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/leaves/department-leaves`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          // Filter to get the most recent leaves (or you could filter by status on the backend)
          const recentLeaves = leavesResponse.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5); // Get the 5 most recent

          setPendingLeaves(recentLeaves);
        } else {
          // For employees, fetch their leave stats
          const statsResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/leaves/my-leaves`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );

          // Process the data to get stats
          const leaves = statsResponse.data;
          const totalLeaves = leaves.length;
          const pendingLeaves = leaves.filter(
            (leave) => leave.status === "Pending"
          ).length;

          setLeaveStats({
            totalLeaves,
            pendingLeaves,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleChatOpen = (leaveId) => {
    setActiveChatLeaveId(leaveId);
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
    setActiveChatLeaveId(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F2EFE7] p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#006A71] text-center mb-6"
      >
        Welcome, {user.name}!
      </motion.h1>

      <div className="max-w-6xl mx-auto">
        {/* Show Chat UI if needed */}
        {showChat && activeChatLeaveId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ChatComponent
              leaveId={activeChatLeaveId}
              user={user}
              onClose={closeChat}
            />
          </motion.div>
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white shadow-lg p-6 rounded-lg text-center lg:col-span-1"
          >
            <h2 className="text-xl font-semibold text-[#48A6A7] mb-4">
              {user.role === "employee"
                ? "Your Leave Summary"
                : "Team Leave Overview"}
            </h2>

            {user.role === "employee" && leaveStats && (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-gray-700">Total Leaves:</span>
                  <span className="font-bold text-[#006A71]">
                    {leaveStats.totalLeaves}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-gray-700">Pending Approvals:</span>
                  <span className="font-bold text-yellow-600">
                    {leaveStats.pendingLeaves}
                  </span>
                </div>
              </div>
            )}

            {user.role === "hod" && leaveStats && (
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-gray-700">Total Requests:</span>
                  <span className="font-bold text-[#006A71]">
                    {leaveStats.totalRequests}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-gray-700">Approved:</span>
                  <span className="font-bold text-green-600">
                    {leaveStats.approvedLeaves}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-gray-700">Pending:</span>
                  <span className="font-bold text-yellow-600">
                    {leaveStats.pendingRequests}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span className="text-gray-700">Rejected:</span>
                  <span className="font-bold text-red-600">
                    {leaveStats.rejectedLeaves}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* HOD Pending Leaves Section */}
          {user.role === "hod" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white shadow-lg p-6 rounded-lg lg:col-span-2"
            >
              <h2 className="text-xl font-semibold text-[#48A6A7] mb-4">
                Recent Leave Requests
              </h2>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {pendingLeaves.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No pending leave requests
                  </p>
                ) : (
                  pendingLeaves.map((leave) => (
                    <LeaveNotification
                      key={leave._id}
                      leave={leave}
                      onChatOpen={handleChatOpen}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
