import React, { useEffect } from "react";
import "./App.css";

// notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/layout/Navbar";

//router
import { Route, Routes, useParams } from "react-router-dom";

//pages
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/Home";
import ViewRecipe from "./components/pages/ViewRecipe";
import UserDashboard from "./components/pages/user/UserDashboard";
import UserUpdateRecipe from "./components/pages/user/UserUpdateRecipe";
//redux
import { useDispatch } from "react-redux";
import UserRoute from "./components/pages/routes/UserRoute";

//function
import { currentUser } from "./components/functions/auth";


function App() {
  const dispatch = useDispatch();
  // const { userId } = useParams(); 
  // console.log('HI',userId);
  useEffect(() => {
    const idTokenResult = localStorage.token;
    // console.log("App", idTokenResult);

    if (idTokenResult) {
      currentUser(idTokenResult)
        .then((res) => {
          console.log("App", res);
          console.log("User role:", res.data.role);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              token: idTokenResult,
              role: res.data.role,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);

  return (
    <>
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-detail/:id" element={<ViewRecipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
        <Route
            element={<UserRoute element={UserDashboard} />} // ใช้ component หรือ function ของ UserDashboard แทน JSX literal
            path="/user/dashboard"
          />
        <Route
            element={<UserRoute element={UserUpdateRecipe} />} // ใช้ component หรือ function ของ UserDashboard แทน JSX literal
            path="/user/update-recipe/:id"
          />
      </Routes>
    </>
  );
}

export default App;
