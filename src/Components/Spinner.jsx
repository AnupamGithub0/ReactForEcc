import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

export default function Spinner() {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/");

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4 animate-pulse">
          Redirecting to you in {count} second{count > 1 && "s"}
        </h1>
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    </>
  );
}
