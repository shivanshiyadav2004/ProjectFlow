


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaProjectDiagram,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaProjectDiagram size={34} />,
      title: "Project Submission",
      desc: "Students can easily submit and manage their academic projects from one place.",
    },
    {
      icon: <FaChalkboardTeacher size={34} />,
      title: "Teacher Review",
      desc: "Teachers can review, approve or reject projects with a single click.",
    },
    {
      icon: <FaUserGraduate size={34} />,
      title: "Progress Tracking",
      desc: "Track every submitted project and monitor its approval status in real time.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-extrabold text-blue-700 cursor-pointer"
          >
             Projectly
          </motion.h1>

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl border border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Get Started
            </button>

          </div>
        </div>
      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
          
A Smart Student Project Management System

          </span>

          <h1 className="text-6xl font-black text-slate-900 mt-8 leading-tight">

            Manage Academic
            <span className="text-blue-700"> Projects </span>
            Effortlessly

          </h1>

          <p className="text-gray-600 text-lg mt-8 leading-8">

            ProjectFlow is a modern platform where students can submit
            projects, teachers can review them, and everyone can
            track project status from one centralized dashboard.

          </p>

          <div className="flex gap-5 mt-10">

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
            >
              Start Now
              <FaArrowRight />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border-2 border-blue-700 px-8 py-4 rounded-xl font-bold text-blue-700 hover:bg-blue-50 transition"
            >
              Login
            </button>

          </div>

          <div className="grid grid-cols-3 gap-6 mt-16">

            <div>
              <h2 className="text-4xl font-black text-blue-700">500+</h2>
              <p className="text-gray-500">Students</p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-blue-700">120+</h2>
              <p className="text-gray-500">Projects</p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-blue-700">98%</h2>
              <p className="text-gray-500">Approval Rate</p>
            </div>

          </div>

        </motion.div>

        <motion.div
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20230715/pngtree-d-illustration-of-laptop-furnished-with-educational-materials-signifying-online-education-image_3861968.jpg"
            alt="Project Management"
            className="rounded-3xl shadow-2xl"
          />

        </motion.div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-black text-center mb-5">

            Why Choose Projectly?

          </h2>

          <p className="text-center text-gray-500 mb-16 text-lg">

            Everything you need to manage academic projects efficiently.

          </p>

          <div className="grid md:grid-cols-3 gap-10">

            {features.map((feature, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl"
              >

                <div className="text-blue-700 mb-6">

                  {feature.icon}

                </div>

                <h3 className="text-2xl font-bold mb-4">

                  {feature.title}

                </h3>

                <p className="text-gray-600 leading-7">

                  {feature.desc}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-14">

        <div className="max-w-7xl mx-auto px-8 text-center">

          <h2 className="text-3xl font-bold mb-4">

            ProjectFlow

          </h2>

          <p className="text-gray-300">

            A Modern MERN Stack Project Management Platform

          </p>

          <div className="flex justify-center items-center gap-6 mt-8">

            <span className="flex items-center gap-2">

              <FaCheckCircle className="text-green-400" />

              Secure

            </span>

            <span className="flex items-center gap-2">

              <FaCheckCircle className="text-green-400" />

              Fast

            </span>

            <span className="flex items-center gap-2">

              <FaCheckCircle className="text-green-400" />

              Responsive

            </span>

          </div>

          <p className="mt-8 text-gray-400">

            © 2026 ProjectFlow | Built using MERN Stack

          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;