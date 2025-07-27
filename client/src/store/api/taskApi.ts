import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "../../types/Task";
import { customBaseQuery } from "./customBaseQuery";
import { ApiResponse } from "../../types/ApiResponse";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getTasks: builder.query<ApiResponse<{ tasks: Task[] }>, { status?: string | string[] } | undefined>({
      query: ({ status } = {}) => ({
        url: "/task/list",
        method: "GET",
        params: status ? { status } : undefined,
      }),
    }),
    getTasksByCategory: builder.query<ApiResponse<{ tasks: Task[] }>, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: "/task/list",
        method: "GET",
        params: { categoryId },
      }),
    }),
    createTask: builder.mutation<ApiResponse<unknown>, Task>({
      query: (task) => ({
        url: "/task/create",
        method: "POST",
        data: task,
      }),
    }),
    updateTask: builder.mutation<ApiResponse<unknown>, { task: Task }>({
      query: ({ task }) => ({
        url: `/task/update/${task._id}`,
        method: "PUT",
        data: task,
      }),
    }),
    updateTaskStatus: builder.mutation<ApiResponse<unknown>, { taskId: string; taskStatus: string }>({
      query: ({ taskId, taskStatus }) => ({
        url: `/task/update-status/${taskId}`,
        method: "PUT",
        data: { status: taskStatus },
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

export const {
  useGetTasksQuery,
  useGetTasksByCategoryQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
