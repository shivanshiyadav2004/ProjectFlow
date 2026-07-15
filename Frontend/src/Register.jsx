import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserGraduate,
  FaArrowRight,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All Fields Are Required");
    }

    try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, {
        name,
        email,
        password,
        role,
      });

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* Left Section */}

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-gradient-to-br from-indigo-700 to-blue-700 text-white p-14 flex flex-col justify-center"
        >
          <div className="text-6xl mb-8">
            <FaUserGraduate />
          </div>

          <h1 className="text-5xl font-black leading-tight">
            Create Your Account
          </h1>

          <p className="mt-8 text-blue-100 text-lg leading-8">
            Join Projectly and experience a smarter way to submit,
            review and manage academic projects.
          </p>

          <div className="mt-10 space-y-4">

            <div>✔ Student & Teacher Portal</div>

            <div>✔ Secure Authentication</div>

            <div>✔ Fast Project Tracking</div>

            <div>✔ Easy Dashboard Management</div>

          </div>

        </motion.div>

        {/* Right Section */}

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-14"
        >

          <h2 className="text-4xl font-black text-gray-800">
            Register
          </h2>

          <p className="text-gray-500 mt-3 mb-10">
            Create a new account
          </p>

          <form onSubmit={register} className="space-y-5">

            <div>

              <label className="font-semibold text-gray-700">
                Full Name
              </label>

              <div className="flex items-center mt-2 border rounded-xl px-4">

                <FaUser className="text-blue-600" />

                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 outline-none"
                />

              </div>

            </div>

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
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 outline-none"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Select Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-xl p-4 mt-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>

            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3 shadow-lg"
            >
              Create Account
              <FaArrowRight />
            </motion.button>

          </form>

          <div className="mt-8 text-center">

            <span className="text-gray-600">
              Already have an account?
            </span>

            <button
              onClick={() => navigate("/login")}
              className="text-blue-700 font-bold ml-2 hover:underline"
            >
              Login
            </button>

          </div>

        </motion.div>

      </div>

      <ToastContainer position="top-right" />

    </div>
  );
};

export default Register;













// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("Student");

//   const register = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       return toast.error("All Fields Are Required");
//     }

//     try {
//       const details = await axios.post(
//         "http://localhost:5000/api/signup",
//         {
//           name,
//           email,
//           password,
//           role,
//         }
//       );

//       console.log(details);

//       setName("");
//       setEmail("");
//       setPassword("");

//       toast.success("Registration Successful");

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.log(error);

//       toast.error(
//         error.response?.data?.message ||
//           "Registration Failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-700 to-blue-900 px-4">

//       <div className="w-full max-w-lg backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl">

//         <form
//           className="p-10"
//           onSubmit={register}
//         >
//           <h1 className="text-4xl font-bold text-center text-white mb-3">
//             Create Account
//           </h1>

//           <p className="text-center text-gray-200 mb-8">
//             Join Projectly and start managing projects
//           </p>

//           <label className="text-white font-medium">
//             Full Name
//           </label>

//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//             className="w-full p-3 mt-2 mb-5 rounded-xl border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />

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
//             placeholder="Create password"
//             className="w-full p-3 mt-2 mb-5 rounded-xl border border-white/30 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />

//           <label className="text-white font-medium">
//             Select Role
//           </label>

//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full p-3 mt-2 mb-5 rounded-xl border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             <option value="Student" className="text-black">
//               Student
//             </option>

//             <option value="Teacher" className="text-black">
//               Teacher
//             </option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-white text-blue-700 font-semibold py-3 rounded-xl mt-4 hover:bg-blue-100 transition-all duration-300"
//           >
//             Create Account
//           </button>

//           <p className="text-center text-gray-200 mt-6">
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/login")}
//               className="cursor-pointer text-yellow-300 hover:text-yellow-400 font-semibold"
//             >
//               Login Here
//             </span>
//           </p>
//         </form>

//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Register;