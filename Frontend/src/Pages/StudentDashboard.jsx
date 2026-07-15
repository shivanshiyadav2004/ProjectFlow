import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaSignOutAlt,
  FaProjectDiagram,
  FaClipboardCheck,
  FaClock,
  FaTimesCircle,
  FaPlusCircle,
  FaTrashAlt,
  FaUserTie,
  FaSearch,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentDashboard = () => {

  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [data, setData] = useState({});

  const [projects, setProjects] = useState([]);

  const [allTeachers, setAllTeachers] = useState([]);

  const [teacherId, setTeacherId] = useState("");

  const [project, setProject] = useState("");

  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const totalProjects = projects.length;

  const approvedProjects = projects.filter(
    (p) => p.status === "approved"
  ).length;

  const pendingProjects = projects.filter(
    (p) => p.status === "pending"
  ).length;

  const rejectedProjects = projects.filter(
    (p) => p.status === "rejected"
  ).length;

  const filteredProjects = projects.filter((item) =>
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
        `${import.meta.env.VITE_API_URL}/api/dashboard/${id}`,
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

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/allteachers`
      );

      setAllTeachers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load teachers.");
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/projects`,
        {
          headers: {
            studentid: id,
          },
        }
      );

      setProjects(response.data);

    } catch (error) {
      console.log(error);
      toast.error("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    if (!project || !description || !teacherId) {
      return toast.error("Please fill all fields.");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/addproject`,
        {
          studentId: id,
          teacherId,
          project,
          description,
        }
      );

      toast.success("Project Submitted Successfully");

      setProject("");
      setDescription("");
      setTeacherId("");

      fetchProjects();

    } catch (error) {
      console.log(error);
      toast.error("Project submission failed.");
    }
  };

  const deleteProject = async (projectId) => {
    try {

      await axios.delete(
       `${import.meta.env.VITE_API_URL}/api/delete/project/${projectId}`
      );

      toast.success("Project Deleted");

      fetchProjects();

    } catch (error) {
      console.log(error);
      toast.error("Unable to delete project.");
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
    fetchTeachers();
    fetchProjects();
  }, []);
    return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-xl">

        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <p className="text-blue-100 text-lg">
              {getGreeting()}
            </p>

            <h1 className="text-4xl font-extrabold text-white mt-2">
              {data?.name} 👋
            </h1>

            <p className="text-blue-100 mt-2">
              Welcome to your Student Dashboard
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

      {/* Main */}

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Statistics */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Total Projects
                </p>

                <h2 className="text-4xl font-black text-blue-700 mt-3">
                  {totalProjects}
                </h2>

              </div>

              <FaProjectDiagram
                size={45}
                className="text-blue-600"
              />

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Approved
                </p>

                <h2 className="text-4xl font-black text-green-600 mt-3">
                  {approvedProjects}
                </h2>

              </div>

              <FaClipboardCheck
                size={45}
                className="text-green-600"
              />

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Pending
                </p>

                <h2 className="text-4xl font-black text-yellow-500 mt-3">
                  {pendingProjects}
                </h2>

              </div>

              <FaClock
                size={45}
                className="text-yellow-500"
              />

            </div>

          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl p-6"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  Rejected
                </p>

                <h2 className="text-4xl font-black text-red-600 mt-3">
                  {rejectedProjects}
                </h2>

              </div>

              <FaTimesCircle
                size={45}
                className="text-red-600"
              />

            </div>

          </motion.div>

        </div>

        {/* Analytics */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <h2 className="text-2xl font-bold mb-8">
            Project Analytics
          </h2>

          <div className="w-full h-80">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Projects */}

        <div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-5">

            <h2 className="text-3xl font-black text-slate-800">
              My Projects
            </h2>

            <div className="relative w-full md:w-96">

              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search Projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl pl-12 pr-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
      className="mx-auto text-blue-500 mb-6"
    />

    <h2 className="text-3xl font-bold text-slate-700">
      No Projects Found
    </h2>

    <p className="text-gray-500 mt-4">
      Submit your first project using the form below.
    </p>

  </div>

) : (

  filteredProjects.map((item) => (

    <motion.div
      key={item._id}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >

      {/* Top Bar */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-3"></div>

      <div className="p-7">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              {item.project}

            </h2>

            <p className="text-gray-500 mt-2">

              Submitted Successfully

            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
              item.status
            )}`}
          >
            {item.status}
          </span>

        </div>

        {/* Teacher */}

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3">

            <FaUserTie className="text-blue-600" />

            <span className="font-semibold">

              Teacher

            </span>

            <span>

              {item.teacherId?.name}

            </span>

          </div>

        </div>

        {/* Progress */}

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
              transition={{
                duration: 1,
              }}
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

        {/* Description */}

        <div className="mt-8">

          <h3 className="font-bold mb-3">

            Description

          </h3>

          <p className="text-gray-600 leading-7">

            {item.description}

          </p>

        </div>

        {/* Delete */}

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() => deleteProject(item._id)}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-3 font-semibold"
        >

          <FaTrashAlt />

          Delete Project

        </motion.button>

      </div>

    </motion.div>

  ))

)}

          </div>

        </div>
                {/* Submit Project */}

        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-3 mb-8">

            <FaPlusCircle className="text-blue-600 text-3xl" />

            <h2 className="text-3xl font-bold">
              Submit New Project
            </h2>

          </div>

          <form
            onSubmit={addProject}
            className="space-y-6"
          >

            <div>

              <label className="font-semibold text-gray-700">
                Project Name
              </label>

              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Enter Project Name"
                className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Description
              </label>

              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project..."
                className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

            </div>

            <div>

              <label className="font-semibold text-gray-700">
                Assign Teacher
              </label>

              <select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Select Teacher
                </option>

                {allTeachers.map((teacher) => (

                  <option
                    key={teacher._id}
                    value={teacher._id}
                  >
                    {teacher.name}
                  </option>

                ))}

              </select>

            </div>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
            >

              Submit Project

            </motion.button>

          </form>

        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
      />

    </div>
  );
};

export default StudentDashboard;


          