"use client";

import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addTodos } from "@/redux/slices/TodoSlice";
import { useState } from "react";
// import { IoIosClose } from "react-icons/io";


const AddTodo = () => {


  const [todo,setTodo]=useState("");

  const dispatch=useDispatch();


  //add todos
  const handleAddTodo=()=>{
    if(todo==""){
      toast.error("No Todo data to add")
    }else{
      console.log(todo)
      dispatch(addTodos(todo))
    }
    setTodo("")
  }

  return (
    <>
    
      <form onSubmit={(e)=>e.preventDefault()} className="flex items-center justify-between border p-2 rounded-md hover:border-slate-300">

        <div className="w-full text-slate-600">
            <input 
                type="text"
                placeholder="Create new todo"
                className="p-2 w-full font-medium focus:outline-none"
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
            />
        </div>

        <button
          onClick={() => handleAddTodo()}
          className="flex items-center justify-center p-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white text-nowrap"
        >
          <div>
            <IoIosAdd className="w-6 h-6" />
          </div>
          <div className="font-medium">New Task</div>
        </button>

      </form>
    </>
  );
};

export default AddTodo;



