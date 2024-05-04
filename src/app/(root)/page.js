"use client"

import AddTask from "@/components/AddTodo";
import ViewTodo from "@/components/ViewTodo";
import Auth from "@/helpers/Auth";

import { Toaster } from "react-hot-toast";

const Home = () => {


  return ( 
    <>
      <div className="">

      <Toaster />

      {/* to add todos */}
      <div className="py-4">
        <AddTask />
      </div>

      {/* view todo lists */}
      <div>
        <ViewTodo />
      </div>

      </div>
    </>
   );
}
 
export default Auth(Home);