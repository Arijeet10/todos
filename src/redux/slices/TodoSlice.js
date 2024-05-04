
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    isError:false,
    todoList:[],
}


export const TodoSlice=createSlice({

    name:"todos",
    initialState,
    reducers:{
        setTodos:(state,action)=>{
            state.todoList=action.payload
        },
        addTodos:(state,action)=>{
            console.log(action.payload)
            const data=action.payload
            console.log(data)

            //assign empty array
            if(state.todoList==null){
                state.todoList=[]
            }
            
            state.todoList.push({
                task:data,
                priority:"",
                completed:false
            })
            localStorage.setItem("todos",JSON.stringify(state.todoList))
        },
        removeTodos:(state,action)=>{
            const index=action.payload;
            if(index>-1){
                state.todoList.splice(index,1)
            }
            localStorage.setItem("todos",JSON.stringify(state.todoList))

        },
        changePriority:(state,action)=>{
            const {index,priorityStatus}=action.payload;
            state.todoList[index].priority=priorityStatus;
            localStorage.setItem("todos",JSON.stringify(state.todoList))
        },
        changeStatus:(state,action)=>{
            const {index,status}=action.payload
            state.todoList[index].completed=status
            localStorage.setItem("todos",JSON.stringify(state.todoList))
        },
    }

});


export const {setTodos,addTodos,removeTodos,changePriority,changeStatus}=TodoSlice.actions;
export default TodoSlice.reducer;



