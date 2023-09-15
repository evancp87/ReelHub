import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../../utils/helpers";
import {User} from "../services/types";
import {RootState} from "../store";
import axios from "axios";
const backend = "http://localhost:6002";



const userToken = typeof localStorage !== 'undefined' ? localStorage.getItem("userToken") : null;


type InitialState = {
  user: User | null,
  token: string | null,

}



const initialState = {
  // loading: false,
  user: null, 
  token: userToken, 
  // error: null,
  // success: false,
} as InitialState;


export const loginUser = createAsyncThunk<User, User>("user/login", async ({email, password}, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

   const {data} = await axios.post(`${backend}/users/login`, {email, password}, config)
   localStorage.setItem("userToken", data.token)

return data

  } catch (error: any) {
    console.log("There was an error", error);
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
 
setCredentials: (state, action: PayloadAction<{ userToFind: User; token: string }>) => {
  const { userToFind, token } = action.payload;
  
  localStorage.setItem("userToken", token);
  console.log("checking the data here", userToFind, token);
  state.user = userToFind;
  state.token = token;
},

    logout: () => {

      console.log("helooooooooo")
      localStorage.removeItem("userToken");
      return {...initialState};
    },
  },
  
});


export const {
 setCredentials,
 logout
} = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.users.user;
export const selectCurrentToken = (state: RootState) => state.users.token;
export const selectAuthState = (state: RootState) => state.users;
export default userSlice.reducer;
