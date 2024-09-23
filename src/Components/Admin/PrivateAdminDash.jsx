import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

axios.defaults.withCredentials = true
const PrivateAdminDash = () => {
  const [admin,setAdmin] = useState(false)

  const fetchingAdmin = async(req,res)=>{
    try {
      const res = await axios.get("https://ecnew-1.onrender.com/api/v1/user/admin")
     
      
      if (res.data.success == true) {
        setAdmin(true)
      }
      
    } catch (error) {
      return res.json({
        success:false,
        message:"Something went wrong..."
      })
      
    }
  }
  useEffect(()=>{
    fetchingAdmin()
  })



  return (
    <>
      {
        admin ? (<Outlet/>) : (<Spinner/>)
      }
     
    </>
  );
};

export default PrivateAdminDash;
