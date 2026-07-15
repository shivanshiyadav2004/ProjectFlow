import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaSignOutAlt,
  FaClipboardCheck,
  FaTimesCircle,
  FaClock,
  FaUserGraduate,
  FaProjectDiagram,
  FaCheckCircle,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeacherDashboard = () => {

  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [data, setData] = useState({});

  const [allProjects, setAllProjects] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const totalProjects = allProjects.length;

  const approvedProjects = allProjects.filter(
    (p) => p.status === "approved"
  ).length;

  const pendingProjects = allProjects.filter(
    (p) => p.status === "pending"
  ).length;

  const rejectedProjects = allProjects.filter(
    (p) => p.status === "rejected"
  ).length;

  const filteredProjects = allProjects.filter((item) =>
    item.project.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = [
    {
      name: "Approved",
      value: approvedProjects,
    },
    {
      name: "Pending",
      value: pendingProjects,
    },
    {
      name: "Rejected",
      value: rejectedProjects,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];
    const fetchUser = async () => {
    try {

      const response = await axios.get(
        `http://localhost:5000/api/dashboard/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);

    } catch (error) {
      console.log(error);
      toast.error("Unable to load user details.");
    }
  };

  const fetchProjects = async () => {
    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/teacher/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            teacherid: id,
          },
        }
      );

      setAllProjects(response.data);

    } catch (error) {

      console.log(error);
      toast.error("Unable to load projects.");

    } finally {

      setLoading(false);

    }
  };

  const approveProject = async (projectId) => {

    try {

      await axios.patch(
        `http://localhost:5000/api/project/${projectId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Project Approved");

      fetchProjects();

    } catch (error) {

      console.log(error);
      toast.error("Unable to approve project.");

    }

  };

  const rejectProject = async (projectId) => {

    try {

      await axios.patch(
        `http://localhost:5000/api/project/${projectId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.error("Project Rejected");

      fetchProjects();

    } catch (error) {

      console.log(error);
      toast.error("Unable to reject project.");

    }

  };

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) return " Good Morning";

    if (hour < 17) return " Good Afternoon";

    return " Good Evening";

  };

  const getStatusColor = (status = "pending") => {

    switch (status.toLowerCase()) {

      case "approved":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  const getProgress = (status = "pending") => {

    switch (status.toLowerCase()) {

      case "approved":
        return 100;

      case "pending":
        return 50;

      case "rejected":
        return 0;

      default:
        return 0;

    }

  };

  useEffect(() => {

    fetchUser();
    fetchProjects();

  }, []);
    return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 shadow-xl">

        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <p className="text-blue-100 text-lg">
              {getGreeting()}
            </p>

            <h1 className="text-4xl font-extrabold text-white mt-2">
              {data?.name} 
            </h1>

            <p className="text-blue-100 mt-2">
              Welcome to your Teacher Dashboard
            </p>

          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            <FaSignOutAlt />
            Logout
          </motion.button>

        </div>

      </header>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Total Projects</p>
                <h2 className="text-4xl font-black text-blue-700 mt-3">
                  {totalProjects}
                </h2>
              </div>
              <FaProjectDiagram size={45} className="text-blue-600" />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Approved</p>
                <h2 className="text-4xl font-black text-green-600 mt-3">
                  {approvedProjects}
                </h2>
              </div>
              <FaClipboardCheck size={45} className="text-green-600" />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Pending</p>
                <h2 className="text-4xl font-black text-yellow-500 mt-3">
                  {pendingProjects}
                </h2>
              </div>
              <FaClock size={45} className="text-yellow-500" />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Rejected</p>
                <h2 className="text-4xl font-black text-red-600 mt-3">
                  {rejectedProjects}
                </h2>
              </div>
              <FaTimesCircle size={45} className="text-red-600" />
            </div>
          </motion.div>

        </div>

        {/* Analytics */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Project Analytics
          </h2>

          <div className="w-full h-80">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Search */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-5">

          <h2 className="text-3xl font-black">
            Student Projects
          </h2>

          <div className="relative w-full md:w-96">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {loading ? (

            <div className="col-span-2 bg-white rounded-3xl shadow-xl p-12 text-center">

              <h2 className="text-3xl font-bold animate-pulse">
                Loading Projects...
              </h2>

            </div>

          ) : filteredProjects.length === 0 ? (

            <div className="col-span-2 bg-white rounded-3xl shadow-xl p-12 text-center">

              <FaProjectDiagram
                size={70}
                className="mx-auto text-blue-500 mb-5"
              />

              <h2 className="text-3xl font-bold">
                No Projects Found
              </h2>

            </div>

          ) : (

            filteredProjects.map((item) => (

              <motion.div
                key={item._id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >

                <div className="bg-gradient-to-r from-indigo-600 to-blue-700 h-3"></div>

                <div className="p-7">

                  <div className="flex justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {item.project}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {item.studentId?.name || "Unknown Student"}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full font-bold ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <div className="mt-8">

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        Progress
                      </span>

                      <span>
                        {getProgress(item.status)}%
                      </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${getProgress(item.status)}%`,
                        }}
                        transition={{ duration: 1 }}
                        className={`h-3 rounded-full ${
                          item.status === "approved"
                            ? "bg-green-500"
                            : item.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      />

                    </div>

                  </div>

                  <div className="mt-8">

                    <h3 className="font-bold mb-2">
                      Description
                    </h3>

                    <p className="text-gray-600">
                      {item.description}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      disabled={item.status !== "pending"}
                      onClick={() => approveProject(item._id)}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold"
                    >
                      <FaCheckCircle />
                      Approve
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      disabled={item.status !== "pending"}
                      onClick={() => rejectProject(item._id)}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold"
                    >
                      <FaTimes />
                      Reject
                    </motion.button>

                  </div>

                </div>

              </motion.div>

            ))

          )}

        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
      />

    </div>
  );
};

export default TeacherDashboard;