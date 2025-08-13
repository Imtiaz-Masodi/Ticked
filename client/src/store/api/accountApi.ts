import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { ApiResponse } from "../../types/ApiResponse";
import { User } from "../../types/User";
import { UpdatePasswordRequestType } from "../../types/UpdatePasswordRequestType";
import { UpdateProfileRequestType } from "../../types/UpdateProfileRequestType";

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
    updateProfile: builder.mutation<ApiResponse<{ user: User }>, UpdateProfileRequestType>({
      query: (profileData) => ({
        url: "/account/update-profile",
        method: "POST",
        data: profileData,
      }),
      // Invalidate the current user cache when profile is updated
      invalidatesTags: [{ type: "Account", id: "ME" }],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdatePasswordMutation, useUpdateProfileMutation } = accountApi;
