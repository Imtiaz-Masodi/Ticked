import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "../../types/Task";
import { customBaseQuery } from "./customBaseQuery";
import { ApiResponse } from "../../types/ApiResponse";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getTasks: builder.query<ApiResponse<{ tasks: Task[] }>, void>({
      query: () => ({
        url: "/task/list",
        method: "GET",
      }),
    }),
    createTask: builder.mutation<ApiResponse<unknown>, Task>({
      query: (task) => ({
        url: "/task/create",
        method: "POST",
        data: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ task }) => ({
        url: `/tasks/update`,
        method: "PUT",
        data: task,
      }),
    }),
    updateTaskAsCompleted: builder.mutation({
      query: (task) => ({
        url: "/task/mark-complete",
        method: "PUT",
        data: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
