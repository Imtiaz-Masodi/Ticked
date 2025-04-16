import { createApi } from "@reduxjs/toolkit/query/react";
import { Task } from "../../types/Task";
import { customBaseQuery } from "./customBaseQuery";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: customBaseQuery(),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => ({
        url: "/tasks",
        method: "GET",
      }),
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        data: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        data: task,
      }),
    }),
    updateTaskAsCompleted: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "PUT",
        data: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = taskApi;
