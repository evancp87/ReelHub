
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {Media} from "@/types/media";



export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["media"],
  endpoints: (builder) => ({
    search: builder.query<Media[], string>({
      query: (q) => `search?name=${q}`,
      providesTags: (result, error, search) => [{ type: "media", search }],
    }),
  }),
});