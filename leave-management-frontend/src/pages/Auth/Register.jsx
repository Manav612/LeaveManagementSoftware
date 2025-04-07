// import React, { useState, useContext } from "react";
// import AuthContext from "../../context/AuthContext";
// import Button from "../../components/Button";
// import { motion } from "framer-motion";

// const Register = () => {
//   const { register } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "employee",
//     department: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       await register(
//         formData.name,
//         formData.email,
//         formData.password,
//         formData.role,
//         formData.department
//       );
//     } catch (err) {
//       console.error("Registration Error:", err);
//       setError(err.response?.data?.message || "Registration failed.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full"
//       >
//         <h2 className="text-2xl font-bold text-center text-[#006A71] mb-6">
//           Register
//         </h2>

//         {error && (
//           <div className="mb-4 text-red-500 text-center font-semibold">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             >
//               <option value="employee">Employee</option>
//               <option value="hod">HOD</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Department</label>
//             <input
//               type="text"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
//               required
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             Register
//           </Button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState, useContext, useRef, useEffect } from "react";
// import AuthContext from "../../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiUser, FiMail, FiLock, FiBriefcase, FiLayout } from "react-icons/fi";

// const Register = () => {
//   const { register } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "employee",
//     department: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const formRef = useRef(null);

//   useEffect(() => {
//     // Calculate password strength
//     const strength = calculatePasswordStrength(formData.password);
//     setPasswordStrength(strength);
//   }, [formData.password]);

//   const calculatePasswordStrength = (password) => {
//     if (!password) return 0;
//     let score = 0;
//     if (password.length > 6) score += 1;
//     if (password.length > 10) score += 1;
//     if (/[A-Z]/.test(password)) score += 1;
//     if (/[0-9]/.test(password)) score += 1;
//     if (/[^A-Za-z0-9]/.test(password)) score += 1;
//     return score;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateStep = () => {
//     if (currentStep === 1) {
//       if (!formData.name || !formData.email) return false;
//       return true;
//     } else {
//       if (!formData.password || !formData.role || !formData.department)
//         return false;
//       return true;
//     }
//   };

//   const nextStep = () => {
//     if (validateStep()) {
//       setCurrentStep(2);
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       await register(
//         formData.name,
//         formData.email,
//         formData.password,
//         formData.role,
//         formData.department
//       );
//     } catch (err) {
//       console.error("Registration Error:", err);
//       setError(err.response?.data?.message || "Registration failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const PasswordStrengthIndicator = () => (
//     <div className="mb-2">
//       <div className="flex justify-between mb-1 text-xs text-gray-500">
//         <span>Password strength</span>
//         <span>
//           {passwordStrength === 5
//             ? "Strong"
//             : passwordStrength >= 3
//             ? "Medium"
//             : "Weak"}
//         </span>
//       </div>
//       <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: `${(passwordStrength / 5) * 100}%` }}
//           transition={{ duration: 0.3 }}
//           className={`h-full ${
//             passwordStrength === 5
//               ? "bg-green-500"
//               : passwordStrength >= 3
//               ? "bg-yellow-500"
//               : "bg-red-500"
//           }`}
//         ></motion.div>
//       </div>
//     </div>
//   );

//   const FormProgress = () => (
//     <div className="flex justify-center mb-8">
//       <div className="w-full max-w-xs flex items-center">
//         <div
//           className={`w-10 h-10 rounded-full flex items-center justify-center ${
//             currentStep >= 1 ? "bg-[#006A71] text-white" : "bg-gray-200"
//           }`}
//         >
//           1
//         </div>
//         <div
//           className={`flex-1 h-1 ${
//             currentStep >= 2 ? "bg-[#006A71]" : "bg-gray-200"
//           }`}
//         ></div>
//         <div
//           className={`w-10 h-10 rounded-full flex items-center justify-center ${
//             currentStep >= 2 ? "bg-[#006A71] text-white" : "bg-gray-200"
//           }`}
//         >
//           2
//         </div>
//       </div>
//     </div>
//   );

//   const inputClasses =
//     "w-full px-4 py-3 border bg-white/50 backdrop-blur-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7] transition-all duration-300 pl-10 shadow-sm";

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F2EFE7] to-[#D9E4DD]">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#006A71]/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#48A6A7]/10 rounded-full blur-3xl"></div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/50 relative z-10"
//       >
//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.2 }}
//           className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#006A71] w-24 h-24 rounded-2xl shadow-lg flex items-center justify-center rotate-12"
//         >
//           <div className="text-white text-4xl font-bold -rotate-12">
//             {currentStep === 1 ? <FiUser /> : <FiBriefcase />}
//           </div>
//         </motion.div>

//         <h2 className="text-3xl font-bold text-center text-[#006A71] mb-2 mt-8">
//           Join Us
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           Create your account to get started
//         </p>

//         <FormProgress />

//         <AnimatePresence mode="wait">
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md"
//             >
//               <p className="font-medium">{error}</p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
//           <AnimatePresence mode="wait">
//             {currentStep === 1 ? (
//               <motion.div
//                 key="step1"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="space-y-5">
//                   <div className="relative">
//                     <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Full Name"
//                       className={inputClasses}
//                       required
//                     />
//                     <motion.span
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{
//                         scale: formData.name ? 1 : 0,
//                         opacity: formData.name ? 1 : 0,
//                       }}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
//                     >
//                       ✓
//                     </motion.span>
//                   </div>

//                   <div className="relative">
//                     <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Email Address"
//                       className={inputClasses}
//                       required
//                     />
//                     <motion.span
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{
//                         scale: formData.email ? 1 : 0,
//                         opacity: formData.email ? 1 : 0,
//                       }}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
//                     >
//                       ✓
//                     </motion.span>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="space-y-5">
//                   <div className="relative">
//                     <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Create Password"
//                       className={inputClasses}
//                       required
//                     />
//                   </div>

//                   <PasswordStrengthIndicator />

//                   <div className="relative">
//                     <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <select
//                       name="role"
//                       value={formData.role}
//                       onChange={handleChange}
//                       className={inputClasses}
//                       required
//                     >
//                       <option value="" disabled>
//                         Select Role
//                       </option>
//                       <option value="employee">Employee</option>
//                       <option value="hod">Head of Department</option>
//                     </select>
//                   </div>

//                   <div className="relative">
//                     <FiLayout className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       placeholder="Department"
//                       className={inputClasses}
//                       required
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="flex gap-3 pt-4">
//             {currentStep === 2 && (
//               <motion.button
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 type="button"
//                 onClick={prevStep}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-all font-semibold text-sm shadow-md hover:shadow-lg"
//               >
//                 Back
//               </motion.button>
//             )}

//             {currentStep === 1 ? (
//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 whileHover={{ scale: 1.02 }}
//                 type="button"
//                 onClick={nextStep}
//                 disabled={!formData.name || !formData.email}
//                 className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white text-sm transition-all shadow-lg ${
//                   !formData.name || !formData.email
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-gradient-to-r from-[#006A71] to-[#48A6A7] hover:shadow-xl"
//                 }`}
//               >
//                 Continue
//               </motion.button>
//             ) : (
//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 whileHover={{ scale: 1.02 }}
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 bg-gradient-to-r from-[#006A71] to-[#48A6A7] hover:shadow-xl text-white py-3 px-6 rounded-lg transition-all font-semibold text-sm shadow-lg relative overflow-hidden"
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="opacity-0">Register</span>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                   </>
//                 ) : (
//                   "Register"
//                 )}
//               </motion.button>
//             )}
//           </div>
//         </form>

//         <div className="mt-8 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="font-medium text-[#006A71] hover:underline transition-all"
//           >
//             Sign In
//           </a>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;
import React, { useState, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaLock,
  FaBriefcase,
  FaChartLine,
  FaEnvelope,
  FaLayerGroup,
} from "react-icons/fa";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    department: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
      });
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col md:flex-row overflow-hidden">
      {/* Left branding section - Ultra Premium Design */}
      <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#006A71] via-[#48A6A7] to-[#006A71] relative overflow-hidden">
        {/* Similar geometric accent shapes and content as in Login page */}
        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex-1 flex flex-col justify-center">
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
              Create Your <br />
              <span className="text-[#9ACBD0]">Workspace Account</span>
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
              Join our intelligent workforce management platform. Streamline
              your work processes, track attendance, and gain actionable
              insights.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right registration section */}
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
          {/* Top registration header with 3D effect */}
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
              Create Account
            </h2>
            <p className="text-center text-gray-500 mt-2">
              Join our workforce management platform
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-center font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
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
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-[#48A6A7]" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-[#48A6A7]" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              />
            </motion.div>

            {/* Role Select */}
            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLayerGroup className="text-[#48A6A7]" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              >
                <option value="employee">Employee</option>
                <option value="hod">HOD</option>
              </select>
            </motion.div>

            {/* Department Input */}
            <motion.div
              className="relative"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaBriefcase className="text-[#48A6A7]" />
              </div>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48A6A7] focus:bg-white transition-all"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#006A71] to-[#48A6A7] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Create Account
                </span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#48A6A7] to-[#006A71] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </motion.div>
          </form>

          {/* Support Section */}
          <motion.div
            className="mt-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
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

export default Register;
