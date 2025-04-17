import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { Category } from "../../types/Category";
import { ApiResponse } from "../../types/ApiResponse";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<{ categories: Category[] }>, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/category",
        method: "POST",
        data: category,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/category/${id}`,
        method: "PUT",
        data: category,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
