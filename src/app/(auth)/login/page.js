"use client";

import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/AuthSlice";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

const Login = () => {

  const router=useRouter();
  const dispatch = useDispatch();

//   const [hashedPassword,setHashedPassword]=useState("")

  //to show or hide password
  const [inputType, setInputType] = useState("password");

  //to store login data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });



  const handleLogin = async(e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      try {

        //hash the password
        const hashedPassword=await bcrypt.hash(loginData.password,10)

        dispatch(loginUser({email:loginData.email,password:hashedPassword}))
        setLoginData({
          email:"",
          password:""
        })
        
        router.push("/")

      } catch (error) {
        console.log(error)
      }
      //dispatch(loginUser(loginData));
    }
  };

  return (
    <>
      <div className="  border rounded-md shadow-md absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ">
        <form onSubmit={(e) => handleLogin(e)} className="px-4 pt-6">
          <div className="flex flex-col gap-2 text-sm">
            <div className="p-2 border rounded-md hover:border-slate-400">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className=" w-full focus:outline-none"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>

            <div className=" p-2 border rounded-md hover:border-slate-400 flex items-center justify-between">
              <input
                type={inputType}
                required
                placeholder="Password"
                className=" w-full focus:outline-none"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <div className="cursor-pointer">
                {inputType == "password" ? (
                  <FaEye onClick={() => setInputType("text")} />
                ) : (
                  <FaEyeSlash onClick={() => setInputType("password")} />
                )}
              </div>
            </div>
          </div>

          <div className="py-4">
          
            <input
                type="submit"
                value="Login"
              className="p-2 w-full rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-medium"
            />

          </div>

          

        </form>
      </div>
    </>
  );
};

export default Login;
