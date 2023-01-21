import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as secureStore from 'expo-secure-store';
import React from "react";
import axios from 'axios'

import authServices from "../services/auth.services";

const baseURL = "https://farmer-6ap5.onrender.com/api/auth/";

// const user = await secureStore.getItemAsync('userToken');

export const register = createAsyncThunk("auth/register",
    async({name,email,password}, {rejectWithValue}) =>{
        try{
            const response = await authServices.register(name,email,password);
            console.log(response)
            //secureStore.setItemAsync("token",response.data.accessToken)
            //return response;
        }
        catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

const setToken = async (token) =>{
    try{
        await secureStore.setItemAsync('access',token)
        const demoToken = await secureStore.getItemAsync('access')
        console.log("Demo token",demoToken)
    }
    catch(error){
        console.log(error)
    }
}

export const login = createAsyncThunk("auth/login",
    async ({email,password},{rejectWithValue})=>{
        try{
            console.log("Its here")
            console.log(email)
            console.log(password)
            const response = await axios.post(`${baseURL}login`,{
                email,
                password
            });
            console.log("The response",response.data)
            try{
                await secureStore.setItemAsync('access',response.data.accessToken);
            }
            catch(error){
                console.log(error)
            }
            return response.data;
        }
        catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => {
    try{
         authServices.logout();
    }
    catch(error){
        return {
            message: "error",
        }
    }
  });

export const restore = createAsyncThunk("auth/restore",async(token)=>{
    console.log(token)
    return token
})

const initialState = {
  isLoggedIn: false,
  loading: false,
  userInfo: null,
  userToken:null,
  error: null,
  success: false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        restore:(state,action)=>{
            state.userToken = action.payload;
            state.isLoggedIn = true;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.fulfilled,(state,action)=>{
            state.isLoggedIn= false;
        }),
        builder.addCase(register.rejected,(state,action)=>{
            state.isLoggedIn= false;
        }),
        builder.addCase(login.fulfilled,(state,action)=>{
            console.log(action.payload)
            console.log(state);
            state.isLoggedIn = true;
            state.userToken = action.payload.accessToken;
            state.userInfo = action.payload;
            
        }),
        builder.addCase(login.rejected,(state,action)=>{
            state.isLoggedIn = false;
            state.error = action.payload;
        }),
        builder.addCase(logout.fulfilled,(state,action)=>{
            state.isLoggedIn = false;
            state.userToken = null;
            console.log(state);
        }),
        builder.addCase(restore.fulfilled,(state,action)=>{
            console.log(state)
            state.isLoggedIn= true;
            state.userToken = action.payload;
        }),
        builder.addCase(restore.rejected,(state,action)=>{
            state.userToken = null;
        })
    }
})

const {reducer} = authSlice;
export default reducer;

