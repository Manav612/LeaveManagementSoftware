// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import Loader from "../../components/Loader";

// const Reports = () => {
//   const { user } = useAuth();
//   const [leaveReports, setLeaveReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState({ startDate: "", endDate: "" });
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     if (!user) return;
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/reports`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//             params: filter,
//           }
//         );
//         setLeaveReports(response.data);
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [filter, user]);

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-white p-6 md:p-10">
//       <h1 className="text-4xl font-bold text-center text-[#006A71] mb-10">
//         Leave Reports
//       </h1>

//       {/* Filter Section */}
//       <div className="flex flex-col justify-center gap-4 mb-10 sm:flex-row">
//         <input
//           type="date"
//           value={filter.startDate}
//           onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
//           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition"
//         />
//         <input
//           type="date"
//           value={filter.endDate}
//           onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
//           className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition"
//         />
//       </div>

//       {leaveReports.length === 0 ? (
//         <p className="text-lg text-center text-gray-500">No reports found.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {leaveReports.map((report) => {
//             const isExpanded = expanded[report._id];
//             const showToggle = report.reason.length > 100;
//             const displayReason = isExpanded
//               ? report.reason
//               : report.reason.slice(0, 100);

//             return (
//               <div
//                 key={report._id}
//                 className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.015]"
//               >
//                 <div className="mb-3">
//                   <h2 className="text-xl font-semibold text-[#006A71]">
//                     {report.employee?.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {report.employee?.department}
//                   </p>
//                 </div>

//                 <div className="mb-3 text-sm text-gray-700">
//                   <strong>From:</strong> {report.startDate.slice(0, 10)} <br />
//                   <strong>To:</strong> {report.endDate.slice(0, 10)}
//                 </div>

//                 <div className="mb-4">
//                   <p className="text-[#006A71] font-medium mb-1">Reason:</p>
//                   <p className="text-sm leading-relaxed text-gray-800 break-words">
//                     {displayReason}
//                     {showToggle && (
//                       <span
//                         onClick={() => toggleExpand(report._id)}
//                         className="ml-2 text-[#48A6A7] cursor-pointer font-semibold hover:underline"
//                       >
//                         {isExpanded ? "Read less" : "Read more"}
//                       </span>
//                     )}
//                   </p>
//                 </div>

//                 <div
//                   className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
//                     report.status === "Approved"
//                       ? "bg-green-100 text-green-700"
//                       : report.status === "Pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : "bg-orange-100 text-orange-700"
//                   }`}
//                 >
//                   {report.status}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Reports;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const Reports = () => {
  const { user } = useAuth();
  const [leaveReports, setLeaveReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    startDate: new Date().toISOString().slice(0, 7) + "-01", // First day of current month
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10), // Last day of current month
  });
  const [employeeSummary, setEmployeeSummary] = useState({});
  const [expandedEmployee, setExpandedEmployee] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leaves/reports`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
            params: filter,
          }
        );
        setLeaveReports(response.data);
        processEmployeeSummary(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [filter, user]);

  const processEmployeeSummary = (leaves) => {
    const summary = {};

    leaves.forEach((leave) => {
      if (!leave.employee) return;

      const employeeId = leave.employee._id;

      if (!summary[employeeId]) {
        summary[employeeId] = {
          name: leave.employee.name,
          department: leave.employee.department,
          totalLeaves: 0,
          oneDayLeaves: 0,
          multiDayLeaves: 0,
          totalLeaveDays: 0,
          leaves: [],
        };
      }

      // Only count approved leaves for the summary
      if (leave.status === "Approved") {
        summary[employeeId].totalLeaves++;

        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);
        const isOneDayLeave =
          startDate.toDateString() === endDate.toDateString();

        if (isOneDayLeave) {
          summary[employeeId].oneDayLeaves++;
        } else {
          summary[employeeId].multiDayLeaves++;
        }

        summary[employeeId].totalLeaveDays += leave.leaveDaysCount || 0;
      }

      // Add leave to employee's leave list
      summary[employeeId].leaves.push({
        id: leave._id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        status: leave.status,
        reason: leave.reason,
        leaveDaysCount: leave.leaveDaysCount || 0,
      });
    });

    setEmployeeSummary(summary);
  };

  const toggleEmployeeExpand = (employeeId) => {
    setExpandedEmployee((prev) => ({
      ...prev,
      [employeeId]: !prev[employeeId],
    }));
  };

  // Calculate total days in the selected month
  const getDaysInMonth = () => {
    const startDate = new Date(filter.startDate);
    return new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    ).getDate();
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-white p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center text-[#006A71] mb-10">
        Employee Leave Reports
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col justify-center gap-4 mb-10 sm:flex-row">
        <input
          type="date"
          value={filter.startDate}
          onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition"
        />
        <input
          type="date"
          value={filter.endDate}
          onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#006A71] transition"
        />
      </div>

      {Object.keys(employeeSummary).length === 0 ? (
        <p className="text-lg text-center text-gray-500">
          No reports found for the selected period.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Object.entries(employeeSummary).map(([employeeId, employee]) => {
            const isExpanded = expandedEmployee[employeeId];
            const daysInMonth = getDaysInMonth();

            return (
              <div
                key={employeeId}
                className="p-6 transition border border-gray-200 shadow-xl bg-white/60 backdrop-blur-lg rounded-2xl hover:shadow-2xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#006A71]">
                      {employee.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {employee.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#006A71]">
                      {employee.totalLeaveDays} / {daysInMonth}
                    </p>
                    <p className="text-xs text-gray-500">Leave Days</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 text-center rounded-lg bg-blue-50">
                    <p className="text-lg font-bold text-blue-700">
                      {employee.totalLeaves}
                    </p>
                    <p className="text-xs text-gray-600">Total Leaves</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-green-50">
                    <p className="text-lg font-bold text-green-700">
                      {employee.oneDayLeaves}
                    </p>
                    <p className="text-xs text-gray-600">One-Day</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-purple-50">
                    <p className="text-lg font-bold text-purple-700">
                      {employee.multiDayLeaves}
                    </p>
                    <p className="text-xs text-gray-600">Multi-Day</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleEmployeeExpand(employeeId)}
                  className="w-full py-2 px-4 bg-[#006A71]/10 text-[#006A71] rounded-lg hover:bg-[#006A71]/20 transition flex justify-between items-center"
                >
                  <span>
                    {isExpanded ? "Hide Details" : "Show Leave Details"}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {isExpanded && (
                  <div className="mt-4 space-y-3">
                    {employee.leaves.map((leave) => {
                      const startDate = new Date(
                        leave.startDate
                      ).toLocaleDateString();
                      const endDate = new Date(
                        leave.endDate
                      ).toLocaleDateString();
                      const isOneDayLeave = startDate === endDate;

                      return (
                        <div
                          key={leave.id}
                          className="border-l-4 pl-3 py-2 border-[#006A71]"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {isOneDayLeave
                                  ? startDate
                                  : `${startDate} - ${endDate}`}
                              </p>
                              <p className="text-xs text-gray-500">
                                {isOneDayLeave
                                  ? "One-Day Leave"
                                  : `${leave.leaveDaysCount} Days Leave`}
                              </p>
                            </div>
                            <div
                              className={`text-xs font-semibold px-2 py-1 rounded-full self-start ${
                                leave.status === "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : leave.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {leave.status}
                            </div>
                          </div>
                          {leave.reason && (
                            <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                              {leave.reason}
                            </p>
                          )}
                        </div>
                      );
                    })}
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

export default Reports;
