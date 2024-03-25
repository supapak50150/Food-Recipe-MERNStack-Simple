import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// functions
import { resgisterHandler } from "../../functions/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { name, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== password2) {
      toast.error("password not match");
      setLoading(false);

    } else {
      const newUser = {
        name,
        password,
      };
      resgisterHandler(newUser)
        .then((res) => {
          setLoading(false);
          toast.success("Registered successfully");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.msg);
        });
    }
  };
  
  // console.log(import.meta.env.VITE_REACT_APP_API);

  return (
    <div className="flex justify-center py-5">
      <div className="bg-[#FFEAD2] rounded-2xl shadow-[5px_5px_0px_0px_rgba(243,185,95)] ">
        <div className="md:container md:mx-auto">
          <div className="p-10 m-4">
            {!loading ? (
              <h1 className="text-center text-4xl font-bold text-primaryText">
                Sign Up
              </h1>
            ) : (
              <h1 className="text-center text-4xl font-bold text-primaryText">
                Loading...
              </h1>
            )}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mt-10">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400 "
                  type="text"
                  name="name"
                  autoFocus
                  placeholder="Username"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt-5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400 "
                  type="password"
                  name="password"
                  autoFocus
                  placeholder="Password"
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="mt-5">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-[4px_4px_0px_0px_rgba(243,185,95)] placeholder:text-gray-400 "
                  type="password"
                  name="password2"
                  autoFocus
                  placeholder="Confirm Password"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="mt-5 ">
                <button
                  className={`block w-full px-3.5 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(182,115,82)] ${
                    password.length < 6 ? 'bg-[rgba(243,185,95)]/50 cursor-not-allowed' : 'bg-[rgba(243,185,95)]'
                  }`}
                  type="submit"
                  disabled={password.length < 6}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
