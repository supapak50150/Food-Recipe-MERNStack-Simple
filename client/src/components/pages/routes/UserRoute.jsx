import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

import { currentUser } from "../../functions/auth";

const UserRoute = ({element: Element, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  // return user && user.token ? <Element {...rest} /> : <LoadingToRedirect />;
  
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentUser(user.token)
        .then((res) => {
          console.log("Current user ", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("user router err", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok  ? <Element {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
