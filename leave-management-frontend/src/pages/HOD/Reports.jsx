// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import Loader from "../../components/Loader";

// const Reports = () => {
//   const { user } = useAuth();
//   const [leaveReports, setLeaveReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState({ startDate: "", endDate: "" });

//   useEffect(() => {
//     console.log("--- user report  ---", user);
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
//         console.log("-----   report  ----", response.data);

//         setLeaveReports(response.data);
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [filter, user]);

//   if (loading) return <Loader />;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-[#006A71] mb-4">Leave Reports</h1>

//       <div className="flex space-x-4 mb-4">
//         <input
//           type="date"
//           value={filter.startDate}
//           onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
//           className="border p-2 rounded"
//         />
//         <input
//           type="date"
//           value={filter.endDate}
//           onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
//           className="border p-2 rounded"
//         />
//       </div>

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">Employee</th>
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Reason</th>
//             <th className="p-2 border">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaveReports.map((report) => (
//             <tr key={report._id} className="text-center border">
//               <td className="p-2 border">
//                 {report.employee?.name} ({report.employee?.department})
//               </td>
//               <td className="p-2 border">
//                 {report?.startDate?.slice(0, 10)} -{" "}
//                 {report?.endDate?.slice(0, 10)}
//               </td>
//               <td className="p-2 border">{report.reason}</td>
//               <td className="p-2 border">{report.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
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
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });
  const [expanded, setExpanded] = useState({});

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
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [filter, user]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-white p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center text-[#006A71] mb-10">
        Leave Reports
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
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

      {leaveReports.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No reports found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {leaveReports.map((report) => {
            const isExpanded = expanded[report._id];
            const showToggle = report.reason.length > 100;
            const displayReason = isExpanded
              ? report.reason
              : report.reason.slice(0, 100);

            return (
              <div
                key={report._id}
                className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-transform hover:scale-[1.015]"
              >
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-[#006A71]">
                    {report.employee?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {report.employee?.department}
                  </p>
                </div>

                <div className="mb-3 text-sm text-gray-700">
                  <strong>From:</strong> {report.startDate.slice(0, 10)} <br />
                  <strong>To:</strong> {report.endDate.slice(0, 10)}
                </div>

                <div className="mb-4">
                  <p className="text-[#006A71] font-medium mb-1">Reason:</p>
                  <p className="text-gray-800 text-sm leading-relaxed break-words">
                    {displayReason}
                    {showToggle && (
                      <span
                        onClick={() => toggleExpand(report._id)}
                        className="ml-2 text-[#48A6A7] cursor-pointer font-semibold hover:underline"
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </span>
                    )}
                  </p>
                </div>

                <div
                  className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                    report.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {report.status}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reports;
