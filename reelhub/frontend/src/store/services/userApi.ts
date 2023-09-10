import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {AuthToken, RegisterCredentials, LoginCredentials, User } from "./types";
import {login, registerUser, logout} from "./usersSlice";
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
      // ({
      //   query: (data) => ({
      //     url: '/users/login',
      //     method: 'POST',
      //     body: data,
      //     credentials: 'include',
      //   }),
      // }),
      ({
        query(data: { email: string, password: string }) {
          return {
            url: '/users/login',
            method: 'POST',
            body: data,
            // credentials: 'include',
          };
        },
        // async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //   try {
        //     await queryFulfilled;
        //     const email = args.email;
        //     await dispatch(userApi.endpoints.getUserInfo.initiate(null));
        //   } catch (error) {}
        // },
      }),
      logoutUser: builder.mutation<void, void>({
        query() {
          return {
            url: '/users/logout',
            // credentials: 'include',
          };
        },
      }),
      // getUserInfo: builder.query<User, null>({
      //   query() {
      //     return {
      //       url: `/users/user/`,
      //       // credentials: 'include',
      //       // headers: {
      //       //   Authorization: `Bearer ${token}`
      //       // }
      //     };
      //   },
        // transformResponse: (result: { data: { user: User } }) =>
        //   result.data.user,
        // async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //   try {
        //     const { data } = await queryFulfilled;
        //     dispatch(registerUser(data));
        //   } catch (error) {}
        // },
      // }),
    }),
  });


  // const baseQueryWithReAuth = async (args, api, extraOptions) => {
  //   let result = await baseQuery(args, api, extraOptions)
  //   if (result?.error?.originalStatus === 403) {
  //     console.log("sending refresh token")
  //     // send refresh token to get new access token
  //     const refreshResult = await baseQuery("/refresh", api, extraOptions)
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     const user = api.getState().auth.user;
  //     api.dispatch(setCredentials({...refreshResult.data, user}))

  //     result = await baseQueryWithReAuth(arg, api )
  //   }
    
  //   }
  // }

  export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation,
    
    // useGetUserInfoQuery 
  } = userApi;

