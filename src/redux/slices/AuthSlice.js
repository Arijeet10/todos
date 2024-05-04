import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated:false,
};


export const AuthSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload)
      state.user=action.payload
      state.isAuthenticated=true;
      localStorage.setItem("user",JSON.stringify(action.payload))
      localStorage.setItem("token",JSON.stringify(state.isAuthenticated))
    },
    logoutUser:(state)=>{
      state.user={}
      state.isAuthenticated=false
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  },
});

export const { loginUser,logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
