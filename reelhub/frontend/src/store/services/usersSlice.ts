import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../../utils/helpers";
import {User} from "../services/types";
import {RootState} from "../store";
import axios from "axios";
const backend = "http://localhost:6002";


// const userToken = localStorage.getItem("userToken") ?  localStorage.getItem("userToken") : null

type InitialState = {
  user: User | null,
  token: string | null,
  loading: boolean,
  error: null | string,
  success: boolean,
}



const initialState = {
  loading: false,
  user: null, 
  // token: userToken, 
  error: null,
  success: false,
} as InitialState;


export const registerUser = createAsyncThunk<User, User>("user/register", async (user: User, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`${backend}/users/new`, {user}, config);
  } catch (error: any) {
    console.log("There was an error", error);
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});


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
    // login: (state, action: PayloadAction<InitialState>) => {
    //   const { user, token } = action.payload;
    //   state.user = user;
    //   state.token = token;
    //   state.error = null;
    //   state.loading = true;
    //   state.success = true;
    // },
    setCredentials: (state, action: PayloadAction<InitialState>) => {
      const { user, token } = action.payload;
      state.user = user;

    },
    logout: (state, action) => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.token = action.payload.token;
      });
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
