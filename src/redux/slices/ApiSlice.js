import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url=process.env.NEXT_PUBLIC_API_URL
const key=process.env.NEXT_PUBLIC_API_KEY

const initialState={
    apiData:[],
    loading:false,
    error:false,
}

//api call
export const getWeatherData=createAsyncThunk("getWeatherData",async(req)=>{
    const {latitude,longitude}=req
    try {
        const res=await fetch(`${url}?lat=${latitude}&lon=${longitude}&appid=${key}`)
        const response=await res.json()
        if(res.ok){
            return response?.weather[0]
            console.log(response.weather[0])
        }else{
            return response.error;
            console.log(response.error)
        }
    } catch (error) {
        console.log("API Error:",error)
    }
})


export const ApiSlice=createSlice({
    name:"api",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getWeatherData.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(getWeatherData.fulfilled,(state,action)=>{
            state.loading=false
            state.apiData=action.payload
        }),
        builder.addCase(getWeatherData.rejected,(state)=>{
            state.loading=false
            state.error=true
        })

    }

})

export default ApiSlice.reducer;
