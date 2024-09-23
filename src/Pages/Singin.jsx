/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Container from "../Components/Container";
import { MdAccountCircle } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { convertImage64 } from "../convertImage64/image64";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchingDataSuccess } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.js";
import toast from 'react-hot-toast';

export default function Singin() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    const image = await convertImage64(file);
    setProfileImage(image);
  };

  axios.defaults.withCredentials = true;
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecnew-1.onrender.com/api/v1/user/signup",
        { profileImage, userName, email, password }
      );
     
      if (res.data.success === true) {
        navigate("/");
        dispatch(fetchingDataSuccess(res.data));
        setTimeout(()=>{
          toast.success(res.data.message);
        },1000)
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error while signup");
    }
    finally {
      setLoading(false); 
    }
  };

  axios.defaults.withCredentials = true;
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecnew-1.onrender.com/api/v1/user/signin",
        { email, password }
      );

      if (res.data.success === true) {
        navigate("/");
        toast.success(res.data.message);
        dispatch(fetchingDataSuccess(res.data));
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went error");
    } finally {
      setLoading(false); 
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const userData = {
        name: res.user.displayName,
        email: res.user.email,
        img: res.user.photoURL,
      };

      axios
        .post(
          "https://ecnew-1.onrender.com/api/v1/user/google",
          userData
        )
        .then((result) => {
          console.log("Backend response:", result.data);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log("Error sending user data to backend:", err);
        });
    } catch (error) {
      console.log("Google sign-in error:", error.message);
    }
  };

  return (
    <Container>
      <div className="bg-gray-100 flex items-center justify-center h-[80vh] md:h-[90vh] lg:h-[95vh]">
        <div className="relative text-center w-full">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg md:max-w-[330px] max-w-[300px] w-full">
              <h1 className="text-2xl font-bold text-gray-700 mb-8">
                {isLogin ? "Ecommerce Login" : "Ecommerce Register"}
              </h1>
              {isLogin ? (
                <div>
                  <form onSubmit={handleSignin} className="w-full">
                    <div className="flex items-center mb-4">
                      <MdEmail className="text-black mr-2" size={24} />
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <div className="flex items-center mb-6">
                      <RiLockPasswordFill
                        className="text-black mr-2"
                        size={24}
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-lg border-2 bg-opacity-50 text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-black text-white hover:bg-gray-700 transition duration-300 font-bold rounded-lg"
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </form>
                  <button
                    onClick={handleGoogleAuth}
                    className="w-full py-2 px-4 rounded flex items-center justify-center border-2 mt-4 hover:bg-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.03 0 5.12 1.31 6.29 2.4l4.65-4.64C31.86 4.77 28.34 3 24 3 14.81 3 7.18 9.75 4.96 18.5l5.56 4.32C11.7 16.21 17.33 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.5 24c0-1.68-.15-3.3-.42-4.84H24v9.19h12.75c-.54 3.06-2.18 5.65-4.69 7.4l5.56 4.32C41.82 36.36 46.5 30.87 46.5 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M9.7 28.18a14.82 14.82 0 0 1-.82-4.68c0-1.63.3-3.2.82-4.68L4.14 14.5C2.9 17.19 2.25 20.01 2.25 23s.65 5.81 1.89 8.5l5.56-4.32z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 44.75c4.34 0 7.96-1.44 10.61-3.88l-5.56-4.32c-1.56 1.06-3.55 1.68-5.65 1.68-6.66 0-12.29-6.71-13.48-13.82l-5.56 4.32C7.18 38.25 14.81 44.75 24 44.75z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    Sign Up with Google
                  </button>
                  <p className="mt-4 text-sm text-gray-400">
                    Don't have an account?{" "}
                    <span
                      className="cursor-pointer text-black font-bold"
                      onClick={toggleForm}
                    >
                      Register here
                    </span>
                  </p>
                  <Link
                    to={"/forgot-password"}
                    className="text-blue-500 hover:underline mt-3"
                  >
                    Forgot password
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSignup}
                  className="w-full flex items-center justify-center flex-col"
                >
                  <div className="relative overflow-hidden w-24 h-24 bg-transparent border-2 mb-3 rounded-full">
                    <label>
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt=""
                          className="w-full h-full"
                        />
                      ) : (
                        <div
                          src={""}
                          alt=""
                          className="w-full h-full bg-gray-300"
                        />
                      )}
                      {profileImage ? (
                        <div className="text-xs overflow-hidden bg-opacity-80 bg-slate-200 cursor-pointer text-center absolute top-10 left-2"></div>
                      ) : (
                        <div className="text-xs overflow-hidden bg-opacity-80 bg-slate-200 cursor-pointer text-center absolute top-10 left-2">
                          Upload Photo
                        </div>
                      )}
                      <input
                        type="file"
                        onChange={handleProfileImage}
                        
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <MdAccountCircle className="mr-3" size={24} />
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg text-black border-2 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <MdEmail className="text-black mr-2" size={24} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 text-black py-2 rounded-lg border-2 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="flex items-center mb-6">
                    <RiLockPasswordFill className="text-black mr-2" size={24} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full text-black px-4 py-2 rounded-lg border-2 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-black text-white hover:bg-gray-700 transition duration-300 font-bold rounded-lg"
                  >
                    {loading ? "Loading..." : "Register"}
                  </button>
                  <p className="mt-4 text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                      className="cursor-pointer text-black font-bold"
                      onClick={toggleForm}
                    >
                      Login here
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
