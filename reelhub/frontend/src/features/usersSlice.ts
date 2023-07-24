import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../utils/helpers";

type InitialState{
value: AuthState
} 


type AuthState = {
  isAuth: boolean,
  uuid: string,
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  avatar_url?: string

};

const initialState = {
  value: {
    isAuth: false,
    uuid: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    avatar_url: ""
    
  } as AuthState
} as InitialState;

// getting main list of games
export const setMedia = createAsyncThunk("show/media", async () => {
  try {
    const response = await getData();
    return response;
  } catch (error) {
    console.log("Error fetching shows:", error);
    throw error;
  }
});


export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    login: (state, action:PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          uuid: action.payload,
          firstName: action.payload,
          lastName: action.payload,
          password: action.payload,
          email: action.payload,
        }
      }
    },
    logout: (state, ) => {
    return initialState;
    },
    
  },
  
});

export const {
 login,
 logout
} = dashboardSlice.actions;



export default dashboardSlice.reducer;
