import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "../../types/Task";
import { customBaseQuery } from "./customBaseQuery";
import { ApiResponse } from "../../types/ApiResponse";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customBaseQuery(),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<ApiResponse<{ tasks: Task[] }>, { status?: string | string[] } | undefined>({
      query: ({ status } = {}) => ({
        url: "/task/list",
        method: "GET",
        params: status ? { status } : undefined,
      }),
      providesTags: (result) =>
        result?.payload?.tasks
          ? [
              ...result.payload.tasks.map((task: Task) => ({type: "Task" as const, id: task._id })),
              { type: "Task", id: "LIST" }
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    getTasksByCategory: builder.query<ApiResponse<{ tasks: Task[] }>, { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: "/task/list",
        method: "GET",
        params: { categoryId },
      }),
      providesTags: (result) =>
        result?.payload?.tasks
          ? [
              ...result.payload.tasks.map((task: Task) => ({ type: "Task" as const, id: task._id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    createTask: builder.mutation<ApiResponse<unknown>, Task>({
      query: (task) => ({
        url: "/task/create",
        method: "POST",
        data: task,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    updateTask: builder.mutation<ApiResponse<unknown>, { task: Task }>({
      query: ({ task }) => ({
        url: `/task/update/${task._id}`,
        method: "PUT",
        data: task,
      }),
      invalidatesTags: (_result, _error, { task }) => [{ type: "Task", id: task._id }],
    }),
    updateTaskStatus: builder.mutation<ApiResponse<unknown>, { taskId: string; taskStatus: string }>({
      query: ({ taskId, taskStatus }) => ({
        url: `/task/update-status/${taskId}`,
        method: "PUT",
        data: { status: taskStatus },
      }),
      invalidatesTags: (_result, _error, { taskId }) => [{ type: "Task", id: taskId }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
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
