"use client";

import {
  changePriority,
  changeStatus,
  removeTodos,
  setTodos,
} from "@/redux/slices/TodoSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { LuHelpingHand } from "react-icons/lu";
import { getWeatherData } from "@/redux/slices/ApiSlice";
import { CgSearchLoading } from "react-icons/cg";
import { outdoorKeywords } from "@/helpers/outdoorKeys";
import toast from "react-hot-toast";

const ViewTodo = () => {
  //get weather data
  const weatherInfo = useSelector((state) => state.ApiSlice.apiData);

  //loading state for api
  const loading = useSelector((state) => state.ApiSlice.loading);

  //error state for api
  const error = useSelector((state) => state.ApiSlice.error);

  //to dispatch actions
  const dispatch = useDispatch();

  //get todos from redux state
  const todoList = useSelector((data) => data.TodoSlice.todoList);

  //to set task is completed or not
  const [todoStatus, setTodoStatus] = useState();

  //to assign priority to task
  const [priority, setPriority] = useState({
    index: "",
    priorityStatus: "",
  });

  //show or hide dropdown
  const [showDropdown, setShowDropdown] = useState({
    index: "",
    dropdown: false,
  });

  //modal to show weather api suggestions
  const [modal, setModal] = useState(false);

  //delete todos function
  const handleDeleteTodo = (index) => {
    dispatch(removeTodos(index));
  };

  //change priority status
  const handleSetPriority = (value, index) => {
    setPriority({
      index,
      priorityStatus: value,
    });
    setShowDropdown(false);
  };

  //dispatch the changed status and priority data to the store
  useEffect(() => {
    //dispatch todo priority
    if (priority.priorityStatus) {
      dispatch(changePriority(priority));
    }

    //dispatch todo status
    if (todoStatus) {
      dispatch(changeStatus(todoStatus));
    }
  }, [priority, todoStatus]);

  //dispatch saved localstorage todos to redux state
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    dispatch(setTodos(todos));
  }, []);

  //dispatch your current location latitude and longitude to api
  function showPosition(position) {
    const latitude = position.coords.latitude.toFixed(2);
    const longitude = position.coords.longitude.toFixed(2);
    dispatch(getWeatherData({ latitude, longitude }));
  }

  //get current location using geolocationAPI
  useEffect(() => {
    if (modal) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, [modal]);

  //only show weather info of certain keywords
  const handleWeatherInfo = (todo) => {
    if (outdoorKeywords.some((keyword) => todo.includes(keyword))) {
      setModal(true);
    } else {
      toast.error("Can't generate any weather suggestions");
    }
  };

  return (
    <>
      <div className="p-2 border rounded-md">
        <div className="grid gap-1 grid-cols-12 font-medium text-sm sm:text-base">
          <div className=" col-span-2 sm:col-span-2 lg:col-span-1">Status</div>
          <div className=" col-span-4 sm:col-span-6 lg:col-span-7 text-start">
            To-Do Lists
          </div>
          <div className=" col-span-4 sm:col-span-2 lg:col-span-2 text-center sm:text-start">
            Priority
          </div>
          <div className=" col-span-2 sm:col-span-2 lg:col-span-2 text-center">
            Remove
          </div>
        </div>

        <div className="pt-2 border-b w-full" />

        <>
          {todoList &&
            todoList.map((todo, i) => {
              return (
                <div
                  key={i}
                  className=" py-2 grid gap-1 grid-cols-12 items-center"
                >
                  <div className=" col-span-2 sm:col-span-2 lg:col-span-1">
                    {todo.completed ? (
                      <input
                        type="checkbox"
                        value={todoStatus}
                        onChange={(e) =>
                          setTodoStatus({ index: i, status: e.target.checked })
                        }
                        checked
                      />
                    ) : (
                      <input
                        type="checkbox"
                        value={todoStatus}
                        onChange={(e) =>
                          setTodoStatus({ index: i, status: e.target.checked })
                        }
                      />
                    )}
                  </div>
                  <div className=" col-span-4  sm:col-span-6 lg:col-span-7 overflow-hidden text-ellipsis text-start flex items-center justify-start gap-1">
                    <div>{todo.task}</div>
                    <div
                      onMouseEnter={() => handleWeatherInfo(todo.task)}
                      onMouseLeave={() => setModal(false)}
                      className="pr-10"
                    >
                      <LuHelpingHand />
                    </div>
                    {modal && (
                      <div className="border shadow-md px-4 py-8 rounded-md flex flex-col gap-4 items-center absolute z-50 bg-white top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
                        {loading ? (
                          <CgSearchLoading />
                        ) : (
                          <>
                            {error ? (
                              <div>Oops! Something went wrong</div>
                            ) : (
                              <>
                                <img
                                  src={`http://openweathermap.org/img/w/${weatherInfo.icon}.png`}
                                  alt="icon"
                                  className="w-20 h-20"
                                />
                                <div className="text-nowrap font-medium">
                                  Current Weather:{" "}
                                  <span className="text-slate-500">
                                    {weatherInfo.description}
                                  </span>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Set Priority */}
                  <div className="relative w-full col-span-4 sm:col-span-2 lg:col-span-2 text-sm sm:text-base  text-nowrap flex items-center justify-center sm:justify-between font-medium">
                    {todo.priority ? (
                      <div>{todo.priority}</div>
                    ) : (
                      <div>Set Priority</div>
                    )}

                    <div
                      onClick={() =>
                        setShowDropdown({
                          index: i,
                          dropdown: !showDropdown.dropdown,
                        })
                      }
                      className="p-2 rounded-full hover:bg-slate-100"
                    >
                      {showDropdown.index == i && showDropdown.dropdown ? (
                        <FaAngleUp className="w-5 h-5" />
                      ) : (
                        <FaAngleDown className="w-5 h-5" />
                      )}
                    </div>
                    {showDropdown.index == i && showDropdown.dropdown && (
                      <div className="absolute z-50 bg-white w-full top-10 flex flex-col border rounded-md font-medium">
                        <div
                          onClick={() => handleSetPriority("Low", i)}
                          className="px-4 py-2 w-full text-center hover:bg-blue-500 hover:text-white rounded-t-md"
                        >
                          Low
                        </div>
                        <div
                          onClick={() => handleSetPriority("Medium", i)}
                          className="px-4 py-2 w-full text-center hover:bg-blue-500 hover:text-white"
                        >
                          Medium
                        </div>
                        <div
                          onClick={() => handleSetPriority("High", i)}
                          className="px-4 py-2 w-full text-center hover:bg-blue-500 hover:text-white rounded-b-md"
                        >
                          High
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" col-span-2 sm:col-span-2 lg:col-span-2 text-center">
                    <button
                      onClick={() => handleDeleteTodo(i)}
                      className="p-2 sm:px-4 sm:py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium text-xs sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </>
      </div>
    </>
  );
};

export default ViewTodo;
