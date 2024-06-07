import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [authUser, setAuthUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:8000/profile', {
      headers: {
        'Authorization': 'bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then(res => {
        setIsLogin(true);
        setAuthUser(res.data.data);

        if (location.pathname === '/login') {
          navigate('/profile');
        }
      })
      .catch(err => {
        setIsLogin(false);
        if (err.response && err.response.status === 401 && location.pathname !== '/login') {
          navigate('/login?message=' + encodeURIComponent('Anda belum login'));
        }
      });
  }, [navigate, location.pathname]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-2">
            <img src="/src/assets/001.png" className="h-8" alt="Flowbite Logo" />
            <span className="text-2xl font-semibold dark:text-white">Inventaris</span>
        </div>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
        </button>
        <div className="hidden w-full md:flex md:items-center md:justify-center" id="navbar-default">
            {
                isLogin === true && authUser.role === 'admin' ? (
                    <ul className="font-medium flex-grow flex justify-start md:justify-center space-x-7 rtl:space-x-reverse">
                        <li>
                            <Link to="/stuff" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Stuff</Link>
                        </li>
                        <li>
                            <Link to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Lending</Link>
                        </li>
                        <li>
                            <Link to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inbound</Link>
                        </li>
                        <li>
                            <Link to="/User" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">User</Link>
                        </li>
                        <li>
                            <Link to="/Profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
                        </li>
                    </ul>
                ) : isLogin === true && authUser.role === 'staff' ? (
                    <ul className="font-medium flex-grow flex justify-start md:justify-center space-x-8 rtl:space-x-reverse">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
                        </li>
                        <li>
                            <Link to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Lending</Link>
                        </li>
                    </ul>
                ) : ''
            }
        </div>
    </div>
</nav>


  );
}
