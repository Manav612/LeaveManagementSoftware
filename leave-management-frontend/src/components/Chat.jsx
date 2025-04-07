import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

// Separate Chat Component
export const ChatComponent = ({ leaveId, user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [leaveDetails, setLeaveDetails] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchLeaveAndMessages = async () => {
      try {
        // Fetch the leave details
        const leaveResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leaves/${leaveId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setLeaveDetails(leaveResponse.data);

        // Fetch messages for this leave
        const messagesResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/messages/${leaveId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setMessages(messagesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveAndMessages();
  }, [leaveId, user.token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/messages`,
        {
          leaveId,
          content: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
      {/* Chat Header */}
      <div className="bg-[#006A71] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Leave Discussion</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Leave Details Card */}
      {leaveDetails && (
        <div className="bg-gray-50 p-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">Leave Request</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Employee:</span>{" "}
                {leaveDetails.employeeName || "Employee"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-medium ${
                    leaveDetails.status === "approved"
                      ? "text-green-600"
                      : leaveDetails.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {leaveDetails.status?.charAt(0).toUpperCase() +
                    leaveDetails.status?.slice(1)}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                <span className="font-medium">From:</span>{" "}
                {new Date(leaveDetails.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">To:</span>{" "}
                {new Date(leaveDetails.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Days:</span>{" "}
                {Math.ceil(
                  (new Date(leaveDetails.endDate) -
                    new Date(leaveDetails.startDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Reason:</span> {leaveDetails.reason}
            </p>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-gray-500">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-3 max-w-[80%] ${
                msg.sender === user._id
                  ? "ml-auto bg-[#006A71] text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              } p-3 rounded-lg shadow-sm`}
            >
              <p className="text-sm">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === user._id ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-3 bg-white border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71]"
        />
        <button
          type="submit"
          className="bg-[#006A71] text-white px-4 py-2 rounded-full hover:bg-[#004a4f] transition-colors flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
