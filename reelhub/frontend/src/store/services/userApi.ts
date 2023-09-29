import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {AuthToken, RegisterCredentials, LoginCredentials, User } from "./types";
import {RootState} from "../store";

  const BASE_API_URL = "http://localhost:6002";


  export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_API_URL,
      prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).users.token

        if (token) {
          headers.set('authorization', `Bearer ${token}`)
          return headers
        }
      }
    }),
    endpoints: (builder) => ({
     
      createUser: builder.mutation<AuthToken, RegisterCredentials>({
        query: (data) => ({
          url: '/users/new',
          method: 'POST',
          body: data,
        }),
      }),
      loginUser: builder.mutation<AuthToken, LoginCredentials>
     
      ({
        query(data: { email: string, password: string }) {
          return {
            url: '/users/login',
            method: 'POST',
            body: data,
          };
        },
    
      }),
      logoutUser: builder.mutation<void, void>({
        query() {
          return {
            url: '/users/logout',
            // credentials: 'include',
          };
        },
      }),
    }),
  });


  export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation } = userApi;