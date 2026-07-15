// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submitButton = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return toast.error("All Fields Necessary");
//     }

//     try {
//       const login = await axios.post(
//         "http://localhost:5000/api/login",
//         {
//           email,
//           password,
//         }
//       );

//       setEmail("");
//       setPassword("");

//       localStorage.setItem("token", login.data.token);
//       localStorage.setItem("role", login.data.role);
//       localStorage.setItem("id", login.data.id);

//       toast.success("Login Successful");

//       setTimeout(() => {
//         if (login.data.role === "Student") {
//           navigate("/studentdashboard");
//         }

//         if (login.data.role === "Teacher") {
//           navigate("/teacherdashboard");
//         }
//       }, 1500);
//     } catch (error) {
//       console.log(error);

//       toast.error(
//         error.response?.data?.message || "Login Failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-900 px-4">

//       <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl">

//         <form
//           className="p-10"
//           onSubmit={submitButton}
//         >
//           <h1 className="mb-8 text-4xl font-bold text-center text-white">
//             Welcome Back
//           </h1>

//           <p className="text-center text-gray-200 mb-8">
//             Login to access your dashboard
//           </p>

//           <label className="text-white font-medium">
//             Email Address
//           </label>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full p-3 mt-2 mb-5 rounded-xl border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />

//           <label className="text-white font-medium">
//             Password
//           </label>

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="w-full p-3 mt-2 rounded-xl border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />

//           <button
//             type="submit"
//             className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl mt-8 hover:bg-blue-100 transition-all duration-300"
//           >
//             Login
//           </button>

//           <p className="text-center text-gray-200 mt-6">
//             Don't have an account?{" "}
//             <span
//               onClick={() => navigate("/register")}
//               className="cursor-pointer text-yellow-300 hover:text-yellow-400 font-semibold"
//             >
//               Register Here
//             </span>
//           </p>
//         </form>

//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;


import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaUserGraduate,
  FaArrowRight,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitButton = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All Fields Necessary");
    }

    try {
      const login = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", login.data.token);
      localStorage.setItem("role", login.data.role);
      localStorage.setItem("id", login.data.id);

      toast.success("Login Successful");

      setTimeout(() => {
        if (login.data.role === "Student") {
          navigate("/studentdashboard");
        }

        if (login.data.role === "Teacher") {
          navigate("/teacherdashboard");
        }
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Section */}

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-14 flex flex-col justify-center"
        >
          <div className="text-6xl mb-8">
            <FaUserGraduate />
          </div>

          <h1 className="text-5xl font-black leading-tight">
            Welcome Back
          </h1>

          <p className="mt-8 text-blue-100 text-lg leading-8">
            Login to access your dashboard, submit projects,
            review student work and manage everything from one place.
          </p>

          <div className="mt-10 space-y-4">

            <div>✔ Secure Authentication</div>

            <div>✔ Fast Dashboard</div>

            <div>✔ Project Tracking</div>

            <div>✔ Teacher Approval System</div>

          </div>

        </motion.div>

        {/* Right Section */}

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-14"
        >
          <h2 className="text-4xl font-black text-gray-800">
            Login
          </h2>

          <p className="text-gray-500 mt-3 mb-10">
            Sign in to continue
          </p>

          <form onSubmit={submitButton} className="space-y-6">

            <div>

              <label className="font-semibold text-gray-700">
                Email
              </label>

              <div className="flex items-center mt-2 border rounded-xl px-4">

                <FaEnvelope className="text-blue-600" />

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 outline-none"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Password
              </label>

              <div className="flex items-center mt-2 border rounded-xl px-4">

                <FaLock className="text-blue-600" />

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 outline-none"
                />

              </div>

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3 shadow-lg"
            >
              Login

              <FaArrowRight />
            </motion.button>

          </form>

          <div className="mt-8 text-center">

            <span className="text-gray-600">
              Don't have an account?
            </span>

            <button
              onClick={() => navigate("/register")}
              className="text-blue-700 font-bold ml-2 hover:underline"
            >
              Register
            </button>

          </div>

        </motion.div>

      </div>

      <ToastContainer position="top-right" />

    </div>
  );
};

export default Login;