import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faCaretDown,
  faCaretRight,
  faClipboardList,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

//redux
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  //nav state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // !false = true
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  // console.log("navbar", user);

  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center">
        <nav className="md:container bg-[#A6CF98] p-4 rounded-2xl m-4 shadow-[5px_5px_0px_0px_rgba(85,124,85)] ">
          <div className="md:container md:mx-auto ">
            <div className="flex item-center justify-between">
              <div className=" text-2xl font-bold text-navText">
                <Link to="/">
                  <FontAwesomeIcon icon={faBowlFood} className="px-1" />
                  MaewPao Food Recipes
                </Link>
              </div>

              {/* Toggle Menu Button */}
              <div className="md:hidden px-2 flex  justify-center">
                <button
                  id="menu-toggle"
                  className="text-navText"
                  onClick={toggleMenu}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>

              <ul className="hidden md:flex space-x-4  items-center">
                <li>
                  <Link
                    to="/"
                    onClick={() => onClick("home")}
                    className={`${
                      current === "home"
                        ? "text-navText"
                        : "text-navText hover:bg-green-100/50 "
                    } px-3 py-2 rounded-md text-md font-medium`}
                  >
                    Home
                  </Link>
                </li>
                {!user ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        onClick={() => onClick("login")}
                        className={`${
                          current === "login"
                            ? "bg-gray-900 text-gray-300"
                            : "text-primaryContent bg-gray-500/50 hover:bg-orange-500/50 "
                        }  px-3 py-2 rounded-md text-md font-medium`}
                      >
                        <span className="h-6 w-6" aria-hidden="true">
                          Sign In
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={() => onClick("register")}
                        className={`${
                          current === "register"
                            ? "bg-gray-900 text-white"
                            : "text-primaryContent bg-[#F6995C] hover:bg-orange-500/50"
                        } inline-block px-3 py-2 rounded-md text-md font-medium`}
                      >
                        <span className="h-6 w-6" aria-hidden="true">
                          Sign Up
                        </span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {user.role === "user" && (
                      <>
                        <li>
                          <Link
                            to="/user/dashboard"
                            onClick={() => onClick("user-dashboard")}
                            className={`${
                              current === "user-dashboard"
                                ? ""
                                : "text-navText hover:bg-green-100/50 "
                            } px-3 py-2 rounded-md text-md font-medium`}
                          >
                            <span className="h-6 w-6" aria-hidden="true">
                              Dashboard
                            </span>
                          </Link>
                        </li>
                        <li>
                          <div className="dropdown inline-block relative">
                            <Link
                              to="/user/dashboard"
                              onClick={() => onClick("user-dashboard")}
                              className="text-primaryContent bg-primaryText hover:bg-orange-500/50
                               inline-block px-6 py-2 rounded-md text-md font-medium shadow-sm"
                            >
                              <span className="h-6 w-6" aria-hidden="true">
                                {user.name}{" "}
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            </Link>
                            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                              <li className="">
                                <button
                                  onClick={logout}
                                  className="rounded-md md:mx-auto bg-gray-200 text-primaryText hover:bg-primaryText  hover:text-primaryContent py-2 px-4 block  text-md font-medium whitespace-no-wrap"
                                >
                                  Logout
                                </button>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>

            {/* Mobile Menu */}
            {/* {isMenuOpen ? (
              <ul className="flex-col md:hidden py-2">
                <li className="py-2 hover:bg-gray-100/50 rounded-md">
                  <Link to="/">
                    <button className="text-navText text-lg font-medium text-left w-full">
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-navText"
                      />
                      <span className="ml-4">Home</span>
                    </button>
                  </Link>
                </li>
                <li className="py-2 hover:bg-gray-100/50 rounded-md">
                  <Link to="/login">
                    <button className="text-navText text-lg font-medium text-left w-full">
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-navText"
                      />
                      <span className="ml-4">Sign In</span>
                    </button>
                  </Link>
                </li>
                <li className="py-2 hover:bg-gray-100/50 rounded-md">
                  <Link to="/register">
                    <button className="text-navText text-lg font-medium text-left w-full">
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="text-navText"
                      />
                      <span className="ml-4">Sign Up</span>
                    </button>
                  </Link>
                </li>
              </ul>
            ) : null} */}
            {isMenuOpen && (
              <ul className="flex-col md:hidden py-2">
                <li className="py-2 hover:bg-gray-100/50 rounded-md">
                  <Link to="/">
                    <button className="text-navText text-lg font-medium text-left w-full">
                      <FontAwesomeIcon
                        icon={faHouse} 
                        className="text-navText mx-2"
                      />
                      <span className="ml-4">Home</span>
                    </button>
                  </Link>
                </li>
                {!user ? (
                  <>
                    <li className="py-2 hover:bg-gray-100/50 rounded-md">
                      <Link to="/login">
                        <button className="text-[#b08941] text-lg font-medium text-left w-full">
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="text-[#b08941] mx-2"
                          />
                          <span className="ml-7">Sign In</span>
                        </button>
                      </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-100/50 rounded-md">
                      <Link to="/register">
                        <button className="text-[#443422] text-lg font-medium text-left w-full">
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="text-[#443422] mx-2"
                          />
                          <span className="ml-7">Sign Up</span>
                        </button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {user.role === "user" && (
                      <>
                        <li className="py-2 hover:bg-gray-100/50 rounded-md">
                          <Link to="/user/dashboard">
                            <button
                              onClick={() => onClick("user-dashboard")}
                              className={`${
                                current === "user-dashboard"
                                  ? ""
                                  : " text-navText text-lg font-medium text-left w-full"
                              }`}
                            >
                              
                              <FontAwesomeIcon
                                icon={faClipboardList}
                                className="text-navText mx-2"
                              />
                              <span className="ml-4" aria-hidden="true">
                                Dashboard
                              </span>
                            </button>
                          </Link>
                        </li>
                        <li className="py-2 hover:bg-gray-100/50 rounded-md">
                          <Link to="/user/dashboard">
                            <button
                              onClick={() => onClick("user-dashboard")}
                              className={`${
                                current === "user-dashboard"
                                  ? ""
                                  : " text-navText text-lg font-medium text-left w-full"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={faUser}
                                className="text-navText mx-2"
                              />
                              <span className="ml-4" aria-hidden="true">
                                {user.name}
                              </span>
                            </button>
                          </Link>
                        </li>
                        <li className="py-2 hover:bg-gray-100/50 rounded-md">
                          <button
                            onClick={logout}
                            className="rounded-md md:mx-auto bg-gray-200 text-primaryText hover:bg-primaryText  hover:text-primaryContent py-2 px-4 block  text-md font-medium whitespace-no-wrap"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
