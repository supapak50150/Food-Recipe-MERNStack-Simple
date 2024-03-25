import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// functions
import { loginHandler } from "../../functions/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { name, password } = formData;

  const roleBasedRedirect = (res) => {
    if (res === "user") {
      // navigate("/user/dashboard");
      navigate(`/user/dashboard`);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const newUser = {
      name,
      password,
    };
    loginHandler(newUser)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            token: res.data.token,
            name: res.data.payload.user.name,
            role: res.data.payload.user.role,
          },
        });
        
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        toast.success("Login successfully");
        roleBasedRedirect(res.data.payload.user.role);
        // navigate(`/user/dashboard/${res.data.payload.user._id}`);
        // navigate(`/user/dashboard/`);

      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <div className="flex justify-center py-5">
      <div className="bg-[#FFEAD2] rounded-2xl shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
        <div className="md:container md:mx-auto">
          <div className="p-10 m-4">
            {!loading ? (
              <h1 className="text-center py-2 text-4xl font-bold text-primaryText">
                Sign In
              </h1>
            ) : (
              <h1 className="text-center text-4xl font-bold text-primaryText">
                Loading...
              </h1>
            )}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mt-10">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)]  placeholder:text-gray-400 "
                  type="text"
                  name="name"
                  placeholder="Username"
                  required
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt-5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400 "
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt-5 ">
                <button className="block w-full px-3.5 py-2 bg-[rgba(243,185,95)] rounded-md  shadow-[4px_4px_0px_0px_rgba(182,115,82)]" type="submit">
                Sign In
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
