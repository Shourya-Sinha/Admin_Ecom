import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { showSnackbar } from "./InitialSlice.jsx";
import { useSelector } from "react-redux";

export const authBaseUrl = 'http://localhost:7000/auth/user';
const initialState={
    isLoggedIn: false,
    token:'',
    isLoading:false,
    user:null,
    user_id:null,
    email:'',
    name:'',
    error:false,
    isRegisterSuccessfull:false,
    registerEmail:null,
    isVerifiedemail:false
}

const slice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        resetAuthStateLogout: (state) => {
            state.token = '';
            state.user=null;
            state.user_id=null;
            state.email="";
            state.name='';
            state.isRegisterSuccessfull=false;
            state.registerEmail=null;
            state.isVerifiedemail=false;
            state.isLoggedIn = false; //
          },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isLoggedIn = true;
            state.user = action.payload.data.user;
            state.user_id = action.payload.data.user;
            state.email = action.payload.data.email;
            state.token = action.payload.token;
            state.name = action.payload.data.name;
            state.error =false;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=true;
        }) .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.user_id = null;
            state.email = '';
            state.token = '';
            state.name = '';
            state.error = false;
        })
        .addCase(logoutUser.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        }).addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isRegisterSuccessfull = true;
            state.registerEmail = action.payload.email; 
        }).addCase(registerUser.rejected,(state)=>{
            state.isLoading = false;
            state.error = true;
        }).addCase(verifyEmail.pending,(state)=>{
            state.isLoading = true;
        }).addCase(verifyEmail.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isVerifiedemail = true;
        }).addCase(verifyEmail.rejected,(state)=>{
            state.isLoading = false;
            state.error = true;
        })
    }
});

export default slice.reducer;
export const { resetAuthStateLogout } = slice.actions;
export const verifyEmail = createAsyncThunk('/auth/verify', async (credentials, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post(`${authBaseUrl}/verify-user`, credentials);
        dispatch(showSnackbar({
            severity: response.data.status,
            message: response.data.message,
        }));
        return response.data; // Return the response data if needed for further handling
    } catch (error) {
        dispatch(showSnackbar({
            severity: error.response?.data?.status || 'error',
            message: error.response?.data?.message || 'An error occurred',
        }));
        return rejectWithValue(error.response?.data); // Pass the error data for further handling in the slice
    }
});

export const registerUser =createAsyncThunk('/auth/register',async (credentials, {dispatch,rejectWithValue})=>{
    try {
        const response = await axios.post(`${authBaseUrl}/register-user`,credentials);

        dispatch(
            showSnackbar({
                severity: response.data.status,
                message: response.data.message,
            })
        );
        return {...response.data, email:credentials.email};
    } catch (error) {
        dispatch(showSnackbar({ severity:error.response?.data?.status, message:error.response?.data?.message }));

        return rejectWithValue( error.response?.data );
    }
});

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;  // Get token from state
            const response = await axios.post(`${authBaseUrl}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(showSnackbar({
                severity: response.data.status,
                message: response.data.message,
            }));
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            const statusCode = error.response?.status;
            dispatch(showSnackbar({ severity: error.response?.data?.status, message: error.response?.data?.message }));
            if (statusCode === 401 || errorMessage === 'Invalid token or token has expired.') {
                dispatch(resetAuthStateLogout());
            }
            return rejectWithValue(error.response?.data);
        }
    }
);

export const loginUser = createAsyncThunk('auth/login',async (credentials, {dispatch,rejectWithValue})=> {
    try {
        const response = await axios.post(`${authBaseUrl}/login-user`,credentials,{ withCredentials: true});
        dispatch(
            showSnackbar({
              severity: response.data.status,
              message: response.data.message,
            })
          );
        return response.data;
    } catch (error) {
        dispatch(showSnackbar({ severity:error.response?.data?.status, message:error.response?.data?.message }));

        return rejectWithValue( error.response?.data );
    }
} );

