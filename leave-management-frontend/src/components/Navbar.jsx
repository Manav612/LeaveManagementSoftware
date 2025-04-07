// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-[#006A71] text-white fixed w-full shadow-lg z-50">
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
//         <Link to="/dashboard" className="text-2xl font-bold">
//           Leave<span className="text-[#9ACBD0]">Manager</span>
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="lg:hidden text-white focus:outline-none"
//         >
//           ☰
//         </button>

//         {/* Navbar Links */}
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className={`lg:flex lg:items-center ${menuOpen ? "block" : "hidden"}`}
//         >
//           {user ? (
//             <>
//               <Link
//                 to="/apply-leave"
//                 className="block lg:inline-block px-4 py-2 hover:bg-[#48A6A7] rounded-lg"
//               >
//                 Apply Leave
//               </Link>
//               <Link
//                 to="/leave-history"
//                 className="block lg:inline-block px-4 py-2 hover:bg-[#48A6A7] rounded-lg"
//               >
//                 Leave History
//               </Link>
//               <button
//                 onClick={logout}
//                 className="bg-[#9ACBD0] text-black px-4 py-2 ml-4 rounded-lg hover:bg-[#F2EFE7]"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/"
//                 className="block lg:inline-block px-4 py-2 hover:bg-[#48A6A7] rounded-lg"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="block lg:inline-block px-4 py-2 hover:bg-[#48A6A7] rounded-lg"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </motion.div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useContext, useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaUserCircle,
//   FaCalendarAlt,
//   FaHistory,
//   FaSignOutAlt,
//   FaChartBar,
//   FaBell,
//   FaCog,
//   FaBars,
//   FaTimes,
//   FaRegClock,
//   FaLayerGroup,
// } from "react-icons/fa";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const location = useLocation();

//   // Update time
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Detect scroll for navbar appearance change
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location]);

//   // Mock notifications
//   const notifications = [
//     {
//       id: 1,
//       text: "Your leave request was approved",
//       time: "2 hours ago",
//       unread: true,
//     },
//     {
//       id: 2,
//       text: "New company policy update",
//       time: "Yesterday",
//       unread: false,
//     },
//     {
//       id: 3,
//       text: "Reminder: Team meeting tomorrow",
//       time: "2 days ago",
//       unread: false,
//     },
//   ];

//   // Navigation items
//   const navItems = user
//     ? [
//         { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//         { name: "Apply Leave", path: "/apply-leave", icon: <FaCalendarAlt /> },
//         { name: "Leave History", path: "/leave-history", icon: <FaHistory /> },
//       ]
//     : [
//         { name: "Login", path: "/", icon: <FaUserCircle /> },
//         { name: "Register", path: "/register", icon: <FaUserCircle /> },
//       ];

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-white text-[#006A71] shadow-lg py-2"
//           : "bg-gradient-to-r from-[#006A71] via-[#48A6A7] to-[#006A71] text-white py-3"
//       }`}
//     >
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="flex justify-between items-center">
//           {/* Logo and Brand */}
//           <div className="flex items-center space-x-4">
//             <Link to="/dashboard" className="flex items-center">
//               {/* Ultra Premium Logo Design */}
//               <div className="flex items-center">
//                 <div className="relative h-12 w-12 flex items-center justify-center">
//                   {/* Base shape */}
//                   <div
//                     className={`absolute inset-0 rounded-xl shadow-lg ${
//                       scrolled ? "bg-[#006A71]" : "bg-white"
//                     }`}
//                   ></div>

//                   {/* Layered elements for 3D effect */}
//                   <div
//                     className={`absolute inset-1 rounded-lg ${
//                       scrolled ? "bg-white" : "bg-[#48A6A7]"
//                     }`}
//                   ></div>

//                   <div
//                     className={`absolute inset-2 rounded-md ${
//                       scrolled ? "bg-[#9ACBD0]/30" : "bg-[#006A71]"
//                     }`}
//                   ></div>

//                   <div
//                     className={`absolute inset-3 rounded-sm ${
//                       scrolled ? "bg-white" : "bg-white/90"
//                     }`}
//                   ></div>

//                   {/* Center icon */}
//                   <div
//                     className={`absolute inset-0 flex items-center justify-center ${
//                       scrolled ? "text-[#006A71]" : "text-[#006A71]"
//                     }`}
//                   >
//                     <FaLayerGroup className="text-xl" />
//                   </div>

//                   {/* Accent dots */}
//                   <div
//                     className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
//                       scrolled ? "bg-[#48A6A7]" : "bg-[#9ACBD0]"
//                     }`}
//                   ></div>
//                   <div
//                     className={`absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full ${
//                       scrolled ? "bg-[#48A6A7]" : "bg-[#9ACBD0]"
//                     }`}
//                   ></div>
//                 </div>

//                 <div className="ml-3">
//                   <motion.div
//                     className={`font-semibold tracking-tight text-base ${
//                       scrolled ? "" : "text-white"
//                     }`}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     StaffSync
//                   </motion.div>
//                   <div
//                     className={`text-xs uppercase tracking-widest ${
//                       scrolled ? "text-gray-500" : "text-white/70"
//                     }`}
//                   >
//                     Enterprise Edition
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-3">
//             {/* Time display with premium styling */}
//             <div
//               className={`flex items-center space-x-2 px-4 py-2 rounded-lg mr-3 ${
//                 scrolled
//                   ? "bg-gradient-to-r from-gray-100 to-white shadow-sm"
//                   : "bg-white/10 backdrop-blur-sm border border-white/10"
//               }`}
//             >
//               <FaRegClock
//                 className={`text-sm ${
//                   scrolled ? "text-[#48A6A7]" : "text-white/80"
//                 }`}
//               />
//               <span className="text-sm font-medium">
//                 {currentTime.toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   hour12: true, // This explicitly enables 12-hour format with AM/PM
//                 })}
//               </span>
//             </div>

//             {/* Main Navigation with premium styling */}
//             <div
//               className={`flex items-center rounded-xl overflow-hidden ${
//                 scrolled
//                   ? "bg-gray-100/50 p-1"
//                   : "bg-white/5 backdrop-blur-sm p-1"
//               }`}
//             >
//               {navItems.map((item, index) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`relative px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-all ${
//                     location.pathname === item.path
//                       ? scrolled
//                         ? "bg-white text-[#006A71] font-medium shadow-sm"
//                         : "bg-white/20 backdrop-blur-sm text-white font-medium"
//                       : scrolled
//                       ? "text-[#006A71] hover:bg-white/80"
//                       : "text-white/90 hover:bg-white/10"
//                   }`}
//                 >
//                   <span>{item.icon}</span>
//                   <span>{item.name}</span>
//                   {location.pathname === item.path && (
//                     <motion.div
//                       className={`absolute bottom-0 left-2 right-2 h-0.5 ${
//                         scrolled ? "bg-[#48A6A7]" : "bg-[#9ACBD0]"
//                       }`}
//                       layoutId="navbar-indicator"
//                     />
//                   )}
//                 </Link>
//               ))}
//             </div>

//             {/* Notifications with premium styling */}
//             {user && (
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setNotificationsOpen(!notificationsOpen)}
//                   className={`h-11 px-4 rounded-lg flex items-center justify-center relative ${
//                     scrolled
//                       ? "bg-[#F2EFE7] text-[#006A71] hover:bg-[#F2EFE7]/80"
//                       : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
//                   } transition-all duration-200`}
//                 >
//                   <FaBell className="mr-2" />
//                   <span className="font-medium">Alerts</span>
//                   {notifications.some((n) => n.unread) && (
//                     <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
//                   )}
//                 </motion.button>

//                 <AnimatePresence>
//                   {notificationsOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
//                     >
//                       <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#F2EFE7] to-white">
//                         <h3 className="font-medium text-[#006A71]">
//                           Notifications
//                         </h3>
//                         <button className="text-xs text-[#006A71] hover:text-[#48A6A7] transition-colors">
//                           Mark all as read
//                         </button>
//                       </div>
//                       <div className="max-h-96 overflow-y-auto">
//                         {notifications.map((notification) => (
//                           <div
//                             key={notification.id}
//                             className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
//                               notification.unread ? "bg-[#F2EFE7]/30" : ""
//                             }`}
//                           >
//                             <div className="flex items-start">
//                               <div
//                                 className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
//                                   notification.unread
//                                     ? "bg-[#006A71]"
//                                     : "bg-gray-300"
//                                 }`}
//                               ></div>
//                               <div className="ml-3">
//                                 <p className="text-sm text-gray-800">
//                                   {notification.text}
//                                 </p>
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   {notification.time}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="p-3 text-center border-t border-gray-100 bg-gradient-to-r from-white to-[#F2EFE7]/30">
//                         <Link
//                           to="/notifications"
//                           className="text-sm text-[#006A71] hover:text-[#48A6A7] transition-colors"
//                         >
//                           View all notifications
//                         </Link>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             )}

//             {/* User Menu / Logout with premium styling */}
//             {user && (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <button
//                   onClick={logout}
//                   className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg ${
//                     scrolled
//                       ? "bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white shadow-md hover:shadow-lg"
//                       : "bg-white text-[#006A71] hover:bg-white/90 shadow-md"
//                   } transition-all duration-200`}
//                 >
//                   <FaSignOutAlt />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </motion.div>
//             )}
//           </div>

//           {/* Mobile Menu Button with premium styling */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className={`lg:hidden w-11 h-11 rounded-lg flex items-center justify-center ${
//               scrolled
//                 ? "bg-[#F2EFE7] text-[#006A71] hover:bg-[#F2EFE7]/80"
//                 : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
//             } transition-all duration-200`}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu with premium styling */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className={`lg:hidden overflow-hidden ${
//               scrolled
//                 ? "bg-white border-t border-gray-100"
//                 : "bg-[#006A71] border-t border-white/10"
//             }`}
//           >
//             <div className="container mx-auto px-6 py-4 space-y-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center space-x-3 p-3 rounded-lg ${
//                     location.pathname === item.path
//                       ? scrolled
//                         ? "bg-[#F2EFE7] text-[#006A71] font-medium"
//                         : "bg-white/10 text-white font-medium"
//                       : scrolled
//                       ? "text-[#006A71] hover:bg-gray-100"
//                       : "text-white hover:bg-white/10"
//                   }`}
//                 >
//                   <span>{item.icon}</span>
//                   <span>{item.name}</span>
//                 </Link>
//               ))}

//               {user && (
//                 <button
//                   onClick={logout}
//                   className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
//                     scrolled
//                       ? "bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white"
//                       : "bg-white text-[#006A71]"
//                   }`}
//                 >
//                   <FaSignOutAlt />
//                   <span>Logout</span>
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaHistory,
  FaSignOutAlt,
  FaChartBar,
  FaBell,
  FaCog,
  FaBars,
  FaTimes,
  FaRegClock,
  FaLayerGroup,
  FaCheckCircle,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Detect scroll for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      text: "Your leave request was approved",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      text: "New company policy update",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      text: "Reminder: Team meeting tomorrow",
      time: "2 days ago",
      unread: false,
    },
  ];

  // Role-based navigation items
  const getNavItems = () => {
    if (!user) {
      return [
        { name: "Login", path: "/", icon: <FaUserCircle /> },
        { name: "Register", path: "/register", icon: <FaUserCircle /> },
      ];
    } else if (user.role === "hod") {
      return [
        { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
        {
          name: "Approve Leave",
          path: "/approve-leave",
          icon: <FaCheckCircle />,
        },
        { name: "Statistics", path: "/statistics", icon: <FaChartLine /> },
        { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
      ];
    } else {
      // Default employee navigation
      return [
        { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
        { name: "Apply Leave", path: "/apply-leave", icon: <FaCalendarAlt /> },
        { name: "Leave History", path: "/leave-history", icon: <FaHistory /> },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-[#006A71] shadow-lg py-2"
          : "bg-gradient-to-r from-[#006A71] via-[#48A6A7] to-[#006A71] text-white py-3"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center">
              {/* Ultra Premium Logo Design */}
              <div className="flex items-center">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  {/* Base shape */}
                  <div
                    className={`absolute inset-0 rounded-xl shadow-lg ${
                      scrolled ? "bg-[#006A71]" : "bg-white"
                    }`}
                  ></div>

                  {/* Layered elements for 3D effect */}
                  <div
                    className={`absolute inset-1 rounded-lg ${
                      scrolled ? "bg-white" : "bg-[#48A6A7]"
                    }`}
                  ></div>

                  <div
                    className={`absolute inset-2 rounded-md ${
                      scrolled ? "bg-[#9ACBD0]/30" : "bg-[#006A71]"
                    }`}
                  ></div>

                  <div
                    className={`absolute inset-3 rounded-sm ${
                      scrolled ? "bg-white" : "bg-white/90"
                    }`}
                  ></div>

                  {/* Center icon */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      scrolled ? "text-[#006A71]" : "text-[#006A71]"
                    }`}
                  >
                    <FaLayerGroup className="text-xl" />
                  </div>

                  {/* Accent dots */}
                  <div
                    className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                      scrolled ? "bg-[#48A6A7]" : "bg-[#9ACBD0]"
                    }`}
                  ></div>
                  <div
                    className={`absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full ${
                      scrolled ? "bg-[#48A6A7]" : "bg-[#9ACBD0]"
                    }`}
                  ></div>
                </div>

                <div className="ml-3">
                  <motion.div
                    className={`font-semibold tracking-tight text-base ${
                      scrolled ? "" : "text-white"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    StaffSync
                  </motion.div>
                  <div
                    className={`text-xs uppercase tracking-widest ${
                      scrolled ? "text-gray-500" : "text-white/70"
                    }`}
                  >
                    Enterprise Edition
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Time display with premium styling */}
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg mr-3 ${
                scrolled
                  ? "bg-gradient-to-r from-gray-100 to-white shadow-sm"
                  : "bg-white/10 backdrop-blur-sm border border-white/10"
              }`}
            >
              <FaRegClock
                className={`text-sm ${
                  scrolled ? "text-[#48A6A7]" : "text-white/80"
                }`}
              />
              <span className="text-sm font-medium">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // This explicitly enables 12-hour format with AM/PM
                })}
              </span>
            </div>

            {/* Main Navigation with premium styling */}
            <div
              className={`flex items-center rounded-xl overflow-hidden ${
                scrolled
                  ? "bg-gray-100/50 p-1"
                  : "bg-white/5 backdrop-blur-sm p-1"
              }`}
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-all ${
                    location.pathname === item.path
                      ? scrolled
                        ? "bg-white text-[#006A71] font-medium shadow-sm"
                        : "bg-white/20 backdrop-blur-sm text-white font-medium"
                      : scrolled
                      ? "text-[#006A71] hover:bg-white/80"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      className={`absolute bottom-0 left-2 right-2 h-0.5 ${
                        scrolled ? "bg-[#48A6A7]" : "bg-[#9ACBD0]"
                      }`}
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Notifications with premium styling */}
            {user && (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className={`h-11 px-4 rounded-lg flex items-center justify-center relative ${
                    scrolled
                      ? "bg-[#F2EFE7] text-[#006A71] hover:bg-[#F2EFE7]/80"
                      : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  } transition-all duration-200`}
                >
                  <FaBell className="mr-2" />
                  <span className="font-medium">Alerts</span>
                  {notifications.some((n) => n.unread) && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
                    >
                      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#F2EFE7] to-white">
                        <h3 className="font-medium text-[#006A71]">
                          Notifications
                        </h3>
                        <button className="text-xs text-[#006A71] hover:text-[#48A6A7] transition-colors">
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                              notification.unread ? "bg-[#F2EFE7]/30" : ""
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                                  notification.unread
                                    ? "bg-[#006A71]"
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              <div className="ml-3">
                                <p className="text-sm text-gray-800">
                                  {notification.text}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-gray-100 bg-gradient-to-r from-white to-[#F2EFE7]/30">
                        <Link
                          to="/notifications"
                          className="text-sm text-[#006A71] hover:text-[#48A6A7] transition-colors"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* User Menu / Logout with premium styling */}
            {user && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={logout}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg ${
                    scrolled
                      ? "bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white shadow-md hover:shadow-lg"
                      : "bg-white text-[#006A71] hover:bg-white/90 shadow-md"
                  } transition-all duration-200`}
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button with premium styling */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden w-11 h-11 rounded-lg flex items-center justify-center ${
              scrolled
                ? "bg-[#F2EFE7] text-[#006A71] hover:bg-[#F2EFE7]/80"
                : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            } transition-all duration-200`}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with premium styling */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden overflow-hidden ${
              scrolled
                ? "bg-white border-t border-gray-100"
                : "bg-[#006A71] border-t border-white/10"
            }`}
          >
            <div className="container mx-auto px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    location.pathname === item.path
                      ? scrolled
                        ? "bg-[#F2EFE7] text-[#006A71] font-medium"
                        : "bg-white/10 text-white font-medium"
                      : scrolled
                      ? "text-[#006A71] hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              {user && (
                <button
                  onClick={logout}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                    scrolled
                      ? "bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white"
                      : "bg-white text-[#006A71]"
                  }`}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
