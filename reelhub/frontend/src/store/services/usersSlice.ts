import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../services/types";
import {RootState} from "../store";
import axios from "axios";
const backend= process.env.NEXT_PUBLIC_BASE_API_URL;


// gets user and token from localStorage
const userToken = typeof localStorage !== 'undefined' ? localStorage.getItem("userToken") : null;
const user = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem("user")!) : null;


type InitialState = {
  user: User | null,
  token: string | null,

}

const initialState = {
  user: user, 
  token: userToken, 
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
  const {email, firstName, lastName, _id, avatar } = userToFind;
  const user = {email, firstName, lastName, _id, avatar}
  localStorage.setItem("userToken", token);
  localStorage.setItem("user", JSON.stringify(user))
  state.user =  userToFind;
  state.token = token;
},
logout: () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("user")
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
