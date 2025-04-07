import React from "react";
import { format } from "date-fns";

export const LeaveNotification = ({ leave, onChatOpen }) => {
  // Format dates for display
  const startDate = new Date(leave.startDate);
  const endDate = new Date(leave.endDate);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">
            {leave.employee?.name || "Employee"}
          </h3>
          <p className="text-sm text-gray-600">
            {format(startDate, "MMM dd")} - {format(endDate, "MMM dd, yyyy")}
          </p>
          <p className="text-sm text-gray-600 mt-1">
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

          <button
            onClick={() => onChatOpen(leave._id)}
            className="text-sm bg-[#006A71] text-white px-3 py-1 rounded-full hover:bg-[#004a4f] transition-colors flex items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
        </div>
      </div>
    </div>
  );
};
