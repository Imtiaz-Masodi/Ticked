import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { ApiResponse } from "../../types/ApiResponse";
import { User } from "../../types/User";

// API slice for account related endpoints
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: customBaseQuery(),
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<ApiResponse<{ user: User }>, void>({
      query: () => ({
        url: "/account/me",
        method: "GET",
      }),
      providesTags: [{ type: "Account", id: "ME" }],
    }),
  }),
});

export const { useGetCurrentUserQuery } = accountApi;
