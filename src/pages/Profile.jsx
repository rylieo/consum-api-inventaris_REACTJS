import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [darkMode, setDarkMode] = useState(false); // State untuk tema gelap/terang

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/profile", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login"));
        }
      });
  }, [navigate]);

  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:8000/logout", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        localStorage.removeItem("access_token");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fungsi untuk mengubah tema
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <Navbar />
      <div className={`container mx-auto p-4 ${darkMode ? "dark" : ""}`}>
        {" "}
        {/* Tambahkan class 'dark' jika tema gelap aktif */}
        <div className="block m-auto mt-10 w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <div className="flex flex-col items-center pb-10 pt-10">
            {/* <FontAwesomeIcon icon="fa-solid fa-user" className="w-20 h-20 mb-3 text-gray-500" /> */}
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {profile.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {profile.email}
            </span>
            <div className="flex mt-4 md:mt-7">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium text-center text-white bg-blue-700 dark:bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Dashboard
              </Link>
              <a
                href="#"
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 dark:bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol tema di samping kiri bawah */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 left-4 bg-gray-200 dark:bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
      >
        <FontAwesomeIcon
          icon={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}
          className={`text-gray-600 dark:text-gray-300`}
        />
      </button>
    </>
  );
}
