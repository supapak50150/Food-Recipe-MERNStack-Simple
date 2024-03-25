import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 100);
    //redirect
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return;
};

export default LoadingToRedirect;



