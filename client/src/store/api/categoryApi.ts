import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./customBaseQuery";
import { Category } from "../../types/Category";
import { ApiResponse } from "../../types/ApiResponse";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: customBaseQuery(),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<{ categories: Category[] }>, void>(
      {
        query: () => ({
          url: "/category",
          method: "GET",
        }),
        providesTags: (result) =>
          result?.payload?.categories
            ? [
                ...result.payload.categories.map((category: Category) => ({ type: "Category" as const, id: category._id })),
                { type: "Category", id: "LIST" },
              ]
            : [{ type: "Category", id: "LIST" }],
      }
    ),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/category",
        method: "POST",
        data: category,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/category/${id}`,
        method: "PUT",
        data: category,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
