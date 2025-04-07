// import React, { useState, useContext } from "react";
// import AuthContext from "../../context/AuthContext";
// import Button from "../../components/Button";
// import { motion } from "framer-motion";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full"
//       >
//         <h2 className="text-2xl font-bold text-center text-[#006A71] mb-6">
//           Login to Leave Manager
//         </h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaLock,
  FaBriefcase,
  FaChartLine,
  FaCalendarCheck,
  FaUserClock,
  FaChartBar,
  FaCheckCircle,
  FaLayerGroup,
} from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col md:flex-row overflow-hidden">
      {/* Left branding section - Ultra Premium Design */}
      <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#006A71] via-[#48A6A7] to-[#006A71] relative overflow-hidden">
        {/* Geometric accent shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute -bottom-10 -left-10 text-white/5 w-72 h-72"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M44.5,-76.3C59.1,-69.9,73.2,-60.1,81.9,-46.2C90.6,-32.3,93.8,-14.3,92.4,3.1C90.9,20.5,84.7,37.3,74.6,51.2C64.5,65.1,50.5,76.1,35.3,80.3C20.1,84.5,3.8,81.9,-12.4,78.1C-28.6,74.3,-44.7,69.3,-57.3,59.4C-69.9,49.5,-79,34.7,-83.6,18.5C-88.2,2.3,-88.3,-15.3,-82.5,-30.2C-76.7,-45.1,-65,-57.3,-51.1,-64.4C-37.2,-71.5,-21.1,-73.5,-4.9,-66.1C11.3,-58.7,29.9,-42,44.5,-76.3Z" />
          </svg>
          <svg
            className="absolute -top-20 -right-20 text-white/5 w-96 h-96"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M39.9,-68.1C52.5,-62.1,64.2,-52.7,71.6,-40.3C79,-27.9,82.1,-12.5,81.7,2.8C81.3,18.1,77.3,33.3,69.2,46.7C61.1,60.1,48.8,71.7,34.5,77.7C20.3,83.7,4,84,-11.6,80.8C-27.2,77.6,-42.1,70.8,-54.6,60.5C-67.1,50.2,-77.3,36.3,-81.9,20.8C-86.5,5.3,-85.5,-11.7,-79.3,-26.2C-73.1,-40.7,-61.7,-52.7,-48.4,-58.5C-35.1,-64.3,-19.9,-63.9,-5.2,-56.3C9.5,-48.7,27.3,-74.1,39.9,-68.1Z" />
          </svg>
        </div>

        {/* Content container with premium styling */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Main content with premium styling */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-sm mb-6"
              >
                <span className="w-2 h-2 bg-[#9ACBD0] rounded-full mr-2"></span>
                ENTERPRISE WORKFORCE SOLUTION
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl font-bold text-white leading-tight"
              >
                Intelligent Staff <br />
                <span className="text-[#9ACBD0]">Management</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "120px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-white/30 mt-6 mb-8 rounded-full"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/80 text-lg leading-relaxed mb-12 max-w-md"
              >
                Elevate your workforce management with our AI-powered platform.
                Streamline leave requests, optimize scheduling, and gain
                actionable insights.
              </motion.p>
            </div>

            {/* Feature cards with premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              {[
                { icon: <FaCalendarCheck />, title: "Smart Leave Management" },
                { icon: <FaUserClock />, title: "Attendance Tracking" },
                { icon: <FaChartBar />, title: "Analytics Dashboard" },
                { icon: <FaCheckCircle />, title: "Approval Workflows" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 text-[#9ACBD0]">{feature.icon}</div>
                    <div className="text-white font-medium">
                      {feature.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial with premium styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#9ACBD0]/20 flex items-center justify-center text-[#9ACBD0]">
                    <FaUserCircle />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-white/90 italic text-sm">
                    "This platform has transformed how we manage our workforce.
                    The efficiency gains are remarkable."
                  </p>
                  <div className="mt-2 text-white/70 text-xs">
                    Sarah Johnson, HR Director
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer with premium styling */}
          <div className="mt-auto pt-8 flex justify-between items-center text-white/50 text-sm">
            <div>© 2023 Enterprise Solutions</div>
            <div className="flex space-x-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right login section */}
      <div className="flex-1 bg-[#F2EFE7] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-md w-full relative z-10"
          style={{
            boxShadow:
              "0 20px 70px rgba(0, 106, 113, 0.12), 0 10px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Top login header with 3D effect */}
          <div className="mb-8">
            <motion.div
              className="mb-2 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-2xl shadow-lg transform -rotate-6">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <div className="w-16 h-16 flex items-center justify-center bg-white border-2 border-[#48A6A7]/30 rounded-2xl shadow-lg absolute transform rotate-6 -mt-1 ml-1">
                <FaChartLine className="text-[#006A71] text-2xl" />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mt-6">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mt-2">
              Access your workspace dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUserCircle className="text-[#48A6A7]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#48A6A7]/50 to-transparent opacity-50"></div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-[#48A6A7]" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#48A6A7]/50 to-transparent opacity-50"></div>
            </motion.div>

            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#006A71] focus:ring-[#48A6A7] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#006A71] hover:text-[#48A6A7]"
                >
                  Forgot password?
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {loading ? "Signing in..." : "Sign In"}
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#48A6A7] to-[#006A71] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="mt-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Need assistance?
                </span>
              </div>
            </div>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                Contact our support team at{" "}
                <a
                  href="mailto:support@company.com"
                  className="text-[#006A71] font-medium"
                >
                  support@company.com
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
