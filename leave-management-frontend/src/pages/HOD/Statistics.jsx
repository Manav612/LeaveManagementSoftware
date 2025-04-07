// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { Bar } from "react-chartjs-2";
// import Loader from "../../components/Loader";

// // Import required Chart.js components
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Statistics = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("--- user stats  ---", user);

//     if (!user) return;
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/leaves/statistics`,
//           {
//             headers: { Authorization: `Bearer ${user.token}` },
//           }
//         );
//         console.log("-----   stats data -----", response.data);

//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching statistics:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [user]);

//   if (loading) return <Loader />;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-[#006A71] mb-4">
//         Leave Statistics
//       </h1>
//       <Bar
//         data={{
//           labels: ["Approved", "Pending", "Rejected"],
//           datasets: [
//             {
//               label: "Leave Requests",
//               data: [
//                 stats.find((item) => item._id === "Approved")?.count || 0,
//                 stats.find((item) => item._id === "Pending")?.count || 0,
//                 stats.find((item) => item._id === "Rejected")?.count || 0,
//               ],
//               backgroundColor: ["#48A6A7", "#F2EFE7", "#E63946"],
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: "top",
//             },
//             title: {
//               display: true,
//               text: "Leave Requests",
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default Statistics;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Bar } from "react-chartjs-2";
import Loader from "../../components/Loader";

// Import required Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/leaves/statistics`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) return <Loader />;

  const chartData = {
    labels: ["Approved", "Pending", "Talk to HOD"],
    datasets: [
      {
        label: "Leave Requests",
        data: [
          stats.find((item) => item._id === "Approved")?.count || 0,
          stats.find((item) => item._id === "Pending")?.count || 0,
          stats.find((item) => item._id === "Talk to HOD")?.count || 0,
        ],
        backgroundColor: ["#48A6A7", "#FFD166", "#EF476F"],
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Overall Leave Requests Summary",
        color: "#006A71",
        font: {
          size: 20,
          weight: "bold",
        },
        padding: { top: 10, bottom: 30 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#444",
          font: {
            size: 13,
          },
        },
      },
      y: {
        ticks: {
          color: "#444",
          font: {
            size: 13,
          },
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EFE7] to-white p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center text-[#006A71] mb-10">
        Leave Statistics Dashboard
      </h1>

      <div className="max-w-5xl mx-auto bg-white/60 border border-gray-200 shadow-xl rounded-2xl p-6 md:p-10 backdrop-blur-lg">
        {stats.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No data to display.
          </p>
        ) : (
          <div className="w-full h-[400px] sm:h-[500px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
