import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "../components/Loader";

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
        console.log("Fetched messages:", messagesResponse.data);

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
      console.log("Message sent:", response.data);

      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="bg-[#006A71] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-3 text-white rounded-full bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Leave Discussion</h2>
            {leaveDetails && (
              <p className="text-sm text-white/80">
                {leaveDetails.employeeName || "Employee"}'s Leave Request
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white transition-colors hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-start justify-between">
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
      <div className="p-4 overflow-y-auto h-80 bg-[#e5ded8]">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto mb-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                />
              </svg>
              <p className="text-lg font-medium">No messages yet</p>
              <p className="mt-1 text-sm">
                Start the conversation about this leave request!
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isCurrentUser = msg.sender._id === user._id;
            const showSenderInfo =
              index === 0 || messages[index - 1].sender._id !== msg.sender._id;

            return (
              <div key={msg._id} className="mb-3">
                {showSenderInfo && (
                  <div
                    className={`text-xs text-gray-600 mb-1 ${
                      isCurrentUser ? "text-right mr-2" : "ml-2"
                    }`}
                  >
                    👨🏻‍💻 {isCurrentUser ? "You" : msg.sender.name}
                  </div>
                )}
                <div
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                      isCurrentUser
                        ? "bg-[#dcf8c6] text-gray-800"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="mt-1 text-xs text-right text-gray-500">
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="flex gap-2 p-3 bg-[#f0f0f0] border-t"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71] shadow-sm"
        />
        <button
          type="submit"
          className="bg-[#006A71] text-white px-4 py-2 rounded-full hover:bg-[#004a4f] transition-colors flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
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
