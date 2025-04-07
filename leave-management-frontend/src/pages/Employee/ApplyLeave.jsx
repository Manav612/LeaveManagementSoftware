import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const ApplyLeave = () => {
  const { user } = useAuth();
  const [leaveData, setLeaveData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [isSandwichLeave, setIsSandwichLeave] = useState(false);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
    setDateError(null); // Clear any existing date errors when dates change
  };

  // Validate dates whenever they change
  useEffect(() => {
    validateDates();
    checkSandwichLeave();
  }, [leaveData.startDate, leaveData.endDate]);

  const validateDates = () => {
    if (leaveData.startDate && leaveData.endDate) {
      const start = new Date(leaveData.startDate);
      const end = new Date(leaveData.endDate);

      // Check if it's a one-day leave (start date equals end date)
      if (start.getTime() === end.getTime()) {
        // Check if the selected day is Sunday (0 = Sunday in JavaScript's getDay())
        if (start.getDay() === 0) {
          setDateError(
            "You cannot apply for leave on a Sunday for a single day."
          );
          return false;
        }
      }

      // Ensure end date is not before start date
      if (end < start) {
        setDateError("End date cannot be before start date.");
        return false;
      }
    }

    setDateError(null);
    return true;
  };

  // Check if the leave period includes a sandwich leave (Saturday, Sunday, Monday)
  const checkSandwichLeave = () => {
    if (leaveData.startDate && leaveData.endDate) {
      const start = new Date(leaveData.startDate);
      const end = new Date(leaveData.endDate);

      // If the leave period is less than 3 days, it can't be a sandwich leave
      if ((end - start) / (1000 * 60 * 60 * 24) < 2) {
        setIsSandwichLeave(false);
        return;
      }

      let hasSaturday = false;
      let hasSunday = false;
      let hasMonday = false;

      // Check each day in the leave period
      const currentDate = new Date(start);
      while (currentDate <= end) {
        const day = currentDate.getDay();
        if (day === 6) hasSaturday = true; // Saturday
        if (day === 0) hasSunday = true; // Sunday
        if (day === 1) hasMonday = true; // Monday

        currentDate.setDate(currentDate.getDate() + 1);
      }

      // It's a sandwich leave if all three days are included
      setIsSandwichLeave(hasSaturday && hasSunday && hasMonday);
    } else {
      setIsSandwichLeave(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validateDates()) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/leaves/apply`,
        {
          ...leaveData,
          isSandwichLeave, // Include this flag in the request
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setMessage({ type: "success", text: response.data.message });
      setLeaveData({ startDate: "", endDate: "", reason: "" });
      setIsSandwichLeave(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // Helper function to check if a date is Sunday
  const isSunday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date.getDay() === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EFE7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-[#006A71] mb-6">
          Apply for Leave
        </h2>
        {message && (
          <p
            className={`text-center ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            } mb-4`}
          >
            {message.text}
          </p>
        )}
        {dateError && (
          <p className="text-center text-red-600 mb-4">{dateError}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={leaveData.startDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                isSunday(leaveData.startDate) &&
                leaveData.startDate === leaveData.endDate
                  ? "border-red-300"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-[#48A6A7]`}
              required
            />
            {isSunday(leaveData.startDate) &&
              leaveData.startDate === leaveData.endDate && (
                <p className="text-xs text-red-500 mt-1">
                  Sunday cannot be selected for a single day leave
                </p>
              )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={leaveData.endDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                isSunday(leaveData.endDate) &&
                leaveData.startDate === leaveData.endDate
                  ? "border-red-300"
                  : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-[#48A6A7]`}
              required
            />
          </div>

          {isSandwichLeave && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-700 text-sm">
                <span className="font-semibold">Sandwich Leave:</span> Your
                leave includes Saturday, Sunday, and Monday, which counts as a
                sandwich leave.
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Reason</label>
            <textarea
              name="reason"
              value={leaveData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7]"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={!!dateError}>
            Submit Leave Request
          </Button>
        </form>

        <div className="mt-4 text-xs text-gray-600">
          <p>Note:</p>
          <p>
            {" "}
            A sandwich leave occurs only when Saturday, Sunday, and Monday are
            all included in your leave period
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplyLeave;
