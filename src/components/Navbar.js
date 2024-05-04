"use client";

import { logoutUser } from "@/redux/slices/AuthSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const dispatch=useDispatch();
  const [auth,setAuth]=useState(false);
  const [user,setUser]=useState("");
  const [logout,setLogout]=useState(false);

  const isAuthenticated=useSelector(state=>state.AuthSlice.isAuthenticated)


  useEffect(() => {

    //get user data
    const user=JSON.parse(localStorage.getItem("user"))||""
    if(user){
      setUser(user)
    }else{
      setUser("")
    }

    //get auth token
    const isAuthenticated=JSON.parse(localStorage.getItem("token"))||""
    if(isAuthenticated){
      setAuth(isAuthenticated)
    }else{
      setAuth(false)
    }
  }, [logout, isAuthenticated])
  

  const handleLogout=()=>{
    dispatch(logoutUser())
    setLogout(true)
    router.push("/login")
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="">
          <div className="text-3xl font-bold">TO-DO</div>
        </div>

        {auth && (
          <div className="flex items-center justify-between sm:justify-center gap-2">

            <div className=" text-lg font-medium">Welcome {user?.email}</div>
            <button
              onClick={() => handleLogout()}
              className="p-2 rounded-lg bg-red-500 hover:bg-red-700 text-white font-medium"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
