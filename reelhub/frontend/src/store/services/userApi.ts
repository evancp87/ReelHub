import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {AuthToken, RegisterCredentials, LoginCredentials } from "./types";


  const BASE_API_URL = "http://localhost:6002";


  export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_API_URL,
      prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token

        if (token) {
          headers.set('authorisation', `Bearer ${token}`)
          return headers
        }
      }
    }),
    endpoints: (builder) => ({
     
      createUser: builder.mutation<AuthToken, RegisterCredentials>({
        query: ({name, email, password}) => ({
          url: '/users/new',
          method: 'POST',
          body: {name, email, password},
        }),
      }),
      loginUser: builder.mutation<AuthToken, LoginCredentials>({
        query: ({email, password}) => ({
          url: '/users/login',
          method: 'POST',
          body: {email, password},
        }),
      }),
    }),
  });


  export const { useCreateUserMutation, useLoginUserMutation } = userApi;

