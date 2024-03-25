import axios from "axios";

export const resgisterHandler = async (user) => {
  return await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/register",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
export const loginHandler = async (user) => {
  return await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/login",
    // `${import.meta.env.VITE_REACT_APP_API}/login`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    import.meta.env.VITE_REACT_APP_API + "/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};


