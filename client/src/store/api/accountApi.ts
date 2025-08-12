import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { ApiResponse } from "../../types/ApiResponse";
import { User } from "../../types/User";
import { UpdatePasswordRequestType } from "../../types/UpdatePasswordRequestType";

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
    updatePassword: builder.mutation<ApiResponse<null>, UpdatePasswordRequestType>({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "/account/update-password",
        method: "POST",
        data: { currentPassword, newPassword, confirmPassword },
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdatePasswordMutation } = accountApi;
